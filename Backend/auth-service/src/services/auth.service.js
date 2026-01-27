const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (data) => {
  const { nombre, apellido, email, password, rol } = data;

  // ¿Existe el usuario?
  const existingUser = await prisma.usuario.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear usuario
  const user = await prisma.usuario.create({
    data: {
      nombre,
      apellido,
      email,
      password: hashedPassword,
      rol
    }
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign(
    {
      id: user.id,
      rol: user.rol
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    }
  };
};

module.exports = {
  registerUser,
  loginUser
};

