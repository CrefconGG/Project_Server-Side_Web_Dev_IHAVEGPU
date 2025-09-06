import User from "../models/User.js"

const userService = {
  getAllUsers: async () => {
    return await User.find();
  },
  getUserById: async (id) => {
    return await User.findById(id); 
  },
  createUser: async(userID, name, email, password, role) => {
    return await User.createUser({
      userID, name, email, password, role
    })
  }
}

export default userService