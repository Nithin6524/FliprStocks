import express from 'express';
import { 
    getAllStocks, getStockById,
    //createUser, deleteUser, getAllUsers, getUserById, updateUser 
    } from '../controllers/userController.js';

const router =express.Router();

router.get("/stocks",getAllStocks);
// router.get("/user",getAllUsers);
router.get("/stocks/:id",getStockById);
// router.put("/user/:id",updateUser);
// router.delete("/user/:id",deleteUser);


export default router;