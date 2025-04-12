import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController.js';

const router =express.Router();

router.get("/stocks",getAllStocks);
// router.get("/user",getAllUsers);
router.get("/stocks/:id",getStcoksById);
// router.put("/user/:id",updateUser);
// router.delete("/user/:id",deleteUser);


export default router;