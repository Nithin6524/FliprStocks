import pool from "../config/db.js";

export const getAllStocksService = async () => {
    const result = await pool.query("SELECT * FROM stocks");
    return result.rows;
};

export const getStockByIdService = async (id) => {
    const result = await pool.query(
        "SELECT short_name FROM stocks WHERE ticker = $1",
        [id]
    );
    return result.rows[0];
};

export const searchStocksService = async (search) => {
    let query =
        "SELECT * FROM stocks WHERE 1=1";
    const values = [];
    let paramCount = 1;

    // Add search condition for ticker, short_name, or long_name
    if (search && search.trim()) {
        query += ` AND (ticker ILIKE $${paramCount} OR short_name ILIKE $${
            paramCount + 1
        } OR long_name ILIKE $${paramCount + 2}) OR industry ILIKE $${paramCount + 3} OR sector ILIKE $${paramCount + 4}`;
        const searchPattern = `%${search.trim()}%`;
        values.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
        paramCount +=5;
    }



    // Debug: Log query and values
    console.log("Executing query:", query);
    console.log("With values:", values);

    // Execute query
    const result = await pool.query(query, values);
    console.log("Rows returned:", result.rows.length);

    return result.rows;
};
