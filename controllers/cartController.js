import cartService from "../services/cartService.js";

const cartController = {
  // 🛒 ดึงรถเข็นของ user ที่ล็อกอินอยู่
  getCartByUserId: async (req, res) => {
    try {
      const userID = req.user._id;
      const cart = await cartService.getCartByUserId(userID);

      if (!cart) {
        return res.status(200).json({ user: userID, items: [] });
      }

      res.status(200).json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to load cart" });
    }
  },

  // ➕ เพิ่มสินค้าเข้ารถเข็น
  addItem: async (req, res) => {
    try {
      const userID = req.user._id;
      const { productID, quantity } = req.body;

      if (!productID) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const cart = await cartService.addItem(userID, productID, quantity || 1);
      res.status(200).json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  // ❌ ลบสินค้าออกจากรถเข็น
  removeItem: async (req, res) => {
    try {
      const userID = req.user._id;
      const { productID } = req.params;

      if (!productID) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const cart = await cartService.removeItem(userID, productID);
      res.status(200).json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  // 🔁 เปลี่ยนจำนวนสินค้าในรถเข็น
  updateItemQuantity: async (req, res) => {
    try {
      const userID = req.user._id;
      const { productID } = req.params;
      const { quantity } = req.body;

      if (!productID || quantity == null) {
        return res.status(400).json({ error: "Product ID and quantity are required" });
      }

      if (quantity < 1) {
        return res.status(400).json({ error: "Quantity must be at least 1" });
      }

      const cart = await cartService.updateItemQuantity(userID, productID, quantity);
      res.status(200).json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  // 🧹 ล้างรถเข็นทั้งหมดของ user
  clearCart: async (req, res) => {
    try {
      const userID = req.user._id;
      const cart = await cartService.clearCart(userID);
      res.status(200).json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
};

export default cartController;
