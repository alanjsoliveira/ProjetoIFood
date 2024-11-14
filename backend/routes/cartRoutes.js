// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItem'); // Importa o modelo CartItem
const MenuItem = require('../models/menuItem'); // Importa o modelo MenuItem

// Rota para adicionar um item ao carrinho
router.post('/add', async (req, res) => {
  const { userId, restaurantId, itemId, quantity } = req.body;

  try {
    // Busca o item do menu para obter o nome e o preço
    const menuItem = await MenuItem.findById(itemId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Item do menu não encontrado' });
    }

    // Verifica se o item já existe no carrinho do usuário
    let cartItem = await CartItem.findOne({ userId, itemId });

    if (cartItem) {
      // Atualiza a quantidade do item se já estiver no carrinho
      cartItem.quantity += quantity;
    } else {
      // Adiciona um novo item ao carrinho com o nome e o preço do item
      cartItem = new CartItem({
        userId,
        restaurantId,
        itemId,
        itemName: menuItem.nome, // Define o nome do item a partir do campo `nome`
        quantity,
        price: menuItem.preco // Define o preço do item a partir do campo `preco`
      });
    }

    const savedItem = await cartItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Erro ao adicionar item ao carrinho:', error);
    res.status(500).json({ message: 'Erro ao adicionar item ao carrinho', error });
  }
});

// Rota para obter todos os itens do carrinho de um usuário específico
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItems = await CartItem.find({ userId });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter itens do carrinho', error });
  }
});

// Rota para atualizar a quantidade de um item no carrinho
router.put('/:userId/:itemId', async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    const updatedItem = await CartItem.findOneAndUpdate(
      { userId, itemId },
      { $set: { quantity } },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item não encontrado no carrinho' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a quantidade do item no carrinho', error });
  }
});

// Rota para remover um item do carrinho do usuário
router.delete('/remove/:userId/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const removedItem = await CartItem.findOneAndDelete({ userId, itemId });
    if (!removedItem) {
      return res.status(404).json({ message: 'Item não encontrado no carrinho' });
    }
    res.json({ message: 'Item removido do carrinho com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover item do carrinho', error });
  }
});

// Rota para limpar todo o carrinho de um usuário
router.delete('/clear/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await CartItem.deleteMany({ userId });
    res.json({ message: `Carrinho do usuário ${userId} foi limpo com sucesso`, deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao limpar o carrinho', error });
  }
});

module.exports = router;
