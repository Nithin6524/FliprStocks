import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import stockRoutes from "./routes/stockRoutes.js";
// Add this to your main app.js file after existing routes
import transactionRoutes from "./routes/transactions.js";

dotenv.config();
const app = express();

app.use(express.json()); // ✅ THIS parses JSON request bodies

// Middlewares
app.use(helmet());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true,
    })
);

app.use(compression());

app.use("/api/stocks", stockRoutes);

// Mount the transaction routes
app.use("/api/transactions", transactionRoutes);


// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
