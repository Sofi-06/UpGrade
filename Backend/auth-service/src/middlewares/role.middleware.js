const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        message: 'No tienes permisos'
      });
    }
    next();
  };
};

module.exports = allowRoles;
