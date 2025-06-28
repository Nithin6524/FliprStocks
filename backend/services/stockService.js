import pool from "../config/db.js";

export async function getDailyStockData(symbol, startDate, endDate) {
    const client = await pool.connect();

    try {
        const result = await client.query(
            `
            SELECT date, open_price, high_price, low_price, close_price, volume
            FROM daily_stock_data
            WHERE symbol = $1 AND date BETWEEN $2 AND $3
            ORDER BY date ASC;
            `,
            [symbol.toUpperCase(), startDate, endDate]
        );

        return result.rows;
    } finally {
        client.release();
    }
}


export async function getAllStockDataBySymbols() {
    const start = performance.now();

    const { rows } = await pool.query(`
        SELECT * FROM daily_stock_data
        WHERE symbol IN (SELECT DISTINCT symbol FROM daily_stock_data)
        ORDER BY symbol, date;
    `);

    const duration = (performance.now() - start).toFixed(2);
    return { data: rows, duration: `${duration}ms` };
}