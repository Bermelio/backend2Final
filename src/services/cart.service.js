import CartRepository from '../repositories/cart.repository.js';
import CartDTO from '../dto/cart.dto.js';

class CartService {
  async createCart(userId = null) {
    try {
      const cart = await CartRepository.createCart(userId);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartRepository.getCartById(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCartByUserId(userId) {
    try {
      const cart = await CartRepository.getCartByUserId(userId);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getAllCarts() {
    try {
      const carts = await CartRepository.getAllCarts();
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await CartRepository.addProductToCart(cartId, productId, quantity);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartRepository.removeProductFromCart(cartId, productId);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await CartRepository.updateProductQuantity(cartId, productId, quantity);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateCart(cartId, products) {
    try {
      const cart = await CartRepository.updateCart(cartId, products);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await CartRepository.clearCart(cartId);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(id) {
    try {
      const cart = await CartRepository.deleteCart(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCartTotal(cartId) {
    try {
      const total = await CartRepository.getCartTotal(cartId);
      return total;
    } catch (error) {
      throw error;
    }
  }

  async getCartDTO(id) {
    try {
      const cart = await CartRepository.getCartById(id);
      
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      return new CartDTO(cart);
    } catch (error) {
      throw error;
    }
  }
}

export default new CartService();