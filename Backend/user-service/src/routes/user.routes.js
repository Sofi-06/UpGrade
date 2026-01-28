import { Router } from "express";
import { createUser, getUsers, getMe } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

// Crear usuario (viene del auth-service)
router.post("/", createUser);

// Usuario logueado
router.get("/me", authMiddleware, getMe);

// SOLO SUPER_ADMIN y DIRECTIVO pueden ver todos
router.get(
  "/",
  authMiddleware,
  allowRoles("SUPER_ADMIN", "DIRECTIVO"),
  getUsers
);

export default router;
