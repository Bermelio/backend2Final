import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/authorization.middleware.js';

const router = Router();

router.get('/my-tickets', authenticateJWT, TicketController.getUserTickets);

router.get('/:tid', authenticateJWT, TicketController.getTicketById);

router.get('/', authenticateJWT, authorizeRole('admin'), TicketController.getAllTickets);

export default router;