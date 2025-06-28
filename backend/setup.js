// setup.js - Clean and minimal
import { createTables } from "./db/schema/createTables.js";
import pool from "./config/db.js";

async function setup() {
    try {
        console.log("🚀 Setting up TimescaleDB tables...");

        await createTables();

        console.log("🎉 Setup completed successfully!");
    } catch (err) {
        console.error("❌ Setup failed:", err.message);
    } finally {
        await pool.end();
    }
}

setup();
