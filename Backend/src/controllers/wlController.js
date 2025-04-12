import {
    getWatchlistService,
    updateWatchlistService,
    deleteWatchlistService
} from "../models/wlModel.js";

const handleResponse=(res,status,message,data=null)=>{
    res.status(status).json({
        status,
        message,
        data
    });
};

export const getWatchlist=async(req,res,next)=>{
    try{
        const wl=await getWatchlistService(req.params.id);
        if(!wl)return handleResponse(res,404,"Watchlist not found");
        handleResponse(res,200,"Watchlist fetched successfully",wl);
    }catch(error){
        next(error);
    }
};


export const updateWatchlist=async(req,res,next)=>{
    const{u_id,id}=req.body;
    try{
        const updatedwl=await updateWatchlistService(u_id,id);
        if(!updatedwl)return handleResponse(res,404,"Watchlist not found");
        handleResponse(res,200,"Watchlist updated successfully",updatedwl);
    }catch(error){
        next(error);
    }
};


export const deleteWatchlist = async (req, res, next) => {
    try {
        const { u_id, id } = req.params;
        console.log('Deleting watchlist item:', { u_id, id }); // Add logging

        if (!u_id || !id) {
            return handleResponse(res, 400, "Missing user_id or ticker");
        }

        const deletewl = await deleteWatchlistService(u_id, id);
        if (!deletewl) {
            return handleResponse(res, 404, "Watchlist item not found");
        }
        
        return handleResponse(res, 200, "Watchlist item deleted successfully", deletewl);
    } catch (error) {
        console.error('Delete watchlist error:', error); // Add error logging
        next(error);
    }
};