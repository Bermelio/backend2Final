import TicketService from '../services/ticket.service.js';

class TicketController {
  async getTicketById(req, res) {
    try {
      const { tid } = req.params;
      const ticket = await TicketService.getTicketById(tid);

      if (!ticket) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Ticket no encontrado' 
        });
      }

      res.json({
        status: 'success',
        data: ticket
      });
    } catch (error) {
      console.error('Error en getTicketById:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al obtener ticket' 
      });
    }
  }

  async getUserTickets(req, res) {
    try {
      const userEmail = req.user.email;
      const tickets = await TicketService.getTicketsByPurchaser(userEmail);

      res.json({
        status: 'success',
        data: tickets
      });
    } catch (error) {
      console.error('Error en getUserTickets:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al obtener tickets del usuario' 
      });
    }
  }

  async getAllTickets(req, res) {
    try {
      const tickets = await TicketService.getAllTickets();

      res.json({
        status: 'success',
        data: tickets
      });
    } catch (error) {
      console.error('Error en getAllTickets:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al obtener todos los tickets' 
      });
    }
  }
}

export default new TicketController();