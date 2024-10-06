import cartItemsModel from "./cartitems.model.js";

export default class cartItemsController{
    add(req, res){
        const {productID, quantity} = req.query;
        const userID = req.userID;
        cartItemsModel.add(productID, userID,quantity);
        res.status(201).send('Cart is Updated');
    }
}