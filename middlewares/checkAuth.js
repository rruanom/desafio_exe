const jwt = require('jsonwebtoken');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const checkAuth = (req, res, next) => {
  const token = req.cookies['access_token'];
  
  if (!token) {
    return res.redirect(302, '/?message=Acceso denegado. Por favor, inicia sesión.');
  }

  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      return res.redirect(302, '/?message=Sesión inválida. Por favor, inicia sesión de nuevo.');
    }
    
    req.user = decoded;
    next();
  });
};

module.exports = checkAuth;