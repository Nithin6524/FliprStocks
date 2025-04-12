import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import stockRoutes from "./routes/stockRoutes.js";
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

//creating table
// createUsertable();

//
app.get("/",async(req,res)=>{
    const result=await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
})


//server
app.listen(port,()=>{
    console.log('Server is running on port '+port);
})
