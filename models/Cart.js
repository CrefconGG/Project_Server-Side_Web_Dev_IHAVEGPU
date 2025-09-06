import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    items: [{
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require: true
        },
        quantity: {
            type:Number,
            default: 1
        }
    }]

})
const Cart = mongoose.model("Cart", CartSchema)

export default Cart