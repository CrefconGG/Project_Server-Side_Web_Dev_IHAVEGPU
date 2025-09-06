import userController from "../controllers/userController.js"

const useUserRoute = async (router) => {
  router.get('/user', userController.getAllUsers)
  router.get('/user/:id', userController.getUserById)
  router.post('/user',userController.create)
}

export default useUserRoute