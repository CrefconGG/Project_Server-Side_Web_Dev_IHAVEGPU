import jwt from "jsonwebtoken"
import userService from "../services/userService.js";

const authMiddleware = ({ requiredRole } = {}) => {
  return async (req, res, next) => {
    try {
      const jwt_secret = process.env.JWT_SECRET;
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const tokenArray = authHeader.split(' '); // ["Bearer", "<token>"]
      if (tokenArray.length !== 2) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decodedToken = jwt.verify(tokenArray[1], jwt_secret);
      const user = await userService.getUserById(decodedToken.userId);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // ตรวจ role
      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }

      req.user = user; // เก็บ object user ไว้ใน request
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}

export default authMiddleware;
