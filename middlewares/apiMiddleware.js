import jwt from "jsonwebtoken";
import userService from "../services/userService.js";

const authMiddleware = ({ allowedRoles } = {}) => {
  return async (req, res, next) => {
    try {
      const jwt_secret = process.env.JWT_SECRET;

      // 1️⃣ อ่าน token จาก header หรือ cookie
      let token;
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        const tokenArray = authHeader.split(' ');
        if (tokenArray.length === 2) token = tokenArray[1];
      } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
      }

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decodedToken = jwt.verify(token, jwt_secret);
      const user = await userService.getUserById(decodedToken.userId);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // 2️⃣ ตรวจ role
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: You do not have access" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default authMiddleware;