import {
    // createUserService,
    // getAllUsersService,
    // getUserByIdService,
    // updateUserService,
    // deleteUserService
    getAllStocksService,
    getStockByIdService
} from "../models/userModel.js";


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
        if(!stock)return handleResponse(res,404,"stock not found");
        handleResponse(res,200,"Stock fetched successfully",stock);
    }catch(error){
        next(error);
    }
};
