import userController from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const useUserRoute = async (router) => {
  router.get('/user', authMiddleware("admin"), userController.getAllUsers)
  router.get('/user/:id', authMiddleware("admin"), userController.getUserById)
  router.post('/user', authMiddleware("admin"), userController.createUser)
  router.put('/user/:id', authMiddleware("admin"), userController.updateUser)
  router.delete('/user/:id', authMiddleware("admin"), userController.softDeleteUser)
  router.patch('/user/:id', authMiddleware("admin"), userController.restoreUser)
  router.post('/login', authMiddleware("admin"), userController.login)
  router.post('/register', authMiddleware("admin"), userController.register)  
}

export default useUserRoute