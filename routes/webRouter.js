import express from 'express'
import productController from "../controllers/productController.js"
import userViewController from '../controllers/userViewController.js'

const router = express.Router()

router.get('/', productController.getProductView);
router.get('/products/:id', productController.getDetailsView);

router.get('/login', userViewController.getLoginView);
router.post('/login', userViewController.postLoginView);
router.get('/register', userViewController.getRegisterView);
router.post('/register', userViewController.postRegisterView);

export default router
