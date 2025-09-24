import express from 'express'
import productController from "../controllers/productController.js"
import userController from "../controllers/userController.js"

const router = express.Router()

router.get('/listproducts', productController.getProductView);
router.get('/products/:id', productController.getDetailsView);

router.get('/', userController.getLoginView);
router.post('/', userController.postLoginView);
router.get('/register', userController.getRegisterView);
router.post('/register', userController.postRegisterView);

export default router
