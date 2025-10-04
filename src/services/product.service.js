import ProductRepository from '../repositories/product.repository.js';
import ProductDTO from '../dto/product.dto.js';

class ProductService {
  async createProduct(productData) {
    try {
      const product = await ProductRepository.createProduct(productData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductRepository.getProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProductByCode(code) {
    try {
      const product = await ProductRepository.getProductByCode(code);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(options) {
    try {
      const products = await ProductRepository.getProducts(options);
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCategory(category) {
    try {
      const products = await ProductRepository.getProductsByCategory(category);
      return products;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, updateData) {
    try {
      const product = await ProductRepository.updateProduct(id, updateData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const product = await ProductRepository.deleteProduct(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateStock(id, quantity) {
    try {
      const product = await ProductRepository.updateStock(id, quantity);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async checkStock(id, quantity) {
    try {
      const stockCheck = await ProductRepository.checkStock(id, quantity);
      return stockCheck;
    } catch (error) {
      throw error;
    }
  }

  async getProductDTO(id) {
    try {
      const product = await ProductRepository.getProductById(id);
      
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      return new ProductDTO(product);
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();