import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/apiMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: Product name
 *         category:
 *           type: string
 *           description: product category
 *         price:
 *           type: number
 *           description: Product price
 *         stock:
 *           type: number
 *           description: Number of items available
 *         isDeleted:
 *           type: boolean
 *           description: Whether the product is soft deleted
 *       example:
 *         id: 66aabbcc1122334455667788
 *         name: i5-12400F
 *         category: CPU
 *         stock: 10
 *         price: 250
 *         imagesURL: example.com
 *         isDeleted: false
 */
/**
 * @swagger
 * /pagination:
 *   get:
 *     summary: Get all products with pagination, search, category filter, and sorting
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search products by name (case-insensitive)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Number of products per page
 *       - in: query
 *         name: sortOption
 *         schema:
 *           type: string
 *           enum: [priceAsc, priceDesc, nameAsc, nameDesc]
 *           default: ""
 *         description: Sorting option
 *     responses:
 *       200:
 *         description: List of products with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 sort:
 *                   type: string
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Soft delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Restore a soft-deleted product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product restored successfully
 *       404:
 *         description: Product not found
 */

const useProductRoute = (router) => {
  router.get('/pagination', productController.getProductPaginated)
  router.get('/products', productController.getAllProducts);
  router.get('/products/:id', productController.getProductsById);
  router.post('/products', authMiddleware({ allowedRoles: ["admin"] }), productController.createProducts);
  router.put('/products/:id', authMiddleware({ allowedRoles: ["admin"] }), productController.updateProducts);
  router.delete('/products/:id', authMiddleware({ allowedRoles: ["admin"] }), productController.deleteProducts);
  router.patch('/products/:id', authMiddleware({ allowedRoles: ["admin"] }), productController.restoreProducts);
};

export default useProductRoute;
