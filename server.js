// import Enviroment Variables
import "./env.js";
// 1. Import express
import express from 'express';
import swagger, { serve } from 'swagger-ui-express';
import cors from 'cors';

// import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.router.js';
import userRouter from './src/features/user/user.router.js';
import jwtAuth from './src/middelwares/jwt.middleware.js';
import cartRouter from './src/features/cartitems/cartitems.router.js';
import loggerMiddleware from './src/middelwares/logger.middleware.js';
import orderRouter from "./src/features/order/order. routes.js";

// import apiDocs from './swagger2.0.json' assert{type:'json'};
import apiDocs from './swagger3.0.json' assert{type:'json'};

import { ApplicationError } from './src/error-handler/applicationError.js';
import {connectTOMongoDB} from './src/config/mongodb.js';
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";

// 2. Create Server
const server = express();

// 3. CORS policy configuration
// # it's allow your client to use your api even if origin or url port no. is different.

// #1. Using library
// i) install CORS using command "npm i cors"
// ii) import CORS.
// iii) policy configuation.

    // server.use(cors())-----> use this only, for giver permission to all client with different portno or url and also allow all type of headers.

    // And for specific client with specific headers, use below code.
    var corsOptions ={
        origin:'http://localhost:5500',
        allowedHeaders:'Content-type, Authorization'
    }

// iv) use as middleware.
server.use(cors(corsOptions));

// #2. Without library
// server.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5500')
//     res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
//     // Return ok for preflight request.
//     if(req.method=="OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();

// })

server.use(express.json());

// server.use(bodyParser.json());
// for all requests related to product, redirect to product routes.


server.use('/api-docs',swagger.serve, swagger.setup(apiDocs));
server.use(loggerMiddleware);
server.use("/api/products",jwtAuth,  productRouter);
server.use("/api/cartItems",jwtAuth, cartRouter);
server.use("/api/user", userRouter);
server.use("/api/order", jwtAuth, orderRouter);

// 4. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});

server.use((err, req, res, next)=>{
    // For user defined error.

    if (err instanceof ApplicationError) {
        console.log(err.code)
        console.log(err.message)
        res.status(err.code).send(err.message);
    }

    // For server errors.
    res.status(500).send("Something went wrong, please try laterrr")
})


// 5. Middleware to handle 404 requests.
server.use((req, res)=>{
    res.status(404).send("API Not Found, Please check our documentation for more information at localhost:3100/api-docs/");
})

// 6. Specify port.
server.listen(3100,()=>{
    console.log("Server is running at 3100");
    // connectTOMongoDB();
    connectUsingMongoose();

});