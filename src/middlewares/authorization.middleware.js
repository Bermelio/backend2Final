export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'No autorizado. Debes iniciar sesión' 
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: 'error', 
        message: 'No tienes permisos para realizar esta acción',
        requiredRole: allowedRoles,
        currentRole: req.user.role
      });
    }

    next();
  };
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'No autorizado. Debes iniciar sesión' 
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      status: 'error', 
      message: 'Solo los administradores pueden realizar esta acción' 
    });
  }

  next();
};

export const isUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'No autorizado. Debes iniciar sesión' 
    });
  }

  if (req.user.role !== 'user') {
    return res.status(403).json({ 
      status: 'error', 
      message: 'Solo los usuarios pueden realizar esta acción' 
    });
  }

  next();
};

export const canModifyProduct = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'No autorizado. Debes iniciar sesión' 
    });
  }

  if (req.user.role === 'admin') {
      return next();
    }
    
    return res.status(403).json({ 
        status: 'error', 
        message: 'Solo los administradores pueden crear, actualizar o eliminar productos' 
    });
};

export const canAddToCart = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ 
            status: 'error', 
            message: 'No autorizado. Debes iniciar sesión' 
        });
    }
    
    if (req.user.role !== 'user') {
        return res.status(403).json({ 
            status: 'error', 
            message: 'Solo los usuarios pueden agregar productos al carrito' 
        });
    }
    
    next();
};

export const canPurchase = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ 
            status: 'error', 
            message: 'No autorizado. Debes iniciar sesión' 
        });
    }
    
    if (req.user.role !== 'user') {
        return res.status(403).json({ 
            status: 'error', 
            message: 'Solo los usuarios pueden realizar compras' 
        });
    }
    
    next();
};

export const isCartOwner = async (req, res, next) => {
    try {
        const { cid } = req.params;
        
        if (!req.user) {
            return res.status(401).json({ 
                status: 'error', 
                message: 'No autorizado. Debes iniciar sesión' 
            });
        }
        
        if (req.user.role === 'admin') {
            return next();
        }
        
        if (req.user.cart && req.user.cart.toString() === cid) {
            return next();
        }
        
        return res.status(403).json({ 
            status: 'error', 
            message: 'No tienes permiso para acceder a este carrito' 
        });
    } catch (error) {
        return res.status(500).json({ 
            status: 'error', 
            message: 'Error al verificar permisos del carrito' 
        });
    }
};
// Los administradores pueden modificar cualquier producto
// Los administradores pueden acceder a cualquier carrito
// Solo los usuarios pueden realizar compras
// Solo los usuarios pueden agregar productos al carrito