import {
    getDailyStockData,
    getAllStockDataBySymbols,
} from "../services/stockService.js";

export async function fetchDailyStock(req, res) {
    try {
        const { symbol, start, end } = req.query;

        if (!symbol || !start || !end) {
            return res.status(400).json({
                error: "Missing required query params: symbol, start, end",
            });
        }

        const data = await getDailyStockData(symbol, start, end);
        res.json({ symbol: symbol.toUpperCase(), count: data.length, data });
    } catch (err) {
        console.error("❌ Error in fetchDailyStock:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

// export async function fetchAllStockData(req, res) {
//     try {
//         const { data, duration } = await getAllStockDataBySymbols();
//         res.status(200).json({
//             success: true,
//             count: data.length,
//             duration,
//             data,
//         });
//     } catch (error) {
//         console.error("Error in fetchAllStockData:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch stock data",
//         });
//     }
// }



export async function fetchAllStockData(req, res) {
    try {
        const { data, duration } = await getAllStockDataBySymbols();
        res.status(200).json({
            success: true,
            count: data.length,
            dbQueryTime: duration,
            message: "Response sent with gzip compression",
            data,
        });
    } catch (error) {
        console.error("Error in fetchAllStockData:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch stock data",
        });
    }
}

