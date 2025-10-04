class TicketDTO {
  constructor(ticket) {
    this.id = ticket._id;
    this.code = ticket.code;
    this.purchase_datetime = ticket.purchase_datetime;
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser;
    this.products = ticket.products.map(item => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        code: item.product.code,
        price: item.price
      },
      quantity: item.quantity,
      subtotal: item.price * item.quantity
    }));
    this.total_items = ticket.products.reduce((sum, item) => sum + item.quantity, 0);
  }
}

class TicketSummaryDTO {
  constructor(ticket) {
    this.id = ticket._id;
    this.code = ticket.code;
    this.purchase_datetime = ticket.purchase_datetime;
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser;
    this.total_items = ticket.products.reduce((sum, item) => sum + item.quantity, 0);
  }
}

class TicketDetailDTO {
  constructor(ticket) {
    this.id = ticket._id;
    this.code = ticket.code;
    this.purchase_datetime = ticket.purchase_datetime;
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser;
    this.products = ticket.products.map(item => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        description: item.product.description,
        code: item.product.code,
        category: item.product.category,
        thumbnails: item.product.thumbnails || []
      },
      quantity: item.quantity,
      unit_price: item.price,
      subtotal: item.price * item.quantity
    }));
    this.total_items = ticket.products.reduce((sum, item) => sum + item.quantity, 0);
    this.subtotal = ticket.amount;
    this.tax = 0; // Puedes calcular impuestos si lo necesitas
    this.total = ticket.amount;
    this.createdAt = ticket.createdAt;
  }
}

export { TicketDTO, TicketSummaryDTO, TicketDetailDTO };
export default TicketDTO;