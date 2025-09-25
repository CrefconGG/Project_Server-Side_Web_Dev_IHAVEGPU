import userController from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const useUserRoute = async (router) => {
  router.get('/user', authMiddleware({ requiredRole: "admin" }), userController.getAllUsers)
  router.get('/user/:id', authMiddleware({ requiredRole: "admin" }), userController.getUserById)
  router.post('/user', authMiddleware(), userController.createUser)
  router.put('/user/:id', authMiddleware({ requiredRole: "admin" }), userController.updateUser)
  router.delete('/user/:id', authMiddleware({ requiredRole: "admin" }), userController.softDeleteUser)
  router.patch('/user/:id', authMiddleware({ requiredRole: "admin" }), userController.restoreUser)
  router.post('/login', userController.login)
  router.post('/register', userController.register)
}

export default useUserRoute