import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const useCartRoute = async (router) => {
  router.get("/cart/:userID", authMiddleware("user"), cartController.getCartByUserId);
  router.post("/cart/:userID/item", authMiddleware("user"), cartController.addItem);
  router.delete("/cart/:userID/item/:productID", authMiddleware("user"), cartController.removeItem);
  router.put("/cart/:userID/item/:productID", authMiddleware("user"), cartController.updateItemQuantity);
  router.delete("/cart/:userID",authMiddleware("user"), cartController.clearCart);
};

export default useCartRoute;
