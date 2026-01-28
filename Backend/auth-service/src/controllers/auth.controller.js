const prisma = require("../prisma.js");
const authService = require("../services/auth.service.js");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const register = async (req, res) => {
  try {
    const { email, password, nombre, apellido, rol } = req.body;

    // 1️⃣ Crear usuario en AUTH (con todos los datos)
    const authUser = await authService.createAuthUser({
      email,
      password,
      nombre,
      apellido,
      rol
    });

    // 2️⃣ Crear usuario en USER-SERVICE (perfil)
    try {
      await axios.post("http://localhost:3002/users", {
        id: authUser.id,
        nombre,
        apellido,
        email,
        rol
      });
    } catch (axiosError) {
      console.warn("USER-SERVICE no disponible", axiosError.message);
      // Continuar aunque el user-service no esté disponible
    }

    // 3️⃣ Generar token
    const token = jwt.sign(
      { id: authUser.id, rol },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(201).json({
      message: "Usuario creado correctamente",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.json({ message: "Login exitoso", ...result });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  register,
  login
};
