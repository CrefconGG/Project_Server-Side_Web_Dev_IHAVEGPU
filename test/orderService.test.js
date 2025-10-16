import orderService from "../services/orderService.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

jest.mock("../models/Cart.js");
jest.mock("../models/Order.js");

describe("orderService.createOrder", () => {
  it("ควรสร้าง order ใหม่จาก cart และเคลียร์ cart", async () => {
    const mockUserId = "user123";

    // Mock cart ของ user
    const mockCart = {
      user: mockUserId,
      items: [
        { product: { _id: "p1", price: 100 }, quantity: 2 },
        { product: { _id: "p2", price: 50 }, quantity: 1 },
      ],
      save: jest.fn().mockResolvedValue(true),
    };

    // Mock populate chain ของ Cart.findOne()
    Cart.findOne.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockCart),
    });

    // Mock Order.create
    const mockOrderCreated = {
      user: mockUserId,
      items: [
        { product: "p1", quantity: 2, price: 100 },
        { product: "p2", quantity: 1, price: 50 },
      ],
      totalPrice: 250,
      status: "pending",
    };
    Order.create.mockResolvedValue(mockOrderCreated);

    
    const result = await orderService.createOrder(mockUserId);

    expect(Cart.findOne).toHaveBeenCalledWith({ user: mockUserId });
    expect(mockCart.save).toHaveBeenCalled();
    expect(Order.create).toHaveBeenCalledWith({
      user: mockUserId,
      items: [
        { product: "p1", quantity: 2, price: 100 },
        { product: "p2", quantity: 1, price: 50 },
      ],
      totalPrice: 250,
      status: "pending",
    });
    expect(mockCart.items).toEqual([]);
    expect(result.totalPrice).toBe(250);
  });

  it("ควร throw error ถ้า cart ว่าง", async () => {
    const mockUserId = "userEmpty";

    Cart.findOne.mockReturnValue({
      populate: jest.fn().mockResolvedValue({ items: [] }),
    });

    await expect(orderService.createOrder(mockUserId))
      .rejects
      .toThrow("Cart is empty");
  });
});
