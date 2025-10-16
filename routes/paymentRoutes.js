import paymentController from "../controllers/paymentController.js";
import authMiddleware from "../middlewares/apiMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Mock payment APIs
 */

/**
 * @swagger
 * /payments/{orderId}/pay:
 *   post:
 *     summary: Mock payment for an order
 *     description: Users can pay their own orders. Admin can pay any order (mock).
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentMethod
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 example: "QR"
 *     responses:
 *       200:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment successful"
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Payment failed or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment failed"
 *       404:
 *         description: Order not found or access denied
 */

const usePaymentRoute = async (router) => {
  router.post("/payments/:orderId/pay", authMiddleware(), paymentController.payOrder);
};

export default usePaymentRoute;
