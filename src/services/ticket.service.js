import TicketRepository from '../repositories/ticket.repository.js';
import TicketDTO from '../dto/ticket.dto.js';
import { sendPurchaseConfirmation } from '../config/nodemailer.js';

class TicketService {
  async createTicket(ticketData) {
    try {
      const ticket = await TicketRepository.createTicket(ticketData);
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async getTicketById(id) {
    try {
      const ticket = await TicketRepository.getTicketById(id);
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async getTicketByCode(code) {
    try {
      const ticket = await TicketRepository.getTicketByCode(code);
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async getTicketsByPurchaser(email) {
    try {
      const tickets = await TicketRepository.getTicketsByPurchaser(email);
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async getAllTickets() {
    try {
      const tickets = await TicketRepository.getAllTickets();
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async updateTicket(id, updateData) {
    try {
      const ticket = await TicketRepository.updateTicket(id, updateData);
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async deleteTicket(id) {
    try {
      const ticket = await TicketRepository.deleteTicket(id);
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async processPurchase(cartId, purchaserEmail) {
    try {
      const result = await TicketRepository.processPurchase(cartId, purchaserEmail);

      try {
        await sendPurchaseConfirmation(purchaserEmail, result.ticket);
      } catch (emailError) {
        console.error('Error al enviar email de confirmación:', emailError);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTicketsByDateRange(startDate, endDate) {
    try {
      const tickets = await TicketRepository.getTicketsByDateRange(startDate, endDate);
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async getTotalSales() {
    try {
      const sales = await TicketRepository.getTotalSales();
      return sales;
    } catch (error) {
      throw error;
    }
  }

  async getTicketDTO(id) {
    try {
      const ticket = await TicketRepository.getTicketById(id);
      
      if (!ticket) {
        throw new Error('Ticket no encontrado');
      }

      return new TicketDTO(ticket);
    } catch (error) {
      throw error;
    }
  }
}

export default new TicketService();