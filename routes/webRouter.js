import express from 'express'
import productController from "../controllers/productController.js"
const router = express.Router()

router.get('/', productController.getProductView);
router.get('/products/:id', productController.getDetailsView);


export default router