import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { canModifyProduct } from '../middlewares/authorization.middleware.js';

const router = Router();

// (Users)
router.get('/', ProductController.getAllProducts);
router.get('/:pid', ProductController.getProductById);

// (Administradores)
router.post('/', authenticateJWT, canModifyProduct, ProductController.createProduct);
router.put('/:pid', authenticateJWT, canModifyProduct, ProductController.updateProduct);
router.delete('/:pid', authenticateJWT, canModifyProduct, ProductController.deleteProduct);

export default router;