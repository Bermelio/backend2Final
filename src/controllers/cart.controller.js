import CartService from '../services/cart.service.js';
import TicketService from '../services/ticket.service.js';

class CartController {
  async getCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await CartService.getCartById(cid);

      if (!cart) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Carrito no encontrado' 
        });
      }

      res.json({
        status: 'success',
        data: cart
      });
    } catch (error) {
      console.error('Error en getCart:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al obtener carrito' 
      });
    }
  }

  async createCart(req, res) {
    try {
      const userId = req.user._id;
      const newCart = await CartService.createCart(userId);

      res.status(201).json({
        status: 'success',
        message: 'Carrito creado exitosamente',
        data: newCart
      });
    } catch (error) {
      console.error('Error en createCart:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al crear carrito' 
      });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity = 1 } = req.body;

      const updatedCart = await CartService.addProductToCart(cid, pid, quantity);

      if (!updatedCart) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Carrito o producto no encontrado' 
        });
      }

      res.json({
        status: 'success',
        message: 'Producto agregado al carrito',
        data: updatedCart
      });
    } catch (error) {
      console.error('Error en addProductToCart:', error);
      res.status(500).json({ 
        status: 'error', 
        message: error.message || 'Error al agregar producto al carrito' 
      });
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const { cid, pid } = req.params;

      const updatedCart = await CartService.removeProductFromCart(cid, pid);

      if (!updatedCart) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Carrito no encontrado' 
        });
      }

      res.json({
        status: 'success',
        message: 'Producto eliminado del carrito',
        data: updatedCart
      });
    } catch (error) {
      console.error('Error en removeProductFromCart:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al eliminar producto del carrito' 
      });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;

      const updatedCart = await CartService.updateCart(cid, products);

      if (!updatedCart) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Carrito no encontrado' 
        });
      }

      res.json({
        status: 'success',
        message: 'Carrito actualizado exitosamente',
        data: updatedCart
      });
    } catch (error) {
      console.error('Error en updateCart:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al actualizar carrito' 
      });
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'La cantidad debe ser mayor a 0' 
        });
      }

      const updatedCart = await CartService.updateProductQuantity(cid, pid, quantity);

      if (!updatedCart) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Carrito o producto no encontrado' 
        });
      }

      res.json({
        status: 'success',
        message: 'Cantidad actualizada exitosamente',
        data: updatedCart
      });
    } catch (error) {
      console.error('Error en updateProductQuantity:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al actualizar cantidad' 
      });
    }
  }

  async clearCart(req, res) {
    try {
      const { cid } = req.params;

      const clearedCart = await CartService.clearCart(cid);

      if (!clearedCart) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Carrito no encontrado' 
        });
      }

      res.json({
        status: 'success',
        message: 'Carrito vaciado exitosamente',
        data: clearedCart
      });
    } catch (error) {
      console.error('Error en clearCart:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al vaciar carrito' 
      });
    }
  }

  async purchaseCart(req, res) {
    try {
      const { cid } = req.params;
      const purchaser = req.user.email;

      const result = await TicketService.processPurchase(cid, purchaser);

      res.json({
        status: 'success',
        message: result.message,
        data: {
          ticket: result.ticket,
          productsNotPurchased: result.productsNotPurchased
        }
      });
    } catch (error) {
      console.error('Error en purchaseCart:', error);
      res.status(500).json({ 
        status: 'error', 
        message: error.message || 'Error al procesar la compra' 
      });
    }
  }
}

export default new CartController();