class ProductDTO {
  constructor(product) {
    this.id = product._id;
    this.title = product.title;
    this.description = product.description;
    this.code = product.code;
    this.price = product.price;
    this.status = product.status;
    this.stock = product.stock;
    this.category = product.category;
    this.thumbnails = product.thumbnails || [];
    this.owner = product.owner ? product.owner._id : null;
    this.available = product.stock > 0;
  }
}

class ProductListDTO {
  constructor(product) {
    this.id = product._id;
    this.title = product.title;
    this.price = product.price;
    this.stock = product.stock;
    this.category = product.category;
    this.thumbnails = product.thumbnails && product.thumbnails.length > 0 
      ? [product.thumbnails[0]] 
      : [];
    this.available = product.stock > 0;
  }
}

class ProductDetailDTO {
  constructor(product) {
    this.id = product._id;
    this.title = product.title;
    this.description = product.description;
    this.code = product.code;
    this.price = product.price;
    this.status = product.status;
    this.stock = product.stock;
    this.category = product.category;
    this.thumbnails = product.thumbnails || [];
    this.owner = product.owner ? {
      id: product.owner._id,
      name: `${product.owner.first_name} ${product.owner.last_name}`
    } : null;
    this.available = product.stock > 0;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}

export { ProductDTO, ProductListDTO, ProductDetailDTO };
export default ProductDTO;