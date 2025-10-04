import Ticket from './models/ticket.model.js';

class TicketDAO {
  async create(ticketData) {
    try {
      const ticket = await Ticket.create(ticketData);
      return ticket;
    } catch (error) {
      throw new Error(`Error al crear ticket: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const ticket = await Ticket.findById(id).populate('products.product');
      return ticket;
    } catch (error) {
      throw new Error(`Error al buscar ticket por ID: ${error.message}`);
    }
  }

  async findByCode(code) {
    try {
      const ticket = await Ticket.findOne({ code }).populate('products.product');
      return ticket;
    } catch (error) {
      throw new Error(`Error al buscar ticket por código: ${error.message}`);
    }
  }

  async findByPurchaser(email) {
    try {
      const tickets = await Ticket.find({ purchaser: email })
        .populate('products.product')
        .sort({ purchase_datetime: -1 });
      return tickets;
    } catch (error) {
      throw new Error(`Error al buscar tickets por comprador: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const tickets = await Ticket.find()
        .populate('products.product')
        .sort({ purchase_datetime: -1 });
      return tickets;
    } catch (error) {
      throw new Error(`Error al obtener todos los tickets: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).populate('products.product');
      return ticket;
    } catch (error) {
      throw new Error(`Error al actualizar ticket: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const ticket = await Ticket.findByIdAndDelete(id);
      return ticket;
    } catch (error) {
      throw new Error(`Error al eliminar ticket: ${error.message}`);
    }
  }

  async findByDateRange(startDate, endDate) {
    try {
      const tickets = await Ticket.find({
        purchase_datetime: {
          $gte: startDate,
          $lte: endDate
        }
      }).populate('products.product');
      return tickets;
    } catch (error) {
      throw new Error(`Error al buscar tickets por rango de fechas: ${error.message}`);
    }
  }

  async getTotalSales() {
    try {
      const result = await Ticket.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
            totalTickets: { $sum: 1 }
          }
        }
      ]);
      return result[0] || { totalAmount: 0, totalTickets: 0 };
    } catch (error) {
      throw new Error(`Error al calcular ventas totales: ${error.message}`);
    }
  }
}

export default new TicketDAO();