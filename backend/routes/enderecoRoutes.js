const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

// Rota para criar um novo endereço
router.post('/', enderecoController.createEndereco);

// Rota para obter todos os endereços de um usuário específico
router.get('/:userId', enderecoController.getEnderecosByUser);

// Rota para atualizar um endereço específico
router.put('/:userId/:enderecoId', enderecoController.updateEndereco);



// Rota para excluir um endereço específico
router.delete('/:userId/:enderecoId', enderecoController.deleteEndereco);


module.exports = router;
