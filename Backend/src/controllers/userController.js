import { createUserService, loginUserService } from "../models/userModel.js";

const handleResponse=(res,status,message,data=null)=>{
    res.status(status).json({
        status,
        message,
        data
    });
};



export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUserService(name, email, password);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUserService(email, password);
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
