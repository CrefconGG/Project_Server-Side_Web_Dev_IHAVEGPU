import Order from "../models/Order.js";

const paymentService = {
  // mock payment processing
  processPayment: async (orderId, userId, paymentMethod) => {
    
    const order = await Order.findOne({ _id: orderId, user: userId, isDeleted: false });
    if (!order) throw new Error("Order not found or access denied");

    if (order.status === "completed") {
      throw new Error("Order already completed");
    }

    // mock payment
    const paymentResult = {
      success: true,
      transactionId: "TXN-" + Date.now(), // mock id
      paymentMethod,
      paidAt: new Date(),
    };

    order.status = "completed";
    order.paymentInfo = paymentResult;
    await order.save();

    return order;
  }
};

export default paymentService;