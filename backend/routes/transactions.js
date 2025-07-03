import  {transactionController}  from '../controllers/transactionController.js';
import express from 'express';
const router = express.Router();

// GET /api/transactions - Get all transactions for a symbol
router.get("/", transactionController.getTransactions);

// POST /api/transactions - Create a new transaction
router.post("/", transactionController.createTransaction);


export default router;
