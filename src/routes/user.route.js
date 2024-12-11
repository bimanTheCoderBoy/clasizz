import express from "express";
const userRouter=express.Router();
import { registerUser,loginUser,logoutUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',authMiddleware,logoutUser)

export {userRouter};