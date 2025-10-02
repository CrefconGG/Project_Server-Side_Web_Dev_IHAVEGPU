import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const orderService = {
    getAllOrders: async () => {
        return await Order.find({ isDeleted: false }).populate('user').populate('items.product');
    },

    getOrderById: async (id) => {
        return await Order.findOne({ _id: id, isDeleted: false }).populate('user').populate('items.products');
    },

    // create order จาก cart
    createOrder: async (userId) => {
        // 1. หา cart ของ user
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }

        // 2. คำนวณ totalPrice
        let totalPrice = 0;
        const orderItems = cart.items.map(item => {
            totalPrice += item.product.price * item.quantity;
            return {
                product: item.product._id,
                quantity: item.quantity
            };
        });

        // 3. สร้าง order
        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalPrice,
            status: "pending"
        });

        // 4. เคลียร์ cart หลังจาก checkout
        cart.items = [];
        await cart.save();

        return order;
    },

    getOrderByUserId: async (user) => { 
        return await Order.find({ user, isDeleted: false }).populate('user').populate('items.productsID');
    },

    updateOrderStatus: async (id, status) => {
        return await Order.findByIdAndUpdate(id, { status }, { new: true });
    },

    deleteOrder: async (id) => {
        return await Order.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    },

    deleteOrdersByUserId: async (user) => {
        return await Order.updateMany({ user }, { isDeleted: true });
    },

    restoreOrder: async (id) => {
        return await Order.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
    },

    restoreOrdersByUserId: async (user) => { 
        return await Order.updateMany({ user }, { isDeleted: false });
    }
}

export default orderService;
