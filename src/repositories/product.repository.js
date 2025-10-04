import ProductDAO from '../dao/product.dao.js';

class ProductRepository {
  async createProduct(productData) {
    try {
      const existingProduct = await ProductDAO.findByCode(productData.code);
      
      if (existingProduct) {
        throw new Error('Ya existe un producto con ese código');
      }

      return await ProductDAO.create(productData);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await ProductDAO.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getProductByCode(code) {
    try {
      return await ProductDAO.findByCode(code);
    } catch (error) {
      throw error;
    }
  }

  async getProducts(options) {
    try {
      return await ProductDAO.findAll(options);
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCategory(category) {
    try {
      return await ProductDAO.findByCategory(category);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, updateData) {
    try {
      if (updateData.code) {
        const existingProduct = await ProductDAO.findByCode(updateData.code);
        
        if (existingProduct && existingProduct._id.toString() !== id) {
          throw new Error('Ya existe un producto con ese código');
        }
      }

      return await ProductDAO.update(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const product = await ProductDAO.findById(id);
      
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      return await ProductDAO.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateStock(id, quantity) {
    try {
      return await ProductDAO.updateStock(id, quantity);
    } catch (error) {
      throw error;
    }
  }

  async checkStock(id, quantity) {
    try {
      return await ProductDAO.checkStock(id, quantity);
    } catch (error) {
      throw error;
    }
  }

  async restoreStock(id, quantity) {
    try {
      const product = await ProductDAO.findById(id);
      
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      product.stock += quantity;
      return await ProductDAO.update(id, { stock: product.stock });
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductRepository();