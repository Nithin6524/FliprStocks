import pool from "../config/db.js";


export const getOverviewService = async (id) => {
    const result = await pool.query('select * from stocks where ticker=$1',[id]);
    return result.rows;
};
