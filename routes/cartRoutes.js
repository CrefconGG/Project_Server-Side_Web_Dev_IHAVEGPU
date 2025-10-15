import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/apiMiddleware.js"

const useCartRoute = async (router) => {
  router.get("/cart", authMiddleware({ allowedRoles: ["admin","user"] }), cartController.getCartByUserId);
  router.post("/cart/items", authMiddleware({ allowedRoles: ["admin","user"] }), cartController.addItem);
  router.delete("/cart/items/:productID", authMiddleware({ allowedRoles: ["admin","user"] }), cartController.removeItem);
  router.put("/cart/items/:productID", authMiddleware({ allowedRoles: ["admin","user"] }), cartController.updateItemQuantity);
  router.delete("/cart", authMiddleware({ allowedRoles: ["admin","user"] }), cartController.clearCart);
};

export default useCartRoute;
