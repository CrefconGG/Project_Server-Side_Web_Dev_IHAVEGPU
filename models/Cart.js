import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, //  1 user มีได้แค่ 1 cart เท่านั้น
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1, 
      },
    },
  ],
}, { timestamps: true }); 
const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
