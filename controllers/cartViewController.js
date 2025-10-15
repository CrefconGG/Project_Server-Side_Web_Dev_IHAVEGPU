import cartService from "../services/cartService.js";

const cartViewController = {
  getCartView: async (req, res) => {
    try {
      const user = req.user;
      if (!user) return res.redirect("/login");

      const cart = await cartService.getCartByUserId(user._id);
      if (!cart || !cart.items.length) {
        return res.render("cart", { user, items: [], total: 0 });
      }

      // ใช้ข้อมูล product ที่ populate มาแล้ว
      const items = cart.items.map(item => ({
        id: item.product._id,
        name: item.product.name,
        image: item.product.imagesURL,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.quantity * item.product.price,
      }));

      const total = items.reduce((sum, i) => sum + i.subtotal, 0);

      res.render("cart", { user, items, total });
    } catch (err) {
      console.error("Error loading cart:", err);
      res.status(500).send("Error loading cart");
    }
  },
  
  // เพิ่มสินค้าเข้าตะกร้า
  addItemView: async (req, res) => {
    try {
      const user = req.user;
      const { productID, quantity } = req.body;

      await cartService.addItem(user._id, productID, quantity || 1);

      res.redirect("/cart");
    } catch (err) {
      console.error("Error adding item:", err);
      res.status(500).send("Failed to add item to cart");
    }
  },

  // ลบสินค้าออกจากตะกร้า
  removeItemView: async (req, res) => {
    try {
      const user = req.user;
      const { productID } = req.params;

      await cartService.removeItem(user._id, productID);
      res.redirect("/cart");
    } catch (err) {
      console.error("Error removing item:", err);
      res.status(500).send("Failed to remove item");
    }
  },

  // อัปเดตจำนวนสินค้า
  updateItemQuantityView: async (req, res) => {
    try {
      const user = req.user;
      const { productID } = req.params;
      const { quantity } = req.body;

      await cartService.updateItemQuantity(user._id, productID, quantity);
      res.redirect("/cart");
    } catch (err) {
      console.error("Error updating quantity:", err);
      res.status(500).send("Failed to update quantity");
    }
  },

   // ล้างตะกร้าทั้งหมด
  clearCartView: async (req, res) => {
    try {
      const user = req.user;
      await cartService.clearCart(user._id);
      res.redirect("/cart");
    } catch (err) {
      console.error("Error clearing cart:", err);
      res.status(500).send("Failed to clear cart");
    }
  }
};

export default cartViewController;
