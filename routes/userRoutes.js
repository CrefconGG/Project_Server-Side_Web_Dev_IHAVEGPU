import userController from "../controllers/userController.js"

const useUserRoute = async (router) => {
  router.get('/user', userController.getAllUsers)
  router.get('/user/:id', userController.getUserById)
  router.post('/user',userController.createUser)
  router.put('/user/:id', userController.updateUser)
  router.delete('/user/:id', userController.softDeleteUser)
  router.patch('/user/:id', userController.restoreUser)
}

export default useUserRoute