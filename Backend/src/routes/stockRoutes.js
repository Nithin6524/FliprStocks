import express from "express";
import { searchStocks, getStockById } from "../controllers/stockController.js";

const router = express.Router();

// Extended GET /stocks with search and industry filters
router.get("/", searchStocks);

router.get("/:id", getStockById);

export default router;
