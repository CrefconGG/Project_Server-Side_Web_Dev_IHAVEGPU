import cartService from "../services/cartService.js";
import Cart from "../models/Cart.js";

jest.mock("../models/Cart.js");

describe("cartService.addItem", () => {
  it("ควรเพิ่มสินค้าใหม่เข้าในตะกร้าได้", async () => {
    const mockUserId = "user123";
    const mockProductId = "product123";

    const mockCart = {
      user: mockUserId,
      items: [],
      save: jest.fn().mockResolvedValue({
        user: mockUserId,
        items: [{ product: mockProductId, quantity: 1 }],
      }),
    };

    // mock behavior ของ Cart model
    Cart.findOne.mockResolvedValue(null); // ยังไม่มี cart
    Cart.mockImplementation(() => mockCart); // สร้าง cart ใหม่

    // เรียกใช้จริง
    const result = await cartService.addItem(mockUserId, mockProductId, 1);

    // ตรวจสอบผลลัพธ์
    expect(Cart.findOne).toHaveBeenCalledWith({ user: mockUserId });
    expect(mockCart.save).toHaveBeenCalled();
    expect(result.items).toHaveLength(1);
    expect(result.items[0].product).toBe(mockProductId);
  });
});
