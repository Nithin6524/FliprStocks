import{
    signup,login
    } from '../controllers/userController.js';

// USER ROUTE
router.post("/signup",signup);
router.post("/login",login);