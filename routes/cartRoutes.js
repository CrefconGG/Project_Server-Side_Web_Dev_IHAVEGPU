import cartController from "../controllers/cartController.js";

const useCartRoute = async (router) => {
  router.get("/cart/:userID", cartController.getCartByUserId);
  router.post("/cart/:userID/item", cartController.addItem);
  router.delete("/cart/:userID/item/:productID", cartController.removeItem);
  router.put("/cart/:userID/item/:productID", cartController.updateItemQuantity);
  router.delete("/cart/:userID", cartController.clearCart);
};

export default useCartRoute;
