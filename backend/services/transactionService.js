import { Pool } from "pg";
import { DateTime } from "luxon";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const transactionService = {
    async getTransactionsBySymbol(symbol) {
        const query = symbol
            ? "SELECT * FROM transactions WHERE symbol = $1 ORDER BY date DESC"
            : "SELECT * FROM transactions ORDER BY date DESC";

        const params = symbol ? [symbol.toUpperCase()] : [];

        try {
            const result = await pool.query(query, params);

            // Convert dates to ISO in IST timezone
            const transactions = result.rows.map((tx) => ({
                ...tx,
                date: DateTime.fromJSDate(tx.date)
                    .setZone("Asia/Kolkata")
                    .toISO(),
                created_at: DateTime.fromJSDate(tx.created_at)
                    .setZone("Asia/Kolkata")
                    .toISO(),
            }));
            console.log(transactions);
            return transactions;
        } catch (error) {
            console.error("Database error in getTransactionsBySymbol:", error);
            throw error;
        }
    },

    async createTransaction(transactionData) {
        const { type, symbol, quantity, price, date } = transactionData;

        // Assume the frontend sends ISO string in local time (e.g., IST)
        // Convert to JS Date (UTC)
        const utcDate = DateTime.fromISO(date, {
            zone: "Asia/Kolkata",
        }).toJSDate();

        const query = `
            INSERT INTO transactions (type, symbol, quantity, price, date, created_at)
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING *
        `;

        const params = [type, symbol, quantity, price, utcDate];

        try {
            const result = await pool.query(query, params);
            const tx = result.rows[0];
            return {
                ...tx,
                date: DateTime.fromJSDate(tx.date)
                    .setZone("Asia/Kolkata")
                    .toISO(),
                created_at: DateTime.fromJSDate(tx.created_at)
                    .setZone("Asia/Kolkata")
                    .toISO(),
            };
        } catch (error) {
            console.error("Database error in createTransaction:", error);
            throw error;
        }
    },
};

export default transactionService;
