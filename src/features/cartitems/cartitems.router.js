import express from "express";
import CartItemsController from "./cartitems.controller.js";


const cartRouter = express.Router();
const cartItemsController = new CartItemsController();


cartRouter.post('/', cartItemsController.add);
cartRouter.get('/',cartItemsController.get);
cartRouter.delete("/:id", cartItemsController.delete);

export default cartRouter;