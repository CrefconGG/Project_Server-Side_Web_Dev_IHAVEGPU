import orderService from "../services/orderService.js";

const orderViewController = {
  // แสดงรายการ order ทั้งหมด (Admin)
  getAllOrdersView: async (req, res) => {
    try {
      const orders = await orderService.getAllOrders();
      res.render("orders", { orders, user: req.user });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading orders");
    }
  },

  // แสดง order ของ user ที่ล็อกอินอยู่
  getUserOrdersView: async (req, res) => {
    try {
      const orders = await orderService.getOrderByUser(req.user._id);
      res.render("orders", { orders, user: req.user });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading your orders");
    }
  },

  // ดูรายละเอียดของ order
  getOrderDetailsView: async (req, res) => {
    try {
      const id = req.params.id;
      const order = await orderService.getOrderById(id);
      res.render("orderDetails", { order, user: req.user });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading order details");
    }
  },

  // Update status (Admin)
  updateStatusView: async (req, res) => {
    try {
      const id = req.params.id.trim();
      const { status } = req.body;

      if (!["pending", "paid", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const updatedOrder = await orderService.updateOrderStatus(id, status);
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json({ message: "Status updated", order: updatedOrder });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update status" });
    }
  },

  // Delete order (soft delete)
  deleteOrderView: async (req, res) => {
    try {
      const id = req.params.id.trim();
      const deletedOrder = await orderService.deleteOrder(id);
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ message: "Order deleted", order: deletedOrder });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete order" });
    }
  },
};

export default orderViewController;
