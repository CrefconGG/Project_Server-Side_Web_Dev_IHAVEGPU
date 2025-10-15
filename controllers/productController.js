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