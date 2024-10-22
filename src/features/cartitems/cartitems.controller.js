import cartItemsModel from "./cartitems.model.js";
import cartItemsRepository from "./cartitems.repository.js";

export default class cartItemsController{

    constructor(){
        this.cartItemsRepository = new cartItemsRepository();
    }
    async add(req, res){
        try{
            const {productID, quantity} = req.body;
            const userID = req.userID;
            await this.cartItemsRepository.add(productID, userID,quantity)
            res.status(201).send('Cart is Updated');
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong cartitemsController", 500);
        }
    }

    async get(req, res){
        try{
            const userID = req.userID;
            const items = await this.cartItemsRepository.get(userID);

            console.log(items);
            return res.status(200).send(items);
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong cartitemsController", 500);
        }
    }

    async delete(req, res){
        try{
            const userID = req.userID;
            const cartItemID = req.params.id;
            const isDeleted = await this.cartItemsRepository.delete(cartItemID, userID);
            if(!isDeleted){
                return res.status(404).send("Cart item not found");
            }
            return res.status(200).send("Cart item is removed")
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong cartitemsController", 500);
        }
    }
}