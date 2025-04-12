import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

dotenv.config();


const app = express();


const PORT = process.env.PORT || 5000;



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

app.use(cors());


// Routes


// Error handlin middleware


//test

app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT current_database()");
        res.send(`Connected to ${result.rows[0].current_database}`);
    } catch (err) {
        console.error(err.message);
    }
});

//server running    


app.listen( PORT , () => console.log(`server running on port ${PORT}`));


