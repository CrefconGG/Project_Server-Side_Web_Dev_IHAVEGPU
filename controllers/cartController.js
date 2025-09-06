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
            const { userID, productID, quantity } = req.body;
            const cart = await cartService.addItemToCart(userID, productID, quantity);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    removeItem: async (req, res) => {
        try {
            const { userID, productID } = req.body;
            const cart = await cartService.removeItemFromCart(userID, productID);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateItemQuantity: async (req, res) => {
        try {
            const { userID, productID, quantity } = req.body;
            const cart = await cartService.updateItemQuantity(
                userID,
                productID,
                quantity
            );
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    clearCart: async (req, res) => {
        try {
            const { userID } = req.body;
            const cart = await cartService.clearCart(userID);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default cartController;
