import cartService from "../services/cartService.js";
import cartController from "./cartController.js";
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
        image: item.product.imagesURL?.[0],
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
  additem: async (req, res) => {
    try {
      const userID = req.user;
      const { productID, quantity } = req.body;
      const cart = await cartService.addItem(userID, productID, quantity);
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export default cartViewController;
