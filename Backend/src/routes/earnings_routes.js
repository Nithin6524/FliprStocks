import express from 'express';

import{
    getEarnings
    } from '../controllers/earningsController.js';

const router =express.Router();
    
// USER ROUTE
router.get("/:id",getEarnings);

export default router;