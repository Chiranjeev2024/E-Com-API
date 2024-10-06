import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.SignUp);
userRouter.post("/signin", userController.SignIn);

export default userRouter;