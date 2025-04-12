import {
    getAllStocksService,
    getStockByIdService
} from "../models/stockModel.js";

import { 
    searchStocksService
} from "../models/stockModel.js";


const handleResponse=(res,status,message,data=null)=>{
    res.status(status).json({
        status,
        message,
        data
    });
};

export const getAllStocks=async(req,res,next)=>{
    try{
        const stocks=await getAllStocksService();
        handleResponse(res,200,"Stocks fetchedsuccessfully",stocks);
    }catch(error){
        next(error);
    }
};


export const getStockById=async(req,res,next)=>{
    try{
        const stock=await getStockByIdService(req.params.id);
        if(!stock)return handleResponse(res,404,"Stock not found");
        handleResponse(res,200,"Stock fetched successfully",stock);
    }catch(error){
        next(error);
    }
};

// Controller for searching and filtering stocks
export const searchStocks = async (req, res, next) => {
    try {
        const { search, industry } = req.query;
        if (search && typeof search !== "string") {
            return handleResponse(res, 400, "Search query must be a string");
        }
        if (industry && typeof industry !== "string") {
            return handleResponse(res, 400, "Industry query must be a string");
        }
        const stocks = await searchStocksService(search, industry);
        if (!stocks || stocks.length === 0) {
            return handleResponse(
                res,
                404,
                "No stocks found matching the criteria"
            );
        }
        handleResponse(res, 200, "Stocks fetched successfully", stocks);
    } catch (error) {
        next(error);
    }
};



