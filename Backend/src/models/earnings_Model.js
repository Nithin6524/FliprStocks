import pool from "../config/db.js";


export const getEarningsService = async (id) => {
    const result = await pool.query('select * from income_stmt,balance_sheet where ticker=$1',[id]);
    return result.rows;
};
