import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalAmount: {
        type: Number,
        require: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'canceled', 'paid'],
        default: 'pending'
    }
})

const Order = mongoose.model("Order", OrderSchema);

export default Order