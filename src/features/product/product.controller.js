import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController{

    constructor(){
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req,res){
        try{
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with product controller", 500);
        }
    }

    async addProduct(req, res){

        console.log("Product controller")
        try{
            const {name, price, sizes} = req.body;
            const newProduct = new ProductModel(name, null, parseFloat(price), req.file.filename, null, sizes.split(','));

            const createdRecord = await this.productRepository.add(newProduct);
            res.status(201).send(createdRecord);
        }catch(err){
            console.log(err);
            throw new ApplicationError("something wents wrong", 500);
        }
    }

    async rateProduct(req,res, next){
        try{
            const userID = req.userID;
            const productID = req.query.productID;
            const rating = req.query.rating;

            await this.productRepository.rate(userID, productID, rating);
            
            return res.status(200).send('Rating has been added');

        }catch(err){
            console.log(err);
            // throw new ApplicationError("some wents wrong with product controller", 500);
            next(err);
        }
    }

    async getOneProduct(req,res){
        try{
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if(!product){
                res.status(404).send('Product not found');
            } else{
                return res.status(200).send(product);
            }
        }catch(err){
            console.log(err);
            throw new ApplicationError("something wents wrong", 500);
        }
    }

    async filterProducts(req, res) {
        try{
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;

            if(parseFloat(minPrice) >= parseFloat(maxPrice)){
                return res.status(200).send("Min Price should be less than Max Price");
            }
            const result = await this.productRepository.filter(
                minPrice,
                maxPrice,
                category
            );
            if(result.length == 0){
                return res.status(200).send("No any Iteam in this range");
            }
            res.status(200).send(result);
            console.log("resultssss");
        }catch(err){
            console.log(err);
            throw new ApplicationError("something wents wrong with product controller", 500);
        }

    }

}