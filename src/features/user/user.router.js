import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middelwares/jwt.middleware.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", (req, res)=>{
    userController.SignUp(req, res);
});
userRouter.post("/signin", (req, res)=>{
    userController.SignIn(req, res);
});

userRouter.put('/resetPassword', jwtAuth, (req, res, next)=>{
    userController.resetPassword(req, res, next);
})

export default userRouter;