import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderRepository from "./order.repository.js";


export default class orderController{
    constructor(){
        this.orderRepository = new OrderRepository()
    }

    async placeOrder(req, res, next){
        try{
            const userID = req.userID;
            await this.orderRepository.placeOrder(userID)
            // await this.orderRepository.placeOrder(userID);
            res.status(201).send("order is created")
        }catch(err){
            console.log(err);
            throw new ApplicationError("something wents wrong cartitemsController", 200);
        }
    }
}