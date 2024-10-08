// 1. Import express
import express from 'express';
import swagger from 'swagger-ui-express';
// import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.router.js';
import userRouter from './src/features/user/user.router.js';
import jwtAuth from './src/middelwares/jwt.middleware.js';
import cartRouter from './src/features/cartitems/cartitems.router.js';

import apiDocs from './swagger.json' assert{type:'json'};
// 2. Create Server
const server = express();

server.use(express.json());

// server.use(bodyParser.json());
// for all requests related to product, redirect to product routes.

server.use('/api-docs',swagger.serve, swagger.setup(apiDocs));
server.use("/api/products",jwtAuth, productRouter);
server.use("/api/cartItems",jwtAuth, cartRouter);
server.use("/api/user", userRouter);

// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});

// 4. Specify port.
server.listen(3100,()=>{
    console.log("Server is running at 3100");
});
