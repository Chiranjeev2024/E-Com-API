import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";



class productRepository{

    constructor(){
        this.collection = "products";
    }
    
    async add(newProduct){
        try{
            const db = getDB();

            const collection = db.collection(this.collection);

            await collection.insertOne(newProduct);

            return newProduct;
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong with database", 500);
        }
    }

    async getAll(){
        try{
            const db = getDB();

            const collection = db.collection(this.collection);

            const products = await collection.find().toArray();

            return products;
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong with database", 500);
        }
    }

    async get(id){
        try{
            const db = getDB();

            const collection = db.collection(this.collection);

            return await collection.findOne({_id: new ObjectId(id)});

            // return product;
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong with database", 500);
        }
    }

    async filter(minPrice, maxPrice, category){
        try{
            const db = getDB();

            const collection = db.collection(this.collection);

            let filterExpression = {};


            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)};
            }

            if(maxPrice){
                filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)};
            }

            if(category){
                filterExpression.category = category;
            }

            return await collection.find(filterExpression).toArray();

        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong with database", 500);
        }
    }

    // async rate(userID, ProductID, rating){
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         // 1. find the product
    //         const product = await collection.findOne({_id: new ObjectId(ProductID)});
    //         // 2. find the rating
    //         const userRating = product?.ratings?.find((r)=> r.userID == userID);

    //         if(userRating){
    //             //3. update the rating
    //             await collection.updateOne({_id: new ObjectId(ProductID), "ratings.userID": new ObjectId(userID)},
    //             {$set:{"ratings.$.rating":rating}}
    //         )}else{            
    //             //4. create the rating
    //             await collection.updateOne({_id: new ObjectId(ProductID)},{$push:{ratings:{userID: new ObjectId(userID), rating}}});
    //         }



    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("some wents wrong with database", 500);
    //     }
    // }


    async rate(userID, ProductID, rating){
        try{
            const db = getDB();

            const collection = db.collection(this.collection);
            await collection.updateOne({_id: new ObjectId(ProductID)},{$pull:{ratings:{userID: new ObjectId(userID)}}})   
            //4. create the rating
            await collection.updateOne({_id: new ObjectId(ProductID)},{$push:{ratings:{userID: new ObjectId(userID), rating}}});
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong with database", 500);
        }
    }

    async averageProductPricePerCategory(req, res){
        try{
            const db = getDB();
            return await db.collection(this.collection).aggregate([
                {
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg:"$price"},
                    }
                }
            ]).toArray()
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong with database", 500);
        }        
    }

    async averageProductRatingPerCategory(req, res){
        try{
            const db = getDB();
            const result =  await db.collection(this.collection).aggregate([
                {
                    $unwind:"$ratings",
                },
                {
                    $group:{
                        _id:"$name",
                        averageRating:{$avg:"$ratings.rating"}
                    }
                }
            ]).toArray();
            console.log(result);
            return result;
        }catch(err){
            console.log(err);
            throw new ApplicationError("some wents wrong with database", 500);
        }        
    }
}

export default productRepository;