import userService from "../services/userService.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const usernameRegex = /^[a-zA-Z0-9_.]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

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
      if (!user) return res.status(404).json({ errors: ["User not found"] });
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
  },
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const errors = [];

      if (!name || !usernameRegex.test(name)) errors.push("Invalid or missing username");
      if (!email || !emailRegex.test(email)) errors.push("Invalid or missing email");
      if (!password || !passwordRegex.test(password)) errors.push("Invalid or missing password");
      if (await userService.getByUsername(name)) errors.push("Username already exists");
      if (await userService.getByEmail(email)) errors.push("Email already exists");
      if (errors.length > 0) return res.status(400).json({ errors });
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userService.createUser(name, email, hashedPassword, 'user');
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const { name, password } = req.body;
      const user = await userService.getByUsername(name);

      if (!user) {
        return res.status(401).json({
          message: "Username or Password incorrect"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Username or Password incorrect"
        });
      }

      const jwt_secret = process.env.JWT_SECRET;
      const payload = { name: user.name, userId: user._id, role: user.role };
      const token = jwt.sign(payload, jwt_secret, { expiresIn: "3d" });

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default userController