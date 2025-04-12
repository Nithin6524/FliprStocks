import pool from '../config/db.js';

//watchlist
export const getWatchlistService = async () => {
    const result = await pool.query(
        `SELECT s.short_name,s.ticker,s.current_price,s.change_percent
        FROM watchlists w JOIN stocks s ON w.ticker = s.ticker`
    );
    return result.rows;
};

export const updateWatchlistService = async (u_id,id) => {
    const result = await pool.query(
        `INSERT INTO watchlists (user_id, ticker, added_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (user_id, ticker) DO NOTHING RETURNING *`,[u_id, id]
      );
    // const res2=await pool.query(
    //     `SELECT s.short_name,s.ticker,s.current_price,s.change_percent
    //     FROM watchlists wJOIN stocks s ON w.ticker = s.ticker WHERE w.user_id = $1;`,[u_id]
    // );
    return result.rows;
};


export const deleteWatchlistService = async (u_id, id) => {
    try {
        console.log('Executing delete query with:', { u_id, id }); // Add logging
        const result = await pool.query(
            'DELETE FROM watchlists WHERE user_id = $1 AND ticker = $2 RETURNING *',
            [u_id, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error); // Add error logging
        throw error;
    }
};