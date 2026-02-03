import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import setupSwagger from "./swagger.js";

const app = express();

// Configurar CORS para permitir credenciales
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ],
  credentials: true
}));

app.use(express.json());

// Configurar Swagger
setupSwagger(app);

app.use("/users", userRoutes);

export default app;
