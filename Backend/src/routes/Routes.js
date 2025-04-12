import express from "express";
import {  searchStocks } from "../controllers/stockController.js";
import {
    getWatchlist,
    updateWatchlist,
    deleteWatchlist,
} from "../controllers/wlController.js";

const router = express.Router();

// WATCHLIST ROUTES
router.get("/watchlist", getWatchlist);
router.post("/watchlist", updateWatchlist);
router.put("/watchlist", updateWatchlist);
router.delete("/watchlist/:u_id/:id", deleteWatchlist);

// STOCK ROUTES
// router.get("/", getAllStocks);
// router.get("/:id", getStockById);

router.get("/",searchStocks);

export default router;
