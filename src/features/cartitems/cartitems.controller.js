import cartItemsModel from "./cartitems.model.js";

export default class cartItemsController{
    add(req, res){
        const {productID, quantity} = req.query;
        const userID = req.userID;
        cartItemsModel.add(productID, userID,quantity);
        res.status(201).send('Cart is Updated');
    }

    get(req, res){
        const userID = req.userID;
        const items = cartItemsModel.get(userID);
        return res.status(200).send(items);
    }

    delete(req, res){
        const userID = req.userID;
        const cartItemID = req.params.id;
        const error = cartItemsModel.delete(cartItemID, userID);
        if(error){
            return res.status(404).send(error);
        }
        return res.status(200).send("Cart item is removed")
    }
}