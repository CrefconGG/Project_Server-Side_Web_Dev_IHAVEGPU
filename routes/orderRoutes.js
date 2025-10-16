import orderController from '../controllers/orderController.js'
import authMiddleware from "../middlewares/apiMiddleware.js"

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API สำหรับจัดการคำสั่งซื้อ (Order)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - product
 *         - quantity
 *         - price
 *       properties:
 *         product:
 *           type: string
 *           description: Product ID
 *           example: "67100c9013c45b65a24a1af3"
 *         quantity:
 *           type: integer
 *           description: Number of units
 *           example: 2
 *         price:
 *           type: number
 *           description: Price per item
 *           example: 499.99
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - items
 *         - totalPrice
 *       properties:
 *         _id:
 *           type: string
 *           example: "672028dc2e41e4cb9f00145f"
 *         user:
 *           type: string
 *           description: User ID who placed the order
 *           example: "67100c8d13c45b65a24a1aef"
 *         items:
 *           type: array
 *           description: List of purchased items
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalPrice:
 *           type: number
 *           description: Total price of all items
 *           example: 999.98
 *         status:
 *           type: string
 *           enum: [pending, paid, cancelled]
 *           default: pending
 *           example: "paid"
 *         isDeleted:
 *           type: boolean
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-16T12:00:00Z"
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get orders of current user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *   post:
 *     summary: Create a new order from user's cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID (User can only view their own, Admin can view all)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       403:
 *         description: Access denied
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, cancelled]
 *     responses:
 *       200:
 *         description: Updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Soft delete an order (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order soft deleted
 */

/**
 * @swagger
 * /orders/{id}/restore:
 *   patch:
 *     summary: Restore a soft-deleted order (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order restored
 */

const useOrderRoute = async (router) => {
  // USER ROUTES
  router.post('/orders', authMiddleware(), orderController.createOrder)       
  router.get('/orders', authMiddleware(), orderController.getOrderByUser) 

  router.get('/orders/:id', authMiddleware({ allowedRoles: ["user", "admin"] }), orderController.getOrderById)

  // ADMIN ROUTES
  router.get('/orders/user/:id', authMiddleware({ allowedRoles: ["admin"] }), orderController.getOrderByUserId)
  router.get('/admin/orders', authMiddleware({ allowedRoles: ["admin"] }), orderController.getAllOrders)
  router.patch('/orders/:id/status', authMiddleware({ allowedRoles: ["admin"] }), orderController.updateOrderStatus) 
  router.delete('/orders/:id', authMiddleware({ allowedRoles: ["admin"] }), orderController.deleteOrder) 
  router.delete('/orders/user/:userID', authMiddleware({ allowedRoles: ["admin"] }), orderController.deleteOrdersByUserId) 
  router.patch('/orders/:id/restore', authMiddleware({ allowedRoles: ["admin"] }), orderController.restoreOrder) 
}

export default useOrderRoute