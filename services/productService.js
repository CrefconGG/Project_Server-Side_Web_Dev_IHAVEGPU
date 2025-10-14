import Product from "../models/Product.js"

const productService = {
    getAllProducts: async () => {
        return await Product.find({ isDeleted: false})
    },
    getProductsByID: async (id) => {
        return await Product.findOne({_id: id, isDeleted: false})
    },
    createProducts: async (name, category, stock, price, imagesURL) => {
        return await Product.create({name, category, stock, price, imagesURL})
    },
    updateProducts: async (id, data) => {
        return await Product.findOneAndUpdate({_id: id, isDeleted: false}, data,{new: true})
    },
    deleteProducts: async (id) => {
        return await Product.findOneAndUpdate({_id: id, isDeleted: false}, {isDeleted: true}, {new: true})
    },
    restoreProducts: async (id) => {
        return await Product.findOneAndUpdate({_id: id, isDeleted: true}, {isDeleted: false}, {new: true})
    },
    getProductsPaginated: async (filter, page, limit, sortOption) => {
        let sort = {};
        if (sortOption === 'priceAsc') sort.price = 1;
        else if (sortOption === 'priceDesc') sort.price = -1;

        return Product.find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));
    },
    countProducts: async (filter) => {
        return Product.countDocuments(filter);
    },
    getAllCategories: async () => {
        return Product.distinct('category');
    },
}

export default productService