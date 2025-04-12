import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export const createUserService = async (name, email, password) => {
    const user_id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        `INSERT INTO users (user_id, name, email, password)
         VALUES ($1, $2, $3, $4)
         RETURNING user_id, name, email`,
        [user_id, name, email, hashedPassword]
    );
    return result.rows[0];
};

// Login a user (verify credentials)
export const loginUserService = async (email, password) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    const user = result.rows[0];
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    // Return user info (omit password)
    return {
        user_id: user.user_id,
        name: user.name,
        email: user.email
    };
};