// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middelwares/fileupload.middleware.js';

// 2. Initialize Express router.

const productRouter = express.Router();
const productController = new ProductController();

// All the paths to the controller methods.
// localhost/api/products 
// localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1

productRouter.post('/rate', (req, res)=>{
    productController.rateProduct(req, res);
});

productRouter.get(
    '/filter',
    (req, res, next)=>{
        productController.filterProducts(req, res, next);
    }
);

productRouter.get(
    '/', 
    (req, res)=>{
        productController.getAllProducts(req, res);
    }
);

productRouter.post('/', upload.single('imageUrl'), (req, res)=>{productController.addProduct(req, res);});


productRouter.get("/averageprice", (req, res, next)=>{
    productController.averagePrice(req, res);
})

productRouter.get("/averagerating", (req, res, next)=>{
    productController.averageRating(req, res);
})

productRouter.get(
    '/:id',
    (req, res)=>{
        productController.getOneProduct(req, res);
    }
);

export default productRouter;