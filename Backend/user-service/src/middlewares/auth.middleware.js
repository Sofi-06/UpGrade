import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Intentar leer del header Authorization primero
  let token = req.headers.authorization?.split(" ")[1];

  // Si no está, intentar leer de las cookies
  if (!token && req.headers.cookie) {
    const cookies = req.headers.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        token = value;
        break;
      }
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Token no enviado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Aquí vive la magia
    req.user = decoded; // { id, rol }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
