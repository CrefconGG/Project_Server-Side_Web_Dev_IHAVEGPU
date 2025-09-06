import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productID: {
        type: String,
        require: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    category: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        require: true
    },
    imagesURL: {
        type: String
    }




})
const Product = mongoose.model("Product", ProductSchema)

export default Product