import TicketDAO from '../dao/ticket.dao.js';
import CartRepository from './cart.repository.js';
import ProductRepository from './product.repository.js';

class TicketRepository {
  async createTicket(ticketData) {
    try {
      return await TicketDAO.create(ticketData);
    } catch (error) {
      throw error;
    }
  }

  async getTicketById(id) {
    try {
      return await TicketDAO.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getTicketByCode(code) {
    try {
      return await TicketDAO.findByCode(code);
    } catch (error) {
      throw error;
    }
  }

  async getTicketsByPurchaser(email) {
    try {
      return await TicketDAO.findByPurchaser(email);
    } catch (error) {
      throw error;
    }
  }

  async getAllTickets() {
    try {
      return await TicketDAO.findAll();
    } catch (error) {
      throw error;
    }
  }

  async updateTicket(id, updateData) {
    try {
      return await TicketDAO.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteTicket(id) {
    try {
      return await TicketDAO.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async processPurchase(cartId, purchaserEmail) {
    try {
      const cart = await CartRepository.getCartById(cartId);
      
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      if (cart.products.length === 0) {
        throw new Error('El carrito está vacío');
      }

      const productsToPurchase = [];
      const productsNotPurchased = [];
      let totalAmount = 0;

      for (const item of cart.products) {
        const stockCheck = await ProductRepository.checkStock(
          item.product._id,
          item.quantity
        );

        if (stockCheck.available) {
          productsToPurchase.push({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
          });
          totalAmount += item.product.price * item.quantity;
        } else {
          productsNotPurchased.push({
            product: item.product._id,
            title: item.product.title,
            quantity: item.quantity,
            reason: stockCheck.reason
          });
        }
      }

      if (productsToPurchase.length === 0) {
        throw new Error('No hay productos disponibles para comprar');
      }

      const ticketData = {
        amount: totalAmount,
        purchaser: purchaserEmail,
        products: productsToPurchase
      };

      const ticket = await TicketDAO.create(ticketData);

      for (const item of productsToPurchase) {
        await ProductRepository.updateStock(item.product, item.quantity);
      }

      const remainingProducts = cart.products.filter(item =>
        productsNotPurchased.some(p => p.product.toString() === item.product._id.toString())
      );

      await CartRepository.updateCart(cartId, remainingProducts);

      return {
        ticket,
        productsNotPurchased,
        message: productsNotPurchased.length > 0
          ? 'Compra procesada parcialmente. Algunos productos no tenían stock suficiente.'
          : 'Compra procesada exitosamente'
      };
    } catch (error) {
      throw error;
    }
  }

  async getTicketsByDateRange(startDate, endDate) {
    try {
      return await TicketDAO.findByDateRange(startDate, endDate);
    } catch (error) {
      throw error;
    }
  }

  async getTotalSales() {
    try {
      return await TicketDAO.getTotalSales();
    } catch (error) {
      throw error;
    }
  }
}

export default new TicketRepository();