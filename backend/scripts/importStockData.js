import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import stripBomStream from "strip-bom-stream";
import pool from "../config/db.js";

const dataDir = path.join(process.cwd(), "data");

function parseNumber(value) {
    if (!value) return null;
    return parseFloat(value.replace(/,/g, ""));
}

function parseInteger(value) {
    if (!value) return null;
    return parseInt(value.replace(/,/g, ""), 10);
}

function parseDate(value) {
    // Convert '25-Jun-2020' to ISO format
    const [day, mon, year] = value.split("-");
    const monthMap = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
    };
    return new Date(Date.UTC(+year, monthMap[mon], +day));
}

async function importCSVFile(filePath) {
    const client = await pool.connect();

    try {
        const rows = [];

        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(stripBomStream())
                .pipe(parse({ delimiter: ",", from_line: 2, trim: true }))
                .on("data", (row) => {
                    rows.push(row);
                })
                .on("end", resolve)
                .on("error", reject);
        });

        console.log(
            `📂 Processing ${path.basename(filePath)} (${rows.length} rows)...`
        );
        await client.query("BEGIN");

        for (const row of rows) {
            const [
                symbol,
                series,
                dateStr,
                prevClose,
                open,
                high,
                low,
                last,
                close,
                avg,
                volume,
                turnover,
                trades,
                deliverable,
                pctDeliverable,
            ] = row.map((col) => col.replace(/^"|"$/g, "").trim());

            const date = parseDate(dateStr);

            await client.query(
                `
                INSERT INTO daily_stock_data (
                    symbol, series, date, prev_close,
                    open_price, high_price, low_price, close_price,
                    volume
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (date, symbol) DO NOTHING;
                `,
                [
                    symbol,
                    series,
                    date,
                    parseNumber(prevClose),
                    parseNumber(open),
                    parseNumber(high),
                    parseNumber(low),
                    parseNumber(close),
                    parseInteger(volume),
                ]
            );
        }

        await client.query("COMMIT");
        console.log(`✅ Imported ${path.basename(filePath)} successfully.`);
    } catch (err) {
        await client.query("ROLLBACK");
        console.error(`❌ Error in ${path.basename(filePath)}:`, err.message);
    } finally {
        client.release();
    }
}

async function importAllCSVs() {
    const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".csv"));

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        await importCSVFile(filePath);
    }

    console.log("🏁 All CSV files processed.");
}

importAllCSVs();
