import orderController from '../controllers/orderController.js'
import apiMiddleware from "../middlewares/apiMiddleware.js"

const useOrderRoute = async (router) => {
  // USER ROUTES
  router.post('/orders', apiMiddleware(), orderController.createOrder)       
  router.get('/orders/user', apiMiddleware(), orderController.getOrderByUser) 

  // ADMIN ROUTES
  router.get('/orders/user/:id', apiMiddleware(['admin']), orderController.getOrderByUserId)
  router.get('/orders', apiMiddleware(['admin']), orderController.getAllOrders) 
  router.get('/orders/:id', apiMiddleware(['admin']), orderController.getOrderById) 
  router.patch('/orders/:id/status', apiMiddleware(['admin']), orderController.updateOrderStatus) 
  router.delete('/orders/:id', apiMiddleware(['admin']), orderController.deleteOrder) 
  router.delete('/orders/user/:userID', apiMiddleware(['admin']), orderController.deleteOrdersByUserId) 
  router.patch('/orders/:id/restore', apiMiddleware(['admin']), orderController.restoreOrder) 
}

export default useOrderRoute