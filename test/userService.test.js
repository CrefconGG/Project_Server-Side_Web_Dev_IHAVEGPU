import userService from "../services/userService.js";
import User from "../models/User.js";

jest.mock("../models/User.js");

describe("userService", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getAllUsers ควรคืนค่า users ที่ยังไม่ถูกลบ", async () => {
    const mockUsers = [{ name: "Alice" }, { name: "Bob" }];
    User.find.mockResolvedValue(mockUsers);

    const result = await userService.getAllUsers();

    expect(User.find).toHaveBeenCalledWith({ isDeleted: false });
    expect(result).toBe(mockUsers);
  });

  it("getUserById ควรคืนค่า user ตาม id", async () => {
    const mockUser = { _id: "id123", name: "Alice" };
    User.findById.mockResolvedValue(mockUser);

    const result = await userService.getUserById("id123");

    expect(User.findById).toHaveBeenCalledWith("id123");
    expect(result).toBe(mockUser);
  });

  it("createUser ควรสร้าง user ใหม่", async () => {
    const mockUser = { _id: "id123", name: "Alice", email: "a@a.com", password: "123", role: "user" };
    User.create.mockResolvedValue(mockUser);

    const result = await userService.createUser("Alice", "a@a.com", "123", "user");

    expect(User.create).toHaveBeenCalledWith({
      name: "Alice",
      email: "a@a.com",
      password: "123",
      role: "user"
    });
    expect(result).toBe(mockUser);
  });

  it("getByUsername ควรคืนค่า user ตามชื่อ", async () => {
    const mockUser = { name: "Alice" };
    User.findOne.mockResolvedValue(mockUser);

    const result = await userService.getByUsername("Alice");

    expect(User.findOne).toHaveBeenCalledWith({ name: "Alice" });
    expect(result).toBe(mockUser);
  });

  it("getByEmailOrUsername ควรคืนค่า user ตาม email หรือ username", async () => {
    const mockUser = { name: "Alice", email: "a@a.com" };
    User.findOne.mockResolvedValue(mockUser);

    const result = await userService.getByEmailOrUsername("a@a.com");

    expect(User.findOne).toHaveBeenCalledWith({ $or: [{ email: "a@a.com" }, { name: "a@a.com" }] });
    expect(result).toBe(mockUser);
  });

  it("updateUser ควรอัพเดต user ตาม id", async () => {
    const mockUser = { _id: "id123", name: "Alice" };
    const updateData = { name: "AliceUpdated" };
    User.findByIdAndUpdate.mockResolvedValue({ ...mockUser, ...updateData });

    const result = await userService.updateUser("id123", updateData);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("id123", updateData, { new: true });
    expect(result.name).toBe("AliceUpdated");
  });

  it("softDeleteUser ควรตั้ง isDeleted เป็น true", async () => {
    const mockUser = { _id: "id123", isDeleted: true };
    User.findByIdAndUpdate.mockResolvedValue(mockUser);

    const result = await userService.softDeleteUser("id123");

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("id123", { isDeleted: true }, { new: true });
    expect(result.isDeleted).toBe(true);
  });

  it("restoreUser ควรตั้ง isDeleted เป็น false", async () => {
    const mockUser = { _id: "id123", isDeleted: false };
    User.findByIdAndUpdate.mockResolvedValue(mockUser);

    const result = await userService.restoreUser("id123");

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("id123", { isDeleted: false }, { new: true });
    expect(result.isDeleted).toBe(false);
  });

});
