import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5433,
    database: process.env.DB_NAME || "stock_market_db",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Test connection
pool.on("connect", () => {
    console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
    console.error("❌ Database connection error:", err);
    process.exit(-1);
});

export default pool;
