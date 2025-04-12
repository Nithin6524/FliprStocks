import { getEarningsService} from "../models/earnings_Model.js";

const handleResponse=(res,status,message,data=null)=>{
    res.status(status).json({
        status,
        message,
        data
    });
};


export const getEarnings=async(req,res,next)=>{
    try{
        const stock=await getEarningsService (req.params.id);
        if(!stock)return handleResponse(res,404,"Overview for stock not found");
        handleResponse(res,200,"Overview for stock fetched successfully",stock);
    }catch(error){
        next(error);
    }
};
