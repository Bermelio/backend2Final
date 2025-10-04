class CartDTO {
  constructor(cart) {
    this.id = cart._id;
    this.user = cart.user ? cart.user._id : null;
    this.products = cart.products.map(item => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        stock: item.product.stock,
        thumbnails: item.product.thumbnails || []
      },
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
      available: item.product.stock >= item.quantity
    }));
    this.total_items = cart.products.reduce((sum, item) => sum + item.quantity, 0);
    this.total_amount = cart.products.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
  }
}

class CartSummaryDTO {
  constructor(cart) {
    this.id = cart._id;
    this.total_items = cart.products.reduce((sum, item) => sum + item.quantity, 0);
    this.total_amount = cart.products.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
  }
}

class CartDetailDTO {
  constructor(cart) {
    this.id = cart._id;
    this.user = cart.user ? {
      id: cart.user._id,
      name: `${cart.user.first_name} ${cart.user.last_name}`,
      email: cart.user.email
    } : null;
    this.products = cart.products.map(item => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        description: item.product.description,
        code: item.product.code,
        price: item.product.price,
        stock: item.product.stock,
        category: item.product.category,
        thumbnails: item.product.thumbnails || [],
        available: item.product.stock > 0
      },
      quantity: item.quantity,
      unit_price: item.product.price,
      subtotal: item.product.price * item.quantity,
      available: item.product.stock >= item.quantity,
      stock_message: item.product.stock < item.quantity 
        ? `Solo hay ${item.product.stock} unidades disponibles` 
        : 'Disponible'
    }));
    this.total_items = cart.products.reduce((sum, item) => sum + item.quantity, 0);
    this.subtotal = cart.products.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
    this.tax = 0; // Puedes agregar cálculo de impuestos
    this.total_amount = cart.products.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
    this.all_available = cart.products.every(
      item => item.product.stock >= item.quantity
    );
    this.createdAt = cart.createdAt;
    this.updatedAt = cart.updatedAt;
  }
}

export { CartDTO, CartSummaryDTO, CartDetailDTO };
export default CartDTO;