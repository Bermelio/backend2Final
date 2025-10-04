import User from './models/user.model.js';

class UserDAO {
  async create(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const user = await User.findById(id).populate('cart');
      return user;
    } catch (error) {
      throw new Error(`Error al buscar usuario por ID: ${error.message}`);
    }
  }

  async findByEmail(email) {
    try {
      const user = await User.findOne({ email }).populate('cart');
      return user;
    } catch (error) {
      throw new Error(`Error al buscar usuario por email: ${error.message}`);
    }
  }

  async findByResetToken(token) {
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
      return user;
    } catch (error) {
      throw new Error(`Error al buscar usuario por token: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const users = await User.find().populate('cart');
      return users;
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).populate('cart');
      return user;
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }

  async updateCart(userId, cartId) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { cart: cartId },
        { new: true }
      ).populate('cart');
      return user;
    } catch (error) {
      throw new Error(`Error al actualizar carrito del usuario: ${error.message}`);
    }
  }
}

export default new UserDAO();