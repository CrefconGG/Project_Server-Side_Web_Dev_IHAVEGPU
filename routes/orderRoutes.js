import orderController from '../controllers/orderController.js'
import authMiddleware from "../middlewares/apiMiddleware.js"

const useOrderRoute = async (router) => {
  // USER ROUTES
  router.post('/orders', authMiddleware({ allowedRoles: ["admin"] }), orderController.createOrder)       
  router.get('/orders/user', authMiddleware({ allowedRoles: ["admin"] }), orderController.getOrderByUser) 

  // ADMIN ROUTES
  router.get('/orders/user/:id', authMiddleware({ allowedRoles: ["admin"] }), orderController.getOrderByUserId)
  router.get('/orders', authMiddleware({ allowedRoles: ["admin"] }), orderController.getAllOrders) 
  router.get('/orders/:id', authMiddleware({ allowedRoles: ["admin"] }), orderController.getOrderById) 
  router.patch('/orders/:id/status', authMiddleware({ allowedRoles: ["admin"] }), orderController.updateOrderStatus) 
  router.delete('/orders/:id', authMiddleware({ allowedRoles: ["admin"] }), orderController.deleteOrder) 
  router.delete('/orders/user/:userID', authMiddleware({ allowedRoles: ["admin"] }), orderController.deleteOrdersByUserId) 
  router.patch('/orders/:id/restore', authMiddleware({ allowedRoles: ["admin"] }), orderController.restoreOrder) 
}

export default useOrderRoute