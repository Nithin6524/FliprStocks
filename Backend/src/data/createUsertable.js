import pool from "../config/db.js";

const createUsertable =async () =>{
    const queryText =`
    CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    symbol TEXT,
    price NUMERIC,
    date DATE,
    open NUMERIC,
    high NUMERIC,
    low NUMERIC,
    close NUMERIC,
    volume BIGINT
)
    `;
    try{
        pool.query(queryText);
        console.log("User table created");
    }catch(err){
        console.log("Error in creating table: ",err);
    }
};

export default createUsertable;