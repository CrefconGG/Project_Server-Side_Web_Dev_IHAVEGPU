import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/apiMiddleware.js"

const useCartRoute = async (router) => {
  router.get("/cart", authMiddleware({ allowedRoles: ["admin"] }), cartController.getCartByUserId);
  router.post("/cart/items", authMiddleware({ allowedRoles: ["admin"] }), cartController.addItem);
  router.delete("/cart/items/:productID", authMiddleware({ allowedRoles: ["admin"] }), cartController.removeItem);
  router.put("/cart/items/:productID", authMiddleware({ allowedRoles: ["admin"] }), cartController.updateItemQuantity);
  router.delete("/cart", authMiddleware({ allowedRoles: ["admin"] }), cartController.clearCart);
};

export default useCartRoute;
