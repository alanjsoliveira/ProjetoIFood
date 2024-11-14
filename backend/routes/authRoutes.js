const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para registrar um usuário
router.post('/register', authController.registerUser);

// Rota para login do usuário
router.post('/login', authController.login);

// Rota para solicitar o código
router.post('/solicitar-codigo', authController.solicitarCodigo);

// Rota para verificar o código
router.post('/verificar-codigo', authController.verificarCodigo);

// Rota para obter informações do usuário
router.get('/:id', authController.getUser);

// Rota para atualizar informações do usuário
router.put('/:id', authController.updateUser);

// Rota para excluir um usuário
router.delete('/:id', authController.deleteUser);


module.exports = router;

