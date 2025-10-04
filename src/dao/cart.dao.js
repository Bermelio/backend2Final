import Cart from './models/cart.model.js';

class CartDAO {
  async create(userId = null) {
    try {
      const cartData = userId ? { user: userId, products: [] } : { products: [] };
      const cart = await Cart.create(cartData);
      return cart;
    } catch (error) {
      throw new Error(`Error al crear carrito: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const cart = await Cart.findById(id)
        .populate('user')
        .populate('products.product');
      return cart;
    } catch (error) {
      throw new Error(`Error al buscar carrito por ID: ${error.message}`);
    }
  }

  async findByUserId(userId) {
    try {
      const cart = await Cart.findOne({ user: userId })
        .populate('products.product');
      return cart;
    } catch (error) {
      throw new Error(`Error al buscar carrito por usuario: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const carts = await Cart.find()
        .populate('user')
        .populate('products.product');
      return carts;
    } catch (error) {
      throw new Error(`Error al obtener todos los carritos: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const cart = await Cart.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).populate('products.product');
      return cart;
    } catch (error) {
      throw new Error(`Error al actualizar carrito: ${error.message}`);
    }
  }

  async addProduct(cartId, productId, quantity = 1) {
    try {
      const cart = await Cart.findById(cartId);
      
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const existingProduct = cart.products.find(
        item => item.product.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return await this.findById(cartId);
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito: ${error.message}`);
    }
  }

  async removeProduct(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      cart.products = cart.products.filter(
        item => item.product.toString() !== productId
      );

      await cart.save();
      return await this.findById(cartId);
    } catch (error) {
      throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const productInCart = cart.products.find(
        item => item.product.toString() === productId
      );

      if (!productInCart) {
        throw new Error('Producto no encontrado en el carrito');
      }

      productInCart.quantity = quantity;
      await cart.save();
      
      return await this.findById(cartId);
    } catch (error) {
      throw new Error(`Error al actualizar cantidad del producto: ${error.message}`);
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      cart.products = [];
      await cart.save();
      
      return await this.findById(cartId);
    } catch (error) {
      throw new Error(`Error al vaciar carrito: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const cart = await Cart.findByIdAndDelete(id);
      return cart;
    } catch (error) {
      throw new Error(`Error al eliminar carrito: ${error.message}`);
    }
  }
}

export default new CartDAO();