import express from 'express'
import productViewController from '../controllers/productViewController.js'
import userViewController from '../controllers/userViewController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import cartViewController from "../controllers/cartViewController.js";

const router = express.Router()

router.get('/', authMiddleware({ optional: true }), productViewController.getProductView);
router.get('/products/:id', authMiddleware({ optional: true }), productViewController.getDetailsView);
router.get("/cart", authMiddleware({ optional: false }), cartViewController.getCartView);
router.get('/login', userViewController.getLoginView);
router.post('/login', userViewController.postLoginView);
router.get('/register', userViewController.getRegisterView);
router.post('/register', userViewController.postRegisterView);
router.get('/logout', userViewController.logout);


export default router
