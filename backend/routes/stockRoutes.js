import express from "express";
import { fetchDailyStock, fetchAllStockData } from "../controllers/stockController.js";

const router = express.Router();

router.get("/daily", fetchDailyStock);
router.get("/all", fetchAllStockData);

export default router;
