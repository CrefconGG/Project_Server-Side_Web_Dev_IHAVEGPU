import Order from "../models/Order.js";

const orderService = {
    getAllOrders: async () => {
        return await Order.find({ isDeleted: false }).populate('user').populate('products.productID');
    },
    getOrderById: async (id) => {
        return await Order.findOne({ _id: id, isDeleted: false }).populate('user').populate('products.productID');
    },
    createOrder: async(user, products, totalAmount, status) => {
        return await Order.create({
            user, products, totalAmount, status
        })
    },
    oderByUserId: async (user) => {
        return await Order.find({ user, isDeleted: false }).populate('user').populate('products.productID');
    },
    updateOrderStatus: async (id, status) => {
        return await Order.findByIdAndUpdate(id, { status }, { new: true });
    },
    deleteOrder: async (id) => {
        return await Order.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    },
    deleteOrdersByUserId: async (user) => {
        return await Order.updateMany({ user }, { isDeleted: true });
    }

}

export default orderService