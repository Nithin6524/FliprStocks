import express from 'express';
import { 
    getAllStocks, getStockById 
    } from '../controllers/userController.js';

const router =express.Router();

router.get("/",getAllStocks);
// router.get("/user",getAllUsers);
router.get("/:id",getStockById);
// router.put("/user/:id",updateUser);
// router.delete("/user/:id",deleteUser);


export default router;