import paymentService from "../services/paymentService.js";
import Order from "../models/Order.js";

jest.mock("../models/Order.js");

describe("paymentService.processPayment", () => {
  it("ควรจ่ายเงินสำเร็จและอัพเดตสถานะ order เป็น paid", async () => {
    const mockOrderId = "order123";
    const mockUserId = "user123";
    const mockPaymentMethod = "QR";

    // Mock order object
    const mockOrder = {
      _id: mockOrderId,
      user: mockUserId,
      status: "pending",
      save: jest.fn().mockResolvedValue(true),
    };

    // Mock Order.findOne
    Order.findOne.mockResolvedValue(mockOrder);

    // เรียกใช้ฟังก์ชันจริง
    const result = await paymentService.processPayment(
      mockOrderId,
      mockUserId,
      mockPaymentMethod
    );

    // ตรวจสอบว่าค่า return ถูกต้อง
    expect(result.status).toBe("paid");
    expect(result.paymentInfo).toBeDefined();
    expect(result.paymentInfo.paymentMethod).toBe(mockPaymentMethod);

    // ตรวจสอบว่า save ถูกเรียก
    expect(mockOrder.save).toHaveBeenCalled();
    expect(Order.findOne).toHaveBeenCalledWith({
      _id: mockOrderId,
      user: mockUserId,
      isDeleted: false,
    });
  });
});
