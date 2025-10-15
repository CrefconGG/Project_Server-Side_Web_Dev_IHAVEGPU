import orderController from '../controllers/orderController.js'
import authMiddleware from "../middlewares/apiMiddleware.js"

const useOrderRoute = async (router) => {
  // USER ROUTES
  router.post('/orders', apiMiddleware(), orderController.createOrder)       
  router.get('/orders/user', apiMiddleware(), orderController.getOrderByUser) 

  // ADMIN ROUTES
  router.get('/orders/user/:id', authMiddleware({ requiredRole: "admin" }), orderController.getOrderByUserId)
  router.get('/orders', authMiddleware({ requiredRole: "admin" }), orderController.getAllOrders) 
  router.get('/orders/:id', authMiddleware({ requiredRole: "admin" }), orderController.getOrderById) 
  router.patch('/orders/:id/status', authMiddleware({ requiredRole: "admin" }), orderController.updateOrderStatus) 
  router.delete('/orders/:id', authMiddleware({ requiredRole: "admin" }), orderController.deleteOrder) 
  router.delete('/orders/user/:userID', authMiddleware({ requiredRole: "admin" }), orderController.deleteOrdersByUserId) 
  router.patch('/orders/:id/restore', authMiddleware({ requiredRole: "admin" }), orderController.restoreOrder) 
}

export default useOrderRoute