import productService from "../services/productService.js";

const productViewController = {
    getProductView: async (req, res) => {
        try {
            const { search = '', category = '', page = 1, limit = 8, sort = '' } = req.query;
            const filter = {};
            if (search) filter.name = { $regex: search, $options: 'i' };
            if (category) filter.category = category;

            const total = await productService.countProducts(filter);
            const products = await productService.getProductsPaginated(filter, page, limit, sort);
            const categories = await productService.getAllCategories();

            res.render("listproducts", {
                products,
                user: req.user || null,
                categories,
                search,
                currentCategory: category,
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                sort // ✅ ส่ง sort กลับไปที่ EJS ด้วย
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

export default productViewController;
    