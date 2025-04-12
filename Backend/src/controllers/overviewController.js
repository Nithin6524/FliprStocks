import { getOverviewService} from "../models/overview_Model.js";

const handleResponse=(res,status,message,data=null)=>{
    res.status(status).json({
        status,
        message,
        data
    });
};


export const getOverview=async(req,res,next)=>{
    try{
        const stock=await getOverviewService (req.params.id);
        if(!stock)return handleResponse(res,404,"Overview for stock not found");
        handleResponse(res,200,"Overview for stock fetched successfully",stock);
    }catch(error){
        next(error);
    }
};

export const getHistory=async(req,res,next)=>{
    try{
        const stock=await getHistoryService (req.params.id);
        if(!stock)return handleResponse(res,404,"History for stock not found");
        handleResponse(res,200,"History for stock fetched successfully",stock);
    }catch(error){
        next(error);
    }
};

