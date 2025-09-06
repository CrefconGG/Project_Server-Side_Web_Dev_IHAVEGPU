import userService from "../services/userService.js"

const userController = {
  getAllUsers: async (req, res) => {
    try{
      const users = await userService.getAllUsers()
      res.status(200).json(users)
    } catch(err) {
      res.status(500).json(err)
    }
  },
  getUserById: async (req, res) => {
    try {
      const id = req.params.id
      const user = await userService.getUserById(id)
      res.status(200).json(user)
    } catch(err) {
      res.status(500).json(err)
    }
    
  },
  create: async (req, res) => {
    try{
      const { name, age, phone } = req.body
      const user = await userService.create(name, age, phone)
      res.status(201).json(user)
    } catch(err){
      res.status(500).json(err)
    }
    
  }
}

export default userController