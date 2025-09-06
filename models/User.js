import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    require: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin'], 
    default: 'customer'
  }
})

const User = mongoose.model("User", UserSchema);

export default User