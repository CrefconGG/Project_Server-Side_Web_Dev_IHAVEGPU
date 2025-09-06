import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: Number,
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