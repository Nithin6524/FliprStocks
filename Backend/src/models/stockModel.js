import pool from '../config/db.js';



// stocks
export const getAllStocksService = async () => {
    const result = await pool.query('select * from stocks');
    return result.rows;
};

export const getStockByIdService = async (id) => {
    const result = await pool.query('SELECT short_name FROM stocks WHERE ticker = $1', [id]);
    return result.rows[0];
};