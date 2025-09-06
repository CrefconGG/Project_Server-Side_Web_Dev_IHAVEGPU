import Order from "../models/Order.js";

const orderService = {
    getAllOrders: async () => {
        return await Order.find().populate('user').populate('products.productID');
    },
    getOrderById: async (id) => {
        return await Order.findById(id).populate('user').populate('products.productID');
    },
    createOrder: async(user, products, totalAmount, status) => {
        return await Order.create({
            user, products, totalAmount, status
        })
    },
    oderByUserId: async (user) => {
        return await Order.find({ user }).populate('user').populate('products.productID');
    },
    updateOrderStatus: async (id, status) => {
        return await Order.findByIdAndUpdate(id, { status }, { new: true });
    },
    deleteOrder: async (id) => {
        return await Order.findByIdAndDelete(id);
    },
    deleteOrdersByUserId: async (user) => {
        return await Order.deleteMany({ user });
    }

}

export default orderService