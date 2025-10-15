import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/apiMiddleware.js"

const useCartRoute = async (router) => {
  router.get("/cart", authMiddleware(), cartController.getCartByUserId);
  router.post("/cart/items", authMiddleware(), cartController.addItem);
  router.delete("/cart/items/:productID", authMiddleware(), cartController.removeItem); 
  router.put("/cart/items/:productID", authMiddleware(), cartController.updateItemQuantity);
  router.delete("/cart", authMiddleware(), cartController.clearCart);
};

export default useCartRoute;
