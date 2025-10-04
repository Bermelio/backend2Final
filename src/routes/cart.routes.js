import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { canAddToCart, canPurchase, isCartOwner } from '../middlewares/authorization.middleware.js';

const router = Router();

// (Administradores)
router.post('/', authenticateJWT, CartController.createCart);
router.get('/:cid', authenticateJWT, isCartOwner, CartController.getCart);

// (Usuarios autenticados y autorizados)
router.post('/:cid/products/:pid', authenticateJWT, canAddToCart, isCartOwner, CartController.addProductToCart);
router.delete('/:cid/products/:pid', authenticateJWT, isCartOwner, CartController.removeProductFromCart);
router.put('/:cid/products/:pid', authenticateJWT, isCartOwner, CartController.updateProductQuantity);

router.put('/:cid', authenticateJWT, isCartOwner, CartController.updateCart);

router.delete('/:cid', authenticateJWT, isCartOwner, CartController.clearCart);

router.post('/:cid/purchase', authenticateJWT, canPurchase, isCartOwner, CartController.purchaseCart);

export default router;