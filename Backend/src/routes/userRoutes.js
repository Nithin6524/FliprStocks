import express from 'express';
import { 
    getAllStocks, getStockById ,getWatchlist,updateWatchlist,deleteWatchlist
    } from '../controllers/userController.js';

const router =express.Router();

router.get("/",getAllStocks);
// router.get("/user",getAllUsers);
router.get("/:id",getStockById);

// router.get("/user",getAllUsers);
// router.put("/user/:id",updateUser);
// router.delete("/user/:id",deleteUser);

router.get("/watchlist",getWatchlist);
router.put("/watchlist",updateWatchlist);
router.delete("/watchlist/:id",deleteWatchlist);


export default router;