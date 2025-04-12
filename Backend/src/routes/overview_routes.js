import express from 'express';

import{
    getOverview
    } from '../controllers/overviewController.js';


    
const router =express.Router();
    
// USER ROUTE
router.get("/:id",getOverview);




export default router;