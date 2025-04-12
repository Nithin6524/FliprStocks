import express from 'express';

import{
    getOverview,getHistory
    } from '../controllers/overviewController.js';

const router =express.Router();
    
// USER ROUTE
router.get("/:id",getOverview);
router.get("/:id/history",getHistory);

export default router;