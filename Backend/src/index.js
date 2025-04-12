import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import stockRoutes from "./routes/Routes.js";
import errorhandling from "./middleware/errorHandler.js";

dotenv.config();    //take the config values

const app=express();
const port=process.env.port || 3001;

// middleware
app.use(express.json());
app.use(cors());

// routes 
app.use("/stocks",stockRoutes);

// errorhandling
app.use(errorhandling);



//server
app.listen(port,()=>{
    console.log('Server is running on port '+port);
})
