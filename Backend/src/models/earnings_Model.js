import pool from "../config/db.js";


export const getEarningsService = async (id) => {
    const result = await pool.query(`
    SELECT distinct * from 
    income_stmt 
    WHERE ticker = $1`,[id]);
    return result.rows;
};
