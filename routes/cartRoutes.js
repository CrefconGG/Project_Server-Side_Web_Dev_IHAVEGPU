import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/apiMiddleware.js"

const useCartRoute = async (router) => {
  router.get("/cart", authMiddleware({ requiredRole: "admin" }), cartController.getCartByUserId);
  router.post("/cart/items", authMiddleware({ requiredRole: "admin" }), cartController.addItem);
  router.delete("/cart/items/:productID", authMiddleware({ requiredRole: "admin" }), cartController.removeItem);
  router.put("/cart/items/:productID", authMiddleware({ requiredRole: "admin" }), cartController.updateItemQuantity);
  router.delete("/cart", authMiddleware({ requiredRole: "admin" }), cartController.clearCart);
};

export default useCartRoute;
