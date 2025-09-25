import express from 'express'
import productController from "../controllers/productController.js"
import userViewController from '../controllers/userViewController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware({ optional: true }), productController.getProductView);
router.get('/products/:id', authMiddleware({ optional: true }), productController.getDetailsView);
router.get('/login', userViewController.getLoginView);
router.post('/login', userViewController.postLoginView);
router.get('/register', userViewController.getRegisterView);
router.post('/register', userViewController.postRegisterView);
router.get('/logout', userViewController.logout);

export default router
