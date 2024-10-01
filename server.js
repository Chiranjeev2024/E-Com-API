import express from 'express';

const server = express();

server.get('/',(req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});

server.listen(3200,()=>{
    console.log("server is running at 3200");
})