import userController from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const useUserRoute = async (router) => {
  router.get('/user', authMiddleware("admin"), userController.getAllUsers)
  router.get('/user/:id', userController.getUserById)
  router.post('/user',userController.createUser)
  router.put('/user/:id', userController.updateUser)
  router.delete('/user/:id', userController.softDeleteUser)
  router.patch('/user/:id', userController.restoreUser)
  router.post('/user/login', userController.login)
  router.post('/user/register', userController.register)  
}

export default useUserRoute