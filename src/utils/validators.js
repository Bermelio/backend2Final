export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateAge = (age) => {
  return Number.isInteger(age) && age >= 18 && age <= 120;
};

export const validatePrice = (price) => {
  return typeof price === 'number' && price > 0;
};

export const validateStock = (stock) => {
  return Number.isInteger(stock) && stock >= 0;
};

export const validateProductCode = (code) => {
  const codeRegex = /^[A-Za-z0-9]{3,20}$/;
  return codeRegex.test(code);
};

export const validateQuantity = (quantity) => {
  return Number.isInteger(quantity) && quantity > 0;
};

export const validateMongoId = (id) => {
  const mongoIdRegex = /^[a-f\d]{24}$/i;
  return mongoIdRegex.test(id);
};

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  
  return str
    .trim()
    .replace(/[<>]/g, '') 
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
};

export const validateUserData = (userData) => {
  const errors = [];

  if (!userData.first_name || userData.first_name.trim().length === 0) {
    errors.push('El nombre es requerido');
  }

  if (!userData.last_name || userData.last_name.trim().length === 0) {
    errors.push('El apellido es requerido');
  }

  if (!validateEmail(userData.email)) {
    errors.push('El email no es válido');
  }

  if (!validateAge(userData.age)) {
    errors.push('La edad debe ser un número entre 18 y 120');
  }

  if (!validatePassword(userData.password)) {
    errors.push('La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateProductData = (productData) => {
  const errors = [];

  if (!productData.title || productData.title.trim().length === 0) {
    errors.push('El título es requerido');
  }

  if (!productData.description || productData.description.trim().length === 0) {
    errors.push('La descripción es requerida');
  }

  if (!validateProductCode(productData.code)) {
    errors.push('El código debe ser alfanumérico de 3-20 caracteres');
  }

  if (!validatePrice(productData.price)) {
    errors.push('El precio debe ser un número mayor a 0');
  }

  if (!validateStock(productData.stock)) {
    errors.push('El stock debe ser un número entero mayor o igual a 0');
  }

  if (!productData.category || productData.category.trim().length === 0) {
    errors.push('La categoría es requerida');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(price);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const generateRandomCode = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const calculateDiscount = (price, discountPercentage) => {
  if (!validatePrice(price) || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Precio o porcentaje de descuento inválido');
  }
  return price - (price * discountPercentage / 100);
};

export const paginationHelper = (page, limit, totalDocs) => {
  const totalPages = Math.ceil(totalDocs / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const nextPage = hasNextPage ? page + 1 : null;
  const prevPage = hasPrevPage ? page - 1 : null;

  return {
    totalDocs,
    limit,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage
  };
};

export default {
  validateEmail,
  validatePassword,
  validateAge,
  validatePrice,
  validateStock,
  validateProductCode,
  validateQuantity,
  validateMongoId,
  sanitizeString,
  validateUserData,
  validateProductData,
  formatPrice,
  formatDate,
  generateRandomCode,
  calculateDiscount,
  paginationHelper
};

//codigo robado ajja