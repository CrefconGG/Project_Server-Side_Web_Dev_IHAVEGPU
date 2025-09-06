import cartController from "../controllers/cartController.js";

const useCartRoute = async (router) => {
  router.get("/cart/:userID", cartController.getCartByUserId);
  router.post("/cart/item", cartController.addItem);
  router.delete("/cart/item", cartController.removeItem);
  router.put("/cart/item", cartController.updateItemQuantity);
  router.delete("/cart", cartController.clearCart);
};

export default useCartRoute;
