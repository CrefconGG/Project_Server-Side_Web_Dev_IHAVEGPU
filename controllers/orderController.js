import orderService from '../services/orderService.js';

const orderController = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOrderById: async (req, res) => {
        try {
            const id = req.params.id;
            const order = await orderService.getOrderById(id);
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createOrder: async (req, res) => {
        try {
            const user = req.user
            const { products, totalAmount, status } = req.body;
            const order = await orderService.createOrder(user, products, totalAmount, status);
            res.status(201).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOrderByUserId: async (req, res) => {
        try {
            const user = req.params.userID;
            const orders = await orderService.oderByUserId(user);
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateOrderStatus: async (req, res) => {
        try {
            const id = req.params.id;
            const { status } = req.body;
            const updatedOrder = await orderService.updateOrderStatus(id, status);
            res.status(200).json(updatedOrder);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedOrder = await orderService.deleteOrder(id);
            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({ message: 'Order soft deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteOrdersByUserId: async (req, res) => {
        try {
            const user = req.params.userID;
            await orderService.deleteOrdersByUserId(user);
            res.status(200).json({ message: 'Orders soft deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    restoreOrder: async (req, res) => {
        try {
            const id = req.params.id;
            const restoredOrder = await orderService.restoreOrder(id);
            if (!restoredOrder) {
                return res.status(404).json({ message: 'Order not found or not deleted' });
            }
            res.status(200).json(restoredOrder);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default orderController;