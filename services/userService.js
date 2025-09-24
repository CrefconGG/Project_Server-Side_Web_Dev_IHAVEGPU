import User from "../models/User.js"

const userService = {
  getAllUsers: async () => {
    return await User.find({ isDeleted: false });
  },
  getUserById: async (id) => {
    return await User.findById(id);
  },
  createUser: async (name, email, password, role) => {
    return await User.create({
      name, email, password, role
    });
  },
  getByUsername: async (name) => {
    return await User.findOne({ name });
  },
  getByEmailOrUsername: async (input) => {
    return await User.findOne({ $or: [{ email: input }, { name: input }] });
  },
  updateUser: async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
  },
  softDeleteUser: async (id) => {
    return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  },
  restoreUser: async (id) => {
    return await User.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
  }
}

export default userService;
