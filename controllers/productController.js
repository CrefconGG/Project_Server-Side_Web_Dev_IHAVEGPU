import productService from "../services/productService.js";

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getProductPaginated: async (req, res) => {
         try {
            // Extract query params
            const { search = '', category = '', page = 1, limit = 8, sortOption = '' } = req.query;

            // Build filter
            const filter = {};
            if (search) filter.name = { $regex: search, $options: 'i' };
            if (category) filter.category = category;

            // Get total products count
            const total = await productService.countProducts(filter);

            // Get paginated products
            const products = await productService.getProductsPaginated(filter, Number(page), Number(limit), sortOption);

            // Optional: get all categories
            const categories = await productService.getAllCategories();

            res.status(200).json({
              page: Number(page),
              limit: Number(limit),
              total,
              totalPages: Math.ceil(total / limit),
              sort: sortOption,
              categories,
              data: products
            });
            } catch (err) {
              res.status(500).json({ message: err.message || "Server error" });
            }
    },
    getProductsById: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productService.getProductsByID(id);

            if (!product) {
                return res.status(404).json({ errors: ["Product not found"] });
            }

            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createProducts: async (req, res) => {
        try {
            const { name, category, stock, price, imagesURL } = req.body
            const errors = [];

            if (!name || typeof name !== "string" || name.trim() === "") {
                errors.push("Product name is required");
            }

            if (!category || typeof category !== "string" || category.trim() === "") {
                errors.push("Category is required");
            }

            if (price == null || typeof price !== "number" || price < 0) {
                errors.push("Price must be a positive number");
            }

            if (stock != null && (typeof stock !== "number" || stock < 0)) {
                errors.push("Stock must be a positive number");
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const product = await productService.createProducts(name, category, stock, price, imagesURL)
            res.status(201).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    updateProducts: async (req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            const product = await productService.updateProducts(id, data)
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    deleteProducts: async (req, res) => {
        try {
            const id = req.params.id
            const product = await productService.deleteProducts(id)
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    restoreProducts: async (req, res) => {
        try {
            const id = req.params.id
            const product = await productService.restoreProducts(id)
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

export default productController