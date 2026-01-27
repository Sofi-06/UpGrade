const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

router.get('/me', verifyToken, userController.profile);

module.exports = router;
