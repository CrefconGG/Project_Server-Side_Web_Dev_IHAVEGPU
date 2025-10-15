import userController from "../controllers/userController.js";
import userService from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../services/userService.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("userController", () => {
  let res;
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("ควรสร้าง user ใหม่และส่ง status 201", async () => {
      const req = {
        body: { name: "Alice", email: "a@a.com", password: "1234" },
      };
      bcrypt.hash.mockResolvedValue("hashed1234");
      const mockUser = { name: "Alice", email: "a@a.com", password: "hashed1234", role: "user" };
      userService.createUser.mockResolvedValue(mockUser);

      await userController.register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith("1234", 10);
      expect(userService.createUser).toHaveBeenCalledWith("Alice", "a@a.com", "hashed1234", "user");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("login", () => {
    it("ควร login สำเร็จและส่ง token", async () => {
      const req = { body: { name: "Alice", password: "1234" } };
      const mockUser = { _id: "id123", name: "Alice", password: "hashed1234", role: "user" };
      userService.getByUsername.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mockedToken");
      process.env.JWT_SECRET = "secret";

      await userController.login(req, res);

      expect(userService.getByUsername).toHaveBeenCalledWith("Alice");
      expect(bcrypt.compare).toHaveBeenCalledWith("1234", "hashed1234");
      expect(jwt.sign).toHaveBeenCalledWith(
        { name: "Alice", userId: "id123", role: "user" },
        "secret",
        { expiresIn: "3d" }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: "mockedToken" });
    });

    it("ควร return 401 ถ้า username ไม่ถูกต้อง", async () => {
      const req = { body: { name: "Bob", password: "1234" } };
      userService.getByUsername.mockResolvedValue(null);

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Username or Password incorrect" });
    });

    it("ควร return 401 ถ้า password ไม่ถูกต้อง", async () => {
      const req = { body: { name: "Alice", password: "wrongpass" } };
      const mockUser = { _id: "id123", name: "Alice", password: "hashed1234", role: "user" };
      userService.getByUsername.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Username or Password incorrect" });
    });
  });
});
