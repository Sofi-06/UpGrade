import prisma from "../prisma.js";

export const createUser = async (data) => {
  return await prisma.usuario.create({
    data: {
      id: data.id,               
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      rol: data.rol
    }
  });
};

export const getAllUsers = async () => {
  return await prisma.usuario.findMany();
};

export const getUserById = async (id) => {
  return prisma.usuario.findUnique({
    where: { id }
  });
};
