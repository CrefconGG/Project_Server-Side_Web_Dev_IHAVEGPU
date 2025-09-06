import userService from "../services/userService.js"

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers()
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  getUserById: async (req, res) => {
    try {
      const id = req.params.id
      const user = await userService.getUserById(id)
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }

  },
  createUser: async (req, res) => {
    try {
      const { name, email, password, role } = req.body
      const user = await userService.createUser(name, email, password, role)
      res.status(201).json(user)
    } catch (err) {
      res.status(500).json(err)
    }

  },
  updateUser: async (req, res) => {
    try {
      const id = req.params.id
      const data = req.body
      const user = await userService.updateUser(id, data)
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  softDeleteUser: async (req, res) => {
    try {
      const id = req.params.id
      const user = await userService.softDeleteUser(id)
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  restoreUser: async (req, res) => {
    try {
      const id = req.params.id
      const user = await userService.restoreUser(id)
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

export default userController