import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { authenticateJWT, isNotAuthenticated } from '../middlewares/auth.middleware.js';

const router = Router();

// (sin autenticación)
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/request-password-reset', AuthController.requestPasswordReset);
router.post('/reset-password', AuthController.resetPassword);

// (autenticación)
router.get('/current', authenticateJWT, AuthController.current);
router.post('/logout', authenticateJWT, AuthController.logout);

export default router;