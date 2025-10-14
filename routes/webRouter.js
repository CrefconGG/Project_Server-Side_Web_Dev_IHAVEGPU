import express from 'express'
import productViewController from '../controllers/productViewController.js'
import userViewController from '../controllers/userViewController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import cartViewController from "../controllers/cartViewController.js";
import orderViewController from "../controllers/orderViewController.js";
import paymentController from "../controllers/paymentController.js";

const router = express.Router()

router.get('/', authMiddleware({ optional: true }), productViewController.getProductView);
router.get('/products/:id', authMiddleware({ optional: true }), productViewController.getDetailsView);
router.get("/cart", authMiddleware({ optional: false }), cartViewController.getCartView);
router.get('/login', userViewController.getLoginView);
router.post('/login', userViewController.postLoginView);
router.get('/register', userViewController.getRegisterView);
router.post('/register', userViewController.postRegisterView);
router.get('/logout', userViewController.logout);

router.get('/orders', authMiddleware(), orderViewController.getUserOrdersView);
router.get('/orders/:id', authMiddleware(), orderViewController.getOrderDetailsView);
router.get('/admin/orders', authMiddleware({ requiredRole: "admin" }), orderViewController.getAllOrdersView);
router.patch('/orders/:id/status', authMiddleware({ requiredRole: "admin" }), orderViewController.updateStatusView);
router.delete('/orders/:id', authMiddleware({ requiredRole: "admin" }), orderViewController.deleteOrderView);

router.post("/payments/:orderId/pay", authMiddleware(), paymentController.payOrder);

export default router
