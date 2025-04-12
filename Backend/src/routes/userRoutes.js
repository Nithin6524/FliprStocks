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

router.get("/watchlist",getAllUsers);
router.put("/watchlist",updateUser);
router.delete("/watchlist/:id",deleteUser);


export default router;