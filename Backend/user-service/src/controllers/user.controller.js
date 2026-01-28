import * as userService from "../services/user.service.js";
import prisma from "../prisma.js";

export const createUser = async (req, res) => {
  const { id, nombre, apellido, email, rol } = req.body;

  try {
    const user = await prisma.usuario.create({
      data: {
        id,
        nombre,
        apellido,
        email,
        rol
      }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error creando usuario" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};