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

// export const createUser=async(req,res,next)=>{
//     const {name,email}=req.body;
//     try{
//         const newUser=await createUserService(name,email);
//         handleResponse(res,201,"User created successfully",newUser);
//     }catch(error){
//         next(error);
//     }
// };
// export const getAllUsers=async(req,res,next)=>{
    
//     try{
//         const users=await getAllUsersService();
//         handleResponse(res,200,"Users fetchedsuccessfully",users);
//     }catch(error){
//         next(error);
//     }
// };


// export const getUserById=async(req,res,next)=>{
    
//     try{
//         const user=await getUserByIdService(req.params.id);
//         if(!user)return handleResponse(res,404,"User not found");
//         handleResponse(res,200,"User fetched successfully",user);
//     }catch(error){
//         next(error);
//     }
// };


// export const updateUser=async(req,res,next)=>{
//     const{name,email}=req.body;
//     try{
//         const updateUser=await updateUserService(req.params.id,name,email);
//         if(!updateUser)return handleResponse(res,404,"User not found");
//         handleResponse(res,200,"User updated successfully",updateUser);
//     }catch(error){
//         next(error);
//     }
// };

// export const deleteUser=async(req,res,next)=>{

//     try{
//         const deeleteUser=await deleteUserService(req.params.id);
//         if(!deeleteUser)return handleResponse(res,404,"User not found");
//         handleResponse(res,200,"User deleted successfully",deeleteUser);
//     }catch(error){
//         next(error);
//     }
// };


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

// export const getWatchlist=async(req,res,next)=>{
//     try{
//         const wl=await getWatchlistService(req.params.id);
//         if(!wl)return handleResponse(res,404,"Watchlist not found");
//         handleResponse(res,200,"Watchlist fetched successfully",wl);
//     }catch(error){
//         next(error);
//     }
// };


// export const updateWatchlist=async(req,res,next)=>{
//     const{u_id,id}=req.body;
//     try{
//         const updatedwl=await updateWatchlistService(u_id,id);
//         if(!updatedwl)return handleResponse(res,404,"Watchlist not found");
//         handleResponse(res,200,"Watchlist updated successfully",updatedwl);
//     }catch(error){
//         next(error);
//     }
// };

// // export const deleteWatchlist=async(req,res,next)=>{
// //     try{
// //         const deletewl=await deleteWatchlistService(req.params.id);
// //         if(!deletewl)return handleResponse(res,404,"Watchlist not found");
// //         handleResponse(res,200,"Watchlist deleted successfully",deletewl);
// //     }catch(error){
// //         next(error);
// //     }
// // };
// // export const deleteWatchlist = async (req, res, next) => {
// //     const { u_id, id } = req.params;
// //     try {
// //         const deletewl = await deleteWatchlistService(u_id, id);
// //         if (!deletewl) return handleResponse(res, 404, "Watchlist not found");
// //         handleResponse(res, 200, "Watchlist deleted successfully", deletewl);
// //     } catch (error) {
// //         next(error);
// //     }
// // };

// export const deleteWatchlist = async (req, res, next) => {
//     try {
//         const { u_id, id } = req.params;
//         console.log('Deleting watchlist item:', { u_id, id }); // Add logging

//         if (!u_id || !id) {
//             return handleResponse(res, 400, "Missing user_id or ticker");
//         }

//         const deletewl = await deleteWatchlistService(u_id, id);
//         if (!deletewl) {
//             return handleResponse(res, 404, "Watchlist item not found");
//         }
        
//         return handleResponse(res, 200, "Watchlist item deleted successfully", deletewl);
//     } catch (error) {
//         console.error('Delete watchlist error:', error); // Add error logging
//         next(error);
//     }
// };