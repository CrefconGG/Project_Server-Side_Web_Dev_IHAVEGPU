import express from 'express'
import productController from "../controllers/productController.js"
const router = express.Router()

router.get('/',   productController.getProductView)


export default router