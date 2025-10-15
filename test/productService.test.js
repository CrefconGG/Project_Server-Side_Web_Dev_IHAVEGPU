import productService from "../services/productService.js";
import Product from "../models/Product.js";

jest.mock("../models/Product.js", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
  countDocuments: jest.fn(),
  distinct: jest.fn(),
}));

describe("Product Service Unit Test", () => {
  afterEach(() => jest.clearAllMocks());

  it("getAllProducts → ควรคืน list ของสินค้า", async () => {
    const mockProducts = [{ _id: "1", name: "RTX9070" }];
    Product.find.mockResolvedValue(mockProducts);

    const result = await productService.getAllProducts();

    expect(Product.find).toHaveBeenCalledWith({ isDeleted: false });
    expect(result).toEqual(mockProducts);
  });

  it("getProductsByID → ควรคืนสินค้าตาม id", async () => {
    const mockProduct = { _id: "1", name: "RTX9070" };
    Product.findOne.mockResolvedValue(mockProduct);

    const result = await productService.getProductsByID("1");

    expect(Product.findOne).toHaveBeenCalledWith({ _id: "1", isDeleted: false });
    expect(result).toEqual(mockProduct);
  });

  it("createProducts → create new product", async () => {
    const mockProduct = { _id: "1", name: "RTX9070" };
    Product.create.mockResolvedValue(mockProduct);

    const result = await productService.createProducts("RTX9070", "GPU", 5, 1000, ["img.png"]);

    expect(Product.create).toHaveBeenCalledWith({
      name: "RTX9070",
      category: "GPU",
      stock: 5,
      price: 1000,
      imagesURL: ["img.png"],
    });
    expect(result).toEqual(mockProduct);
  });
});