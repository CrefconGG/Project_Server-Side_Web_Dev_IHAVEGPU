import paymentService from "../services/paymentService.js";

const paymentController = {
  payOrder: async (req, res) => {
    try {
      const userId = req.user;
      const orderId = req.params.orderId;
      const { paymentMethod } = req.body;

      const order = await paymentService.processPayment(orderId, userId, paymentMethod);

      res.status(200).json({
        message: "Payment successful",
        order,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || "Payment failed",
      });
    }
  },
};

export default paymentController;