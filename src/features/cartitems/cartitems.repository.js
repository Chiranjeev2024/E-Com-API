import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class cartItemsRepository{
    constructor(req,res){
        this.collection = "cartItems";
    }

    async add(productID, userID,quantity){

        try{

            const db = getDB();
            const collection = db.collection(this.collection);
            const id = await this.getNextCounter(db);

            console.log("ID = "+id);

            await collection.updateOne(
                {productID: new ObjectId(productID), userID: new ObjectId(userID)},
                {
                    $setOnInsert: {_id:id},
                    $inc:{quantity: quantity}
                },
                {upsert:true});

        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong with database in cartitems", 500);
        }
    }

    async get(userID){

        try{
            const db = getDB();
            const collection = db.collection(this.collection);


            const products = await collection.find({userID: new ObjectId(userID)}).toArray();

            return products;
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong with database in cartitems", 500);
        }
        
    }

    async delete(cartItemID, userID){
        try{
            const db = getDB();

            const collection = db.collection(this.collection);

            const result = await collection.deleteOne({_id: new ObjectId(cartItemID), userID: new ObjectId(userID)});

            return result.deletedCount>0;
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong with database in cartitems", 500);
        }
    }

    async getNextCounter(db){
        const resultDocument = await db.collection("counters").findOneAndUpdate(
            {_id:'cartItemId'},
            {$inc:{value: 1}},
            {returnDocument: 'after'}
        )
        console.log(resultDocument);
        return resultDocument.value
    }
}

export default cartItemsRepository;