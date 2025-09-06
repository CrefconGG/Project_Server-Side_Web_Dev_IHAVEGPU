import orderController from '../controllers/orderController.js'

const useOrderRoute = async (router) => {
  router.get('/order', orderController.getAllOrders)
  router.get('/order/:id', orderController.getOrderById)
  router.post('/order', orderController.createOrder)
  router.get('/order/user/:userID', orderController.getOrderByUserId)
  router.put('/order/:id', orderController.updateOrderStatus)
  router.delete('/order/:id', orderController.deleteOrder)
  router.delete('/order/user/:userID', orderController.deleteOrdersByUserId)
  router.patch('/order/:id', orderController.restoreOrder)
}

export default useOrderRoute