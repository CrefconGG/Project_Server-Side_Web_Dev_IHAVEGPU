import cartService from "../services/cartService.js";
import mongoose from "mongoose";

const cartController = {
  getCartByUserId: async (req, res) => {
    try {
      const userID = req.user;

      if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({ errors: ["Invalid user ID"] });
      }

      const cart = await cartService.getCartByUserId(userID);
      if (!cart) {
        return res.status(200).json({ user: userID, items: [] });
      }
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addItem: async (req, res) => {
    try {
      const userID = req.user;
      const { productID, quantity } = req.body;
      const errors = [];

      if (!mongoose.Types.ObjectId.isValid(userID)) {
        errors.push("Invalid user ID");
      }

      if (!productID || !mongoose.Types.ObjectId.isValid(productID)) {
        errors.push("Invalid product ID");
      }

      if (quantity == null || typeof quantity !== "number" || quantity <= 0) {
        errors.push("Quantity must be a positive number");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const cart = await cartService.addItem(userID, productID, quantity);
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  removeItem: async (req, res) => {
    try {
      const userID = req.user;
      const { productID } = req.params;
      const errors = [];

      if (!mongoose.Types.ObjectId.isValid(userID)) {
        errors.push("Invalid user ID");
      }

      if (!mongoose.Types.ObjectId.isValid(productID)) {
        errors.push("Invalid product ID");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const cart = await cartService.removeItem(userID, productID);
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateItemQuantity: async (req, res) => {
    try {
      const userID = req.user;
      const { productID } = req.params;
      const { quantity } = req.body;
      const errors = [];

      if (!mongoose.Types.ObjectId.isValid(userID)) {
        errors.push("Invalid user ID");
      }

      if (!mongoose.Types.ObjectId.isValid(productID)) {
        errors.push("Invalid product ID");
      }

      if (quantity == null || typeof quantity !== "number" || quantity <= 0) {
        errors.push("Quantity must be a positive number");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const cart = await cartService.updateItemQuantity(userID, productID, quantity);
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  clearCart: async (req, res) => {
    try {
      const userID = req.user;

      if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({ errors: ["Invalid user ID"] });
      }

      const cart = await cartService.clearCart(userID);
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export default cartController;