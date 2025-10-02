import orderController from '../controllers/orderController.js'
import authMiddleware from "../middlewares/authMiddleware.js"

const useOrderRoute = async (router) => {
  router.get('/order',authMiddleware(), orderController.getAllOrders)
  router.get('/order/:id',authMiddleware(), orderController.getOrderById)
  router.post('/order',authMiddleware(), authMiddleware(),orderController.createOrder)
  router.get('/order/user/:userID', orderController.getOrderByUserId)
  router.put('/order/:id', authMiddleware(),orderController.updateOrderStatus)
  router.delete('/order/:id', authMiddleware(),orderController.deleteOrder)
  router.delete('/order/user/:userID', orderController.deleteOrdersByUserId)
  router.patch('/order/:id', authMiddleware(),orderController.restoreOrder)
}

export default useOrderRoute