import UserDAO from '../dao/user.dao.js';
import CartRepository from './cart.repository.js';

class UserRepository {
  async createUser(userData) {
    try {
      const user = await UserDAO.create(userData);

      if (user.role === 'user') {
        const cart = await CartRepository.createCart(user._id);
        user.cart = cart._id;
        await UserDAO.update(user._id, { cart: cart._id });
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      return await UserDAO.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await UserDAO.findByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async getUserByResetToken(token) {
    try {
      return await UserDAO.findByResetToken(token);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await UserDAO.findAll();
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, updateData) {
    try {
      return await UserDAO.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await UserDAO.findById(id);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (user.cart) {
        await CartRepository.deleteCart(user.cart);
      }

      return await UserDAO.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async assignCartToUser(userId, cartId) {
    try {
      return await UserDAO.updateCart(userId, cartId);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserRepository();