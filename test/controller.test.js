// test/productController.test.js
import request from "supertest";
import app from "../app.js";
import productService from "../services/productService.js";

jest.mock("../services/productService.js"); // mock service

describe("Product API Integration Tests", () => {
  afterEach(() => jest.clearAllMocks());

  // GET /api/products
  it("GET /api/products → should return all products", async () => {
    const mockProducts = [
      { _id: "1", name: "RTX9070" },
      { _id: "2", name: "RTX3080" },
    ];
    productService.getAllProducts.mockResolvedValue(mockProducts);

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockProducts);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/products/:id → should return single product", async () => {
    const mockProduct = { _id: "1", name: "RTX9070" };
    productService.getProductsByID.mockResolvedValue(mockProduct);

    const res = await request(app).get("/api/products/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockProduct);
  });
});