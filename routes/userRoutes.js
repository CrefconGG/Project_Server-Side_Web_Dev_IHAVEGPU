import userController from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API สำหรับจัดการผู้ใช้
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: รหัสผู้ใช้
 *         username:
 *           type: string
 *           description: ชื่อผู้ใช้
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           example: admin
 *         isDeleted:
 *           type: boolean
 *           example: false
 */

const useUserRoute = async (router) => {

  /**
   * @swagger
   * /user:
   *   get:
   *     summary: ดึงข้อมูลผู้ใช้ทั้งหมด
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: รายชื่อผู้ใช้ทั้งหมด
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  router.get('/user', authMiddleware({ requiredRole: "admin" }), userController.getAllUsers)


  /**
   * @swagger
   * /user/{id}:
   *   get:
   *     summary: ดึงข้อมูลผู้ใช้ตาม ID
   *     tags: [Users]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *         description: รหัสผู้ใช้
   *     responses:
   *       200:
   *         description: ข้อมูลผู้ใช้
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: ไม่พบผู้ใช้
   */
  router.get('/user/:id', authMiddleware({ requiredRole: "admin" }), userController.getUserById)



  /**
   * @swagger
   * /user/{id}:
   *   put:
   *     summary: แก้ไขข้อมูลผู้ใช้
   *     tags: [Users]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: อัปเดตสำเร็จ
   */
  router.put('/user/:id', authMiddleware({ requiredRole: "admin" }), userController.updateUser)


  /**
   * @swagger
   * /user/{id}:
   *   delete:
   *     summary: ลบผู้ใช้ (soft delete)
   *     tags: [Users]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: ลบสำเร็จ
   */
  router.delete('/user/:id', authMiddleware({ requiredRole: "admin" }), userController.softDeleteUser)


  /**
   * @swagger
   * /user/{id}:
   *   patch:
   *     summary: กู้คืนผู้ใช้ที่ถูกลบ
   *     tags: [Users]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: กู้คืนสำเร็จ
   */
  router.patch('/user/:id', authMiddleware({ requiredRole: "admin" }), userController.restoreUser)


  /**
   * @swagger
   * /login:
   *   post:
   *     summary: เข้าสู่ระบบ
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: เข้าสู่ระบบสำเร็จ
   *       401:
   *         description: อีเมลหรือรหัสผ่านไม่ถูกต้อง
   */
  router.post('/login', userController.login)


  /**
   * @swagger
   * /register:
   *   post:
   *     summary: สมัครสมาชิก/สร้างผู้ใช้ใหม่
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: สมัครสมาชิกสำเร็จ
   *       400:
   *         description: ข้อมูลไม่ถูกต้อง
   */
  router.post('/register', userController.register)
}

export default useUserRoute
