import express from "express";
import CartItemsController from "./cartitems.controller.js";


const cartRouter = express.Router();
console.log("dnadn");
const cartItemsController = CartItemsController();


cartRouter.post('/', cartItemsController.add);

export default cartRouter;