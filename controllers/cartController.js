import cartService from "../services/cartService.js";

const cartController = {
    getCartByUserId: async (req, res) => {
        try {
            const { userID } = req.params;
            const cart = await cartService.getCartByUserId(userID);
            if (!cart) {
                return res.status(200).json({ userID, items: [] });
            }
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    addItem: async (req, res) => {
        try {
            const { userID } = req.params;
            const { productID, quantity } = req.body;
            const cart = await cartService.addItemToCart(userID, productID, quantity);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    removeItem: async (req, res) => {
        try {
            const { userID, productID } = req.params;
            const cart = await cartService.removeItemFromCart(userID, productID);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateItemQuantity: async (req, res) => {
        try {
            const { userID, productID } = req.params;
            const { quantity } = req.body;
            const cart = await cartService.updateItemQuantity(userID, productID, quantity);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    clearCart: async (req, res) => {
        try {
            const { userID } = req.params;
            const cart = await cartService.clearCart(userID);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default cartController;
