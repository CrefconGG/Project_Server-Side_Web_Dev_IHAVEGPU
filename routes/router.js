import express from 'express'
import useUserRoute from './userRoutes.js'
import useOrderRoute from './orderRoutes.js'
import useProductRoute from './productRoutes.js'
import useCartRoute from './cartRoutes.js'
const router = express.Router()

useUserRoute(router)
useOrderRoute(router)
useProductRoute(router)
useCartRoute(router)


export default router