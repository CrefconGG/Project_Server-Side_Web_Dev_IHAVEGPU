import express from 'express'
import useUserRoute from './userRoutes.js'
import useOrderRoute from './orderRoutes.js'
const router = express.Router()

useUserRoute(router)
useOrderRoute(router)

export default router