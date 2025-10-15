import paymentController from "../controllers/paymentController.js";
import authMiddleware from "../middlewares/apiMiddleware.js";

const usePaymentRoute = async (router) => {
  router.post("/payments/:orderId/pay", authMiddleware({ requiredRole: "admin" }), paymentController.payOrder);
};

export default usePaymentRoute;
