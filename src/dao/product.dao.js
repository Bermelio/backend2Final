import Product from './models/product.model.js';

class ProductDAO {
  async create(productData) {
    try {
      const product = await Product.create(productData);
      return product;
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const product = await Product.findById(id).populate('owner');
      return product;
    } catch (error) {
      throw new Error(`Error al buscar producto por ID: ${error.message}`);
    }
  }

  async findByCode(code) {
    try {
      const product = await Product.findOne({ code });
      return product;
    } catch (error) {
      throw new Error(`Error al buscar producto por código: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      const { limit = 10, page = 1, sort = {}, query = {} } = options;

      const products = await Product.paginate(query, {
        limit,
        page,
        sort,
        lean: true
      });

      return products;
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).populate('owner');
      return product;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      return product;
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }

  async updateStock(id, quantity) {
    try {
      const product = await Product.findById(id);
      
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      if (product.stock < quantity) {
        throw new Error('Stock insuficiente');
      }

      product.stock -= quantity;
      await product.save();

      return product;
    } catch (error) {
      throw new Error(`Error al actualizar stock: ${error.message}`);
    }
  }

  async checkStock(id, quantity) {
    try {
      const product = await Product.findById(id);
      
      if (!product) {
        return { available: false, reason: 'Producto no encontrado' };
      }

      if (product.stock < quantity) {
        return { 
          available: false, 
          reason: 'Stock no disponible',
          currentStock: product.stock,
          requested: quantity
        };
      }

      return { available: true, product };
    } catch (error) {
      throw new Error(`Error al verificar stock: ${error.message}`);
    }
  }

  async findByCategory(category) {
    try {
      const products = await Product.find({ category, status: true });
      return products;
    } catch (error) {
      throw new Error(`Error al buscar productos por categoría: ${error.message}`);
    }
  }
}

export default new ProductDAO();