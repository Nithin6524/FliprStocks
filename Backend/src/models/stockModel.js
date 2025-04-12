import pool from "../config/db.js";

// Existing services
export const getAllStocksService = async () => {
    const result = await pool.query("SELECT * FROM stocks");
    return result.rows;
};

export const getStockByIdService = async (id) => {
    const result = await pool.query(
        "SELECT * FROM stocks WHERE ticker = $1",
        [id]
    );
    return result.rows[0];
};

// New service for searching and filtering stocks
export const searchStocksService = async (search, industry) => {
    let query =
        "SELECT ticker, short_name, long_name, industry FROM stocks WHERE 1=1";
    const values = [];
    let paramCount = 1;

    // Add search condition for short_name or long_name
    if (search) {
        query += ` AND (short_name ILIKE $${paramCount} OR long_name ILIKE $${
            paramCount + 1
        })`;
        values.push(`%${search}%`, `%${search}%`);
        paramCount += 2;
    }

    // Add industry filter
    if (industry) {
        query += ` AND industry ILIKE $${paramCount}`;
        values.push(`%${industry}%`);
        paramCount += 1;
    }

    // Execute query
    const result = await pool.query(query, values);
    return result.rows;
};

