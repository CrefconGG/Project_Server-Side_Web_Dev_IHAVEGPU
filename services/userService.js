import User from "../models/User.js"

const userService = {
  getAllUsers: async () => {
    return await User.find();
  },
  getUserById: async (id) => {
    return await User.findById(id); 
  },
  create: async(name, age, phone) => {
    return await User.create({
      name, age, phone
    })
  }
}

export default userService