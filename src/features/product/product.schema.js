import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: String,

    desc: String,

    price: Number,

    category: String,

    inStock: Number
})