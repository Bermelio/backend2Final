import passport from 'passport';

export const authenticateJWT = (req, res, next) => {
  passport.authenticate('current', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ 
        status: 'error', 
        message: 'Error en la autenticación' 
      });
    }

    if (!user) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'No autorizado. Token inválido o expirado' 
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export const isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  
  return res.status(401).json({ 
    status: 'error', 
    message: 'Debes iniciar sesión para acceder a este recurso' 
  });
};

export const isNotAuthenticated = (req, res, next) => {
  if (!req.user) {
    return next();
  }
  
  return res.status(400).json({ 
    status: 'error', 
    message: 'Ya has iniciado sesión' 
  });
};