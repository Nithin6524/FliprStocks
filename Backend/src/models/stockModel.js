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
    const result = await pool.query(
        `SELECT 
        s.short_name,
        s.ticker,
        s.current_price,
        s.change_percent
        FROM watchlists w
        JOIN stocks s ON w.ticker = s.ticker
        `
    );
    return result.rows;
};

export const updateWatchlistService = async (u_id,id) => {
    const result = await pool.query(
        `select * from watchlists w
        where user_id=$1 and ticker=$2`,
        [u_id, id]
      );
    // const res2=await pool.query(
    //     `SELECT 
    //     s.short_name,
    //     s.ticker,
    //     s.current_price,
    //     s.change_percent
    //     FROM watchlists w
    //     JOIN stocks s ON w.ticker = s.ticker
    //     WHERE w.user_id = $1;
    //     `,[u_id]
    // );
    return result.rows;
};

// export const deleteWatchlistService = async (u_id,id) => {
//     const result = await pool.query('DELETE FROM watchlists WHERE user_id = $1 AND ticker = $2 AND  RETURNING *', [u_id,id]);
//     return result.rows[0];
// };
// export const deleteWatchlistService = async (u_id, id) => {
//     const result = await pool.query(
//         'DELETE FROM watchlists WHERE user_id = $1 AND ticker = $2 RETURNING *',
//         [u_id, id]
//     );
//     return result.rows[0];
// };
// export const deleteWatchlist = async (req, res, next) => {
//     const { u_id, id } = req.params;
//     try {
//         const deletewl = await deleteWatchlistService(u_id, id);
//         if (!deletewl) return handleResponse(res, 404, "Watchlist not found");
//         handleResponse(res, 200, "Watchlist deleted successfully", deletewl);
//     } catch (error) {
//         next(error);
//     }
// };

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