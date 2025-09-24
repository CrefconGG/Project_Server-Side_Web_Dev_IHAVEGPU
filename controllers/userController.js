import userService from "../services/userService.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
  },
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
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
      res.redirect("/products");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getRegisterView: (req, res) => {
    res.render('register');
  },
  getLoginView: (req, res) => {
    res.render('login');
  },
  postLoginView: async (req, res) => {
    console.log("Body received:", req.body);
    try {
      const { identifier, password } = req.body;

      const user = await userService.getByEmailOrUsername(identifier); 
      if (!user) return res.render("login", { error: "User not found" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.render("login", { error: "Invalid password" });

      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.render("login", { error: "Something went wrong" });
    }
  },
  postRegisterView: async (req, res) => {
    console.log("Body received:", req.body);
    try {
      const { name, email, password } = req.body;
      const hashed = await bcrypt.hash(password, 10);

      await userService.createUser(name, email, hashed, "user");

      res.redirect("/login");
    } catch (err) {
      console.error(err);
      res.render("register", { error: "Something went wrong" });
    }
  }
}

export default userController