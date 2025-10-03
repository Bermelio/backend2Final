import ProductService from '../services/product.service.js';

class ProductController {
  async getAllProducts(req, res) {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
      
      const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
        query: query ? JSON.parse(query) : {}
      };

      const products = await ProductService.getProducts(options);

      res.json({
        status: 'success',
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage
      });
    } catch (error) {
      console.error('Error en getAllProducts:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al obtener productos' 
      });
    }
  }

  async getProductById(req, res) {
    try {
      const { pid } = req.params;
      const product = await ProductService.getProductById(pid);

      if (!product) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Producto no encontrado' 
        });
      }

      res.json({
        status: 'success',
        data: product
      });
    } catch (error) {
      console.error('Error en getProductById:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al obtener producto' 
      });
    }
  }

  async createProduct(req, res) {
    try {
      const productData = req.body;

      // Validaciones básicas
      if (!productData.title || !productData.price || !productData.stock) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'Faltan campos requeridos (title, price, stock)' 
        });
      }

      // Agregar el owner (admin que crea el producto)
      productData.owner = req.user._id;

      const newProduct = await ProductService.createProduct(productData);

      res.status(201).json({
        status: 'success',
        message: 'Producto creado exitosamente',
        data: newProduct
      });
    } catch (error) {
      console.error('Error en createProduct:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al crear producto' 
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { pid } = req.params;
      const updateData = req.body;

      const updatedProduct = await ProductService.updateProduct(pid, updateData);

      if (!updatedProduct) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Producto no encontrado' 
        });
      }

      res.json({
        status: 'success',
        message: 'Producto actualizado exitosamente',
        data: updatedProduct
      });
    } catch (error) {
      console.error('Error en updateProduct:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al actualizar producto' 
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { pid } = req.params;

      const deletedProduct = await ProductService.deleteProduct(pid);

      if (!deletedProduct) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Producto no encontrado' 
        });
      }

      res.json({
        status: 'success',
        message: 'Producto eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error en deleteProduct:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al eliminar producto' 
      });
    }
  }
}

export default new ProductController();