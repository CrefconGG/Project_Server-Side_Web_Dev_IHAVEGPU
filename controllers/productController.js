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
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createProducts: async (req, res) => {
        try{
            const {name, category, stock, price, imagesURL} = req.body
            const product = await productService.createProducts(name, category, stock, price, imagesURL)
            res.status(201).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    },
    updateProducts: async (req, res) => {
        try{
            const id = req.params.id
            const data = req.body
            const product = await productService.updateProducts(id, data)
            res.status(200).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    },
    deleteProducts: async (req, res) => {
        try{
            const id = req.params.id
            const product = await productService.deleteProducts(id)
            res.status(200).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    },
    restoreProducts: async (req, res) => {
        try{
            const id = req.params.id
            const product = await productService.restoreProducts(id)
            res.status(200).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    },
    getProductView: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            res.render("listproducts", { //render products with user object
            products,
            user: req.user || null 
        });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getDetailsView: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productService.getProductsByID(id);
            res.render('showProduct', { product }); // Render EJS view with product details
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

export default productController