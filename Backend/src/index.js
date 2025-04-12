import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import stockRoutes from "./routes/stocks_routes.js";
import userRoutes from "./routes/user_routes.js";
import overviewRoutes from "./routes/overview_routes.js";
import earningsRoutes from "./routes/earnings_routes.js";
import errorhandling from "./middleware/errorHandler.js";

dotenv.config();    //take the config values

const app=express();
const port=process.env.port || 3001;

// middleware
app.use(express.json());
app.use(cors());

// routes 
app.use("/stocks",stockRoutes);
app.use("/users",userRoutes);
app.use("/overview",overviewRoutes);
app.use("/earnings",earningsRoutes);

// errorhandling
app.use(errorhandling);


app.get("/",async(req,res)=>{
    const result=await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
})


//server
app.listen(port,()=>{
    console.log('Server is running on port '+port);
})
