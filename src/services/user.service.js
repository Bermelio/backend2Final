import UserRepository from '../repositories/user.repository.js';
import UserDTO from '../dto/user.dto.js';

class UserService {
  async createUser(userData) {
    try {
      const user = await UserRepository.createUser(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await UserRepository.getUserById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await UserRepository.getUserByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByResetToken(token) {
    try {
      const user = await UserRepository.getUserByResetToken(token);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await UserRepository.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, updateData) {
    try {
      const user = await UserRepository.updateUser(id, updateData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await UserRepository.deleteUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserDTO(id) {
    try {
      const user = await UserRepository.getUserById(id);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return new UserDTO(user);
    } catch (error) {
      throw error;
    }
  }

  async assignCartToUser(userId, cartId) {
    try {
      const user = await UserRepository.assignCartToUser(userId, cartId);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();