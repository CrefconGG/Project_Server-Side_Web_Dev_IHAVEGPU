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
    }
}

export default productService