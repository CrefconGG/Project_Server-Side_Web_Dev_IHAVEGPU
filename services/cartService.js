import Cart from "../models/Cart.js";

const cartService = {
    getCartByUserId: async (userID) => {
        return await Cart.findOne({ userID }).populate("items.productID");
    },
    addItemToCart: async (userID, productID, quantity = 1) => {
        let cart = await Cart.findOne({ userID });
        if (!cart) {
            cart = new Cart({ userID, items: [] });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productID.toString() === productID.toString()
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity; // ถ้ามีแล้ว บวกเพิ่ม
        } else {
            cart.items.push({ productID, quantity }); // ถ้าไม่มี ให้เพิ่มใหม่
        }

        return await cart.save();
    },
    removeItemFromCart: async (userID, productID) => {
        const cart = await Cart.findOne({ userID });
        if (!cart) return null;

        cart.items = cart.items.filter(
            (item) => item.productID.toString() !== productID.toString()
        );

        return await cart.save();
    },
    updateItemQuantity: async (userID, productID, quantity) => {
        const cart = await Cart.findOne({ userID });
        if (!cart) return null;

        const item = cart.items.find(
            (item) => item.productID.toString() === productID.toString()
        );

        if (item) {
            item.quantity = quantity;
        }

        return await cart.save();
    },
    clearCart: async (userID) => {
        return await Cart.findOneAndUpdate(
            { userID },
            { $set: { items: [] } },
            { new: true }
        );
    }
};

export default cartService;