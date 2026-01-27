const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.json({
      message: 'Login exitoso',
      ...result
    });
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

module.exports = {
  register,
  login
};
