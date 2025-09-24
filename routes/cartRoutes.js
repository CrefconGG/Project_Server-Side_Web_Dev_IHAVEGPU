import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const useCartRoute = async (router) => {
  router.get("/cart/:userID", authMiddleware(), cartController.getCartByUserId);
  router.post("/cart/:userID/item", authMiddleware(), cartController.addItem);
  router.delete("/cart/:userID/item/:productID", authMiddleware(), cartController.removeItem);
  router.put("/cart/:userID/item/:productID", authMiddleware(), cartController.updateItemQuantity);
  router.delete("/cart/:userID",authMiddleware(), cartController.clearCart);
};

export default useCartRoute;
