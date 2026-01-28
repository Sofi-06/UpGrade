import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token no enviado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 Aquí vive la magia
    req.user = decoded; // { id, rol }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
