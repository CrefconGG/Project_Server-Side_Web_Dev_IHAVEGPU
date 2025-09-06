import productController from "../controllers/productController";

const useProductRoute = (router) => {
    router.get('/products',productController.getAllProducts);
    router.get('/products/:id',productController.getProductsById);
    router.post('/products',productController.createProducts);
    router.put('/products/:id',productController.updateProducts);
    router.delete('/products/:id',productController.deleteProducts);
    router.patch('/products/:id',productController.restoreProducts);
}

export default useProductRoute;