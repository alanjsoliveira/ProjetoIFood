const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para obter o usuário pelo ID
router.get('/:userId', userController.getUserById);

module.exports = router;

