import pool from "../config/db.js";


// New service for searching and filtering stocks
export const searchStocksService = async (search, industry) => {
    let query =
        "SELECT * FROM stocks WHERE 1=1";
    const values = [];
    let paramCount = 1;
    if (search) {
        query += ` AND (short_name ILIKE $${paramCount} OR long_name ILIKE $${
            paramCount + 1
        })`;
        values.push(`%${search}%`, `%${search}%`);
        paramCount += 2;
    }
    if (industry) {
        query += ` AND industry ILIKE $${paramCount}`;
        values.push(`%${industry}%`);
        paramCount += 1;
    }
    // Execute query
    const result = await pool.query(query, values);
    return result.rows;
};


// stocks
export const getAllStocksService = async () => {
    const result = await pool.query('select * from stocks');
    return result.rows;
};

export const getStockByIdService = async (id) => {
    const result = await pool.query('SELECT short_name FROM stocks WHERE ticker = $1', [id]);
    return result.rows[0];
};