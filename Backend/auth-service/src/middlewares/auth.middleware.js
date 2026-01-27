const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token requerido'
    });
  }

  // "Bearer TOKEN"
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // guardamos info del usuario para usarla después
    req.user = decoded;

    next(); // pasa a la ruta
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido o expirado'
    });
  }
};

module.exports = verifyToken;
