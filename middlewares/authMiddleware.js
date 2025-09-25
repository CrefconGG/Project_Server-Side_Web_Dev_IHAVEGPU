import jwt from "jsonwebtoken";
import userService from "../services/userService.js";

const authMiddleware = ({ requiredRole = undefined, optional = false } = {}) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.token;

      if (!token) {
        if (optional) {
          req.user = null;
          return next();
        }
        return res.status(401).redirect("/login");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userService.getUserById(decoded.userId);

      if (!user) {
        if (optional) {
          req.user = null;
          return next();
        }
        return res.status(401).redirect("/login");
      }

      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).send("Forbidden");
      }

      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      if (optional) {
        req.user = null;
        return next();
      }
      res.status(401).redirect("/login");
    }
  };
};

export default authMiddleware;
