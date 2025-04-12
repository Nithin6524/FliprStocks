import { createUserService, loginUserService } from "../models/userModel.js";


const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUserService(name, email, password); // no UUID needed here
        handleResponse(res, 201, "User created successfully", user);
    } catch (err) {
        handleResponse(res, 400, err.message);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUserService(email, password);
        handleResponse(res, 200, "Login successful", user);
    } catch (err) {
        handleResponse(res, 401, err.message);
    }
};