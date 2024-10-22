import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";


export default class orderRepository{
    constructor(){
        this.collection = "orders";
    }

    async placeOrder(userID){
        try {

            const client = getClient();
            
            // session cannot be used by the mongoDBCompass version.. for this we have to use atlas version.
            // const session = client.startSession()

            const db = getDB();

            // session.startTransaction();

            // 1. Get the cart items and calculate total amount.
            const items = await this.getTotalAmount(userID, /*session*/);

            const finalTotalAmount = items.reduce((acc, item)=> acc + item.totalAmount, 0)
            console.log(finalTotalAmount);

            // 2. Create an order record.
            
            const newOrder = new OrderModel(new ObjectId(userID), finalTotalAmount, new Date())

            await db.collection(this.collection).insertOne(newOrder, /*session*/);

            // 3. Reduce the stock (product qantity).

            for( let item of items){
                await db.collection("products").updateOne(
                    {_id: item.productID},
                    {$inc: {stock: -item.quantity}},
                    // {session}
                )
            }

            // throw new ApplicationError("something wents wrong in database", 200);

            // 4. Clear the cart items.
            await db.collection("cartItems").deleteMany(
                {userID: new ObjectId(userID)},
                // {session}
            );
            // session.commitTransaction()
            // session.endSession();
            return;

        } catch (err) {
            console.log(err);
            throw new ApplicationError("something wents wrong in database", 200);
        }
    }

    async getTotalAmount(userID, /*session*/){
        try {
            const db = getDB();

            const items = await db.collection("cartItems").aggregate([
                // 1. Get cart items for the user.
                {
                    $match:{userID: new ObjectId(userID)}
                },

                // 2. Get the products from products collection.
                {
                    $lookup:{
                        from:"products",
                        localField:"productID",
                        foreignField:"_id",
                        as:"productInfo"
                    }
                },
                
                // 3. Unwind the productInfo.
                {
                    $unwind:"$productInfo"
                },

                // 4. Calculate totalAmount for each cartitems.
                {
                    $addFields:{
                        "totalAmount":{
                            $multiply:["$productInfo.price", "$quantity"]
                        }
                    }
                }
            ], /*{session}*/).toArray();

            return items;         

        } catch (err) {
            console.log(err);
            throw new ApplicationError("something wents wrong in database", 200);
        }
    }
}