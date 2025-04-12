import pool from '../config/db.js';

// export const getAllUsersService = async () => {
//     const result = await pool.query('SELECT * FROM users');
//     return result.rows;
// };

// export const getUserByIdService = async (id) => {
//     const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//     return result.rows[0];
// };

// export const createUserService = async (name,email) => {
//     const result = await pool.query('INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *', [name,email]);
//     return result.rows[0];

// };
// export const updateUserService = async (id,name,email) => {
//     const result = await pool.query('UPDATE users SET name=$1,email=$2 WHERE id = $3 RETURNING *', [name,email,id]);
//     return result.rows[0];
// };
// export const deleteUserService = async (id) => {
//     const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
//     return result.rows[0];
// };


// stocks
export const getAllStocksService = async () => {
    const result = await pool.query('select * from stocks');
    return result.rows;
};

export const getStockByIdService = async (id) => {
    const result = await pool.query('SELECT short_name FROM stocks WHERE ticker = $1', [id]);
    return result.rows[0];
};


export const getWatchlistService = async () => {
    const result = await pool.query('select * from watchlist');
    return result.rows[0];
};

export const updateWatchlistService = async (u_id,id) => {
    const result = await pool.query(
        `INSERT INTO watchlist (user_id, ticker, added_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (user_id, ticker) DO NOTHING
         RETURNING *`,
        [u_id, id]
      );
    return result.rows[0];
};

export const deleteWatchlistService = async (id) => {
    const result = await pool.query('DELETE FROM watchlist WHERE ticker = $1 RETURNING *', [id]);
    return result.rows[0];
};