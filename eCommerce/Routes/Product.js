import express from'express' ;
const router = express.Router();
import productController from '../controller/Product.js';

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Bonus: Get products by vendor
router.get('/vendor/:vendorId', productController.getProductsByVendor);

export default router;
