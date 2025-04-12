import {
    getAllStocksService,
    getStockByIdService
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