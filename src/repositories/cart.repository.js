import CartDAO from '../dao/cart.dao.js';
import ProductRepository from './product.repository.js';

class CartRepository {
  async createCart(userId = null) {
    try {
      return await CartDAO.create(userId);
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      return await CartDAO.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getCartByUserId(userId) {
    try {
      return await CartDAO.findByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  async getAllCarts() {
    try {
      return await CartDAO.findAll();
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const stockCheck = await ProductRepository.checkStock(productId, quantity);
      
      if (!stockCheck.available) {
        throw new Error(stockCheck.reason);
      }

      return await CartDAO.addProduct(cartId, productId, quantity);
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      return await CartDAO.removeProduct(cartId, productId);
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const stockCheck = await ProductRepository.checkStock(productId, quantity);
      
      if (!stockCheck.available) {
        throw new Error(stockCheck.reason);
      }

      return await CartDAO.updateProductQuantity(cartId, productId, quantity);
    } catch (error) {
      throw error;
    }
  }

  async updateCart(cartId, products) {
    try {
      for (const item of products) {
        const stockCheck = await ProductRepository.checkStock(
          item.product, 
          item.quantity
        );
        
        if (!stockCheck.available) {
          throw new Error(`${stockCheck.reason} para el producto ${item.product}`);
        }
      }

      return await CartDAO.update(cartId, { products });
    } catch (error) {
      throw error;
    }
  }

  async clearCart(cartId) {
    try {
      return await CartDAO.clearCart(cartId);
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(id) {
    try {
      return await CartDAO.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async getCartTotal(cartId) {
    try {
      const cart = await CartDAO.findById(cartId);
      
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const total = cart.products.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
      );

      return total;
    } catch (error) {
      throw error;
    }
  }
}

export default new CartRepository();