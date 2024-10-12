import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", (req, res)=>{
    userController.SignUp(req, res);
});
userRouter.post("/signin", (req, res)=>{
    userController.SignIn(req, res);
});

export default userRouter;