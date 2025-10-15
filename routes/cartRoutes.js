import cartController from "../controllers/cartController.js";
import authMiddleware from "../middlewares/apiMiddleware.js"
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - product
 *         - quantity
 *       properties:
 *         product:
 *           type: string
 *           description: Product ID (ObjectId)
 *         quantity:
 *           type: integer
 *           description: Quantity of product
 *           minimum: 1
 *       example:
 *         product: 66aabbcc1122334455667788
 *         quantity: 2
 *     Cart:
 *       type: object
 *       required:
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           description: Cart ID
 *         user:
 *           type: string
 *           description: User ID owner of the cart
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 11223344556677889900aabb
 *         user: 99887766554433221100aabb
 *         items:
 *           - product: 66aabbcc1122334455667788
 *             quantity: 2
 *           - product: 66aabbcc9988776655443322
 *             quantity: 1
 *         createdAt: 2025-10-15T14:00:00Z
 *         updatedAt: 2025-10-15T15:00:00Z
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /cart/items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: Item added to cart
 */

/**
 * @swagger
 * /cart/items/{productID}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to remove
 *     responses:
 *       200:
 *         description: Item removed successfully
 */

/**
 * @swagger
 * /cart/items/{productID}:
 *   put:
 *     summary: Update quantity of a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *             example:
 *               quantity: 3
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 */

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear all items from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */


const useCartRoute = async (router) => {
  router.get("/cart",  authMiddleware({ allowedRoles: ["admin", "user"] }), cartController.getCartByUserId);
  router.post("/cart/items",  authMiddleware({ allowedRoles: ["admin", "user"] }), cartController.addItem);
  router.delete("/cart/items/:productID",  authMiddleware({ allowedRoles: ["admin", "user"] }), cartController.removeItem); 
  router.put("/cart/items/:productID",  authMiddleware({ allowedRoles: ["admin", "user"] }), cartController.updateItemQuantity);
  router.delete("/cart",  authMiddleware({ allowedRoles: ["admin", "user"] }), cartController.clearCart);
};

export default useCartRoute;
