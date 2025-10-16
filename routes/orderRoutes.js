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
 * /orders:
 *   post:
 *     summary: สร้างคำสั่งซื้อใหม่
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: สร้างคำสั่งซื้อสำเร็จ
 *       400:
 *         description: คำขอไม่ถูกต้อง
 *
 *   get:
 *     summary: ดึงคำสั่งซื้อของผู้ใช้ปัจจุบัน
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: สำเร็จ
 *       401:
 *         description: ไม่ได้เข้าสู่ระบบ
 */

/**
 * @swagger
 * /orders/user/{id}:
 *   get:
 *     summary: ดึงคำสั่งซื้อของผู้ใช้ตาม ID (admin เท่านั้น)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID ของผู้ใช้
 *     responses:
 *       200:
 *         description: สำเร็จ
 *       403:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: ดึงคำสั่งซื้อทั้งหมด (admin เท่านั้น)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: สำเร็จ
 *       403:
 *         description: ไม่มีสิทธิ์เข้าถึง
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: ดึงรายละเอียดคำสั่งซื้อด้วย ID (admin เท่านั้น)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID ของคำสั่งซื้อ
 *     responses:
 *       200:
 *         description: สำเร็จ
 *       404:
 *         description: ไม่พบข้อมูล
 *
 *   patch:
 *     summary: เปลี่ยนสถานะคำสั่งซื้อ (admin เท่านั้น)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID ของคำสั่งซื้อ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: complete
 *     responses:
 *       200:
 *         description: อัปเดตสำเร็จ
 */

/**
 * @swagger
 * /orders/{id}/restore:
 *   patch:
 *     summary: กู้คืนคำสั่งซื้อ (admin เท่านั้น)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: กู้คืนสำเร็จ
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: ลบคำสั่งซื้อด้วย ID (admin เท่านั้น)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
 */

/**
 * @swagger
 * /orders/user/{userID}:
 *   delete:
 *     summary: ลบคำสั่งซื้อทั้งหมดของผู้ใช้ (admin เท่านั้น)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ลบสำเร็จ
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