import Cart from "../models/Cart.js";

const cartService = {
  getCartByUserId: async (userId) => {
    return await Cart.findOne({ user: userId }).populate("items.product") .populate("user");;
  },

  addItem: async (userId, productId, quantity = 1) => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    return await cart.save();
  },

  removeItem: async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return null;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId.toString()
    );

    return await cart.save();
  },

  updateItemQuantity: async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return null;

    const item = cart.items.find(
      (item) => item.product.toString() === productId.toString()
    );

    if (item) {
      item.quantity = quantity;
    }

    return await cart.save();
  },

  clearCart: async (userId) => {
    return await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } },
      { new: true }
    );
  },
};

export default cartService;
