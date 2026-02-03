const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     description: Retorna la información del usuario actualmente autenticado
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Token inválido o no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token no válido"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 */
router.get('/me', verifyToken, userController.profile);

module.exports = router;
