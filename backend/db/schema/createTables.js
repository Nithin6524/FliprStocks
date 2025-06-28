// db/schema/createTables.js
import pool from "../../config/db.js";

export async function createTables() {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        console.log("🔧 Creating TimescaleDB extension...");
        // Ensure TimescaleDB extension is enabled
        await client.query(`CREATE EXTENSION IF NOT EXISTS timescaledb;`);

        console.log("📊 Setting up daily_stock_data table...");

        // Check if table exists and if it's already a hypertable
        const tableExists = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'daily_stock_data'
            );
        `);

        const dailyHypertableCheck = await client.query(`
            SELECT * FROM timescaledb_information.hypertables 
            WHERE hypertable_name = 'daily_stock_data';
        `);

        if (
            tableExists.rows[0].exists &&
            dailyHypertableCheck.rows.length === 0
        ) {
            // Table exists but is not a hypertable - likely has wrong schema
            console.log(
                "🔄 Dropping existing daily_stock_data table to recreate with proper schema..."
            );
            await client.query(
                `DROP TABLE IF EXISTS daily_stock_data CASCADE;`
            );
        }

        if (
            !tableExists.rows[0].exists ||
            dailyHypertableCheck.rows.length === 0
        ) {
            console.log("📊 Creating daily_stock_data table...");
            // daily_stock_data table - TimescaleDB requires time column in primary key
            await client.query(`
                CREATE TABLE daily_stock_data (
                    symbol VARCHAR(20) NOT NULL,
                    series VARCHAR(10),
                    date DATE NOT NULL,
                    prev_close DECIMAL(10,2),
                    open_price DECIMAL(10,2) NOT NULL,
                    high_price DECIMAL(10,2) NOT NULL,
                    low_price DECIMAL(10,2) NOT NULL,
                    close_price DECIMAL(10,2) NOT NULL,
                    volume BIGINT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (date, symbol)
                );
            `);

            console.log("🚀 Converting daily_stock_data to hypertable...");
            await client.query(`
                SELECT create_hypertable('daily_stock_data', 'date');
            `);
        } else {
            console.log("✅ daily_stock_data is already a hypertable");
        }

        console.log("📈 Setting up weekly_stock_data table...");

        // Check if table exists and if it's already a hypertable
        const weeklyTableExists = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'weekly_stock_data'
            );
        `);

        const weeklyHypertableCheck = await client.query(`
            SELECT * FROM timescaledb_information.hypertables 
            WHERE hypertable_name = 'weekly_stock_data';
        `);

        if (
            weeklyTableExists.rows[0].exists &&
            weeklyHypertableCheck.rows.length === 0
        ) {
            console.log(
                "🔄 Dropping existing weekly_stock_data table to recreate with proper schema..."
            );
            await client.query(
                `DROP TABLE IF EXISTS weekly_stock_data CASCADE;`
            );
        }

        if (
            !weeklyTableExists.rows[0].exists ||
            weeklyHypertableCheck.rows.length === 0
        ) {
            console.log("📈 Creating weekly_stock_data table...");
            // weekly_stock_data table
            await client.query(`
                CREATE TABLE weekly_stock_data (
                    symbol VARCHAR(20) NOT NULL,
                    week_start DATE NOT NULL,
                    week_end DATE NOT NULL,
                    open_price DECIMAL(10,2) NOT NULL,
                    high_price DECIMAL(10,2) NOT NULL,
                    low_price DECIMAL(10,2) NOT NULL,
                    close_price DECIMAL(10,2) NOT NULL,
                    volume BIGINT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (week_start, symbol)
                );
            `);

            console.log("🚀 Converting weekly_stock_data to hypertable...");
            await client.query(`
                SELECT create_hypertable('weekly_stock_data', 'week_start');
            `);
        } else {
            console.log("✅ weekly_stock_data is already a hypertable");
        }

        console.log("📅 Setting up monthly_stock_data table...");

        // Check if table exists and if it's already a hypertable
        const monthlyTableExists = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'monthly_stock_data'
            );
        `);

        const monthlyHypertableCheck = await client.query(`
            SELECT * FROM timescaledb_information.hypertables 
            WHERE hypertable_name = 'monthly_stock_data';
        `);

        if (
            monthlyTableExists.rows[0].exists &&
            monthlyHypertableCheck.rows.length === 0
        ) {
            console.log(
                "🔄 Dropping existing monthly_stock_data table to recreate with proper schema..."
            );
            await client.query(
                `DROP TABLE IF EXISTS monthly_stock_data CASCADE;`
            );
        }

        if (
            !monthlyTableExists.rows[0].exists ||
            monthlyHypertableCheck.rows.length === 0
        ) {
            console.log("📅 Creating monthly_stock_data table...");
            // monthly_stock_data table
            await client.query(`
                CREATE TABLE monthly_stock_data (
                    symbol VARCHAR(20) NOT NULL,
                    month_start DATE NOT NULL,
                    month_end DATE NOT NULL,
                    open_price DECIMAL(10,2) NOT NULL,
                    high_price DECIMAL(10,2) NOT NULL,
                    low_price DECIMAL(10,2) NOT NULL,
                    close_price DECIMAL(10,2) NOT NULL,
                    volume BIGINT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (month_start, symbol)
                );
            `);

            console.log("🚀 Converting monthly_stock_data to hypertable...");
            await client.query(`
                SELECT create_hypertable('monthly_stock_data', 'month_start');
            `);
        } else {
            console.log("✅ monthly_stock_data is already a hypertable");
        }

        console.log("🔍 Creating indexes...");
        // Indexes for daily (TimescaleDB automatically creates indexes on time columns)
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_daily_symbol ON daily_stock_data (symbol);
            CREATE INDEX IF NOT EXISTS idx_daily_volume ON daily_stock_data (date DESC, volume DESC);
        `);

        // Indexes for weekly
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_weekly_symbol ON weekly_stock_data (symbol);
        `);

        // Indexes for monthly
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_monthly_symbol ON monthly_stock_data (symbol);
        `);

        console.log("✅ Adding data validation constraints...");

        // Check and add constraints for daily table
        const dailyConstraintExists = await client.query(`
            SELECT 1 FROM information_schema.table_constraints 
            WHERE table_name = 'daily_stock_data' AND constraint_name = 'check_daily_ohlc_integrity';
        `);

        if (dailyConstraintExists.rows.length === 0) {
            await client.query(`
                ALTER TABLE daily_stock_data
                ADD CONSTRAINT check_daily_ohlc_integrity
                CHECK (
                    high_price >= GREATEST(open_price, close_price) AND
                    low_price <= LEAST(open_price, close_price) AND
                    open_price > 0 AND close_price > 0 AND high_price > 0 AND low_price > 0
                );
            `);
        }

        // Check and add constraints for weekly table
        const weeklyConstraintExists = await client.query(`
            SELECT 1 FROM information_schema.table_constraints 
            WHERE table_name = 'weekly_stock_data' AND constraint_name = 'check_weekly_ohlc_integrity';
        `);

        if (weeklyConstraintExists.rows.length === 0) {
            await client.query(`
                ALTER TABLE weekly_stock_data
                ADD CONSTRAINT check_weekly_ohlc_integrity
                CHECK (
                    high_price >= GREATEST(open_price, close_price) AND
                    low_price <= LEAST(open_price, close_price) AND
                    week_end >= week_start AND
                    open_price > 0 AND close_price > 0 AND high_price > 0 AND low_price > 0
                );
            `);
        }

        // Check and add constraints for monthly table
        const monthlyConstraintExists = await client.query(`
            SELECT 1 FROM information_schema.table_constraints 
            WHERE table_name = 'monthly_stock_data' AND constraint_name = 'check_monthly_ohlc_integrity';
        `);

        if (monthlyConstraintExists.rows.length === 0) {
            await client.query(`
                ALTER TABLE monthly_stock_data
                ADD CONSTRAINT check_monthly_ohlc_integrity
                CHECK (
                    high_price >= GREATEST(open_price, close_price) AND
                    low_price <= LEAST(open_price, close_price) AND
                    month_end >= month_start AND
                    open_price > 0 AND close_price > 0 AND high_price > 0 AND low_price > 0
                );
            `);
        }

        // // Set up data retention policies (optional but recommended for stock data)
        // console.log("⏰ Setting up data retention policies...");

        // // Check if retention policy exists for daily data before adding
        // const dailyRetentionExists = await client.query(`
        //     SELECT 1 FROM timescaledb_information.jobs 
        //     WHERE proc_name = 'policy_retention' 
        //     AND hypertable_name = 'daily_stock_data';
        // `);

        // if (dailyRetentionExists.rows.length === 0) {
        //     // Keep daily data for 5 years
        //     await client.query(`
        //         SELECT add_retention_policy('daily_stock_data', INTERVAL '5 years');
        //     `);
        // }

        // // Check if retention policy exists for weekly data before adding
        // const weeklyRetentionExists = await client.query(`
        //     SELECT 1 FROM timescaledb_information.jobs 
        //     WHERE proc_name = 'policy_retention' 
        //     AND hypertable_name = 'weekly_stock_data';
        // `);

        // if (weeklyRetentionExists.rows.length === 0) {
        //     // Keep weekly data for 10 years
        //     await client.query(`
        //         SELECT add_retention_policy('weekly_stock_data', INTERVAL '10 years');
        //     `);
        // }

        // Keep monthly data forever (no retention policy for monthly)

        await client.query("COMMIT");

        console.log(
            "✅ All tables, hypertables, indexes, and constraints created successfully!"
        );

        // Display hypertable information
        const hypertables = await client.query(`
            SELECT hypertable_name, num_dimensions, num_chunks, compression_enabled
            FROM timescaledb_information.hypertables;
        `);

        console.log("\n📋 Created Hypertables:");
        console.table(hypertables.rows);
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("❌ Error setting up tables:", err);
        throw err;
    } finally {
        client.release();
    }
}

