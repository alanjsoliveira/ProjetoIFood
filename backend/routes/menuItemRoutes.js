// menuItemsRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');
const mongoose = require('mongoose'); // Importa mongoose para usar ObjectId

// Endpoint para adicionar um novo item ao menu (caso precise de um endpoint de criação)
router.post('/', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedMenuItem = await menuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o item do menu', error: error.message });
  }
});

// Endpoint principal para obter todos os itens do menu com filtros opcionais (inclui o filtro "Favoritos")
router.get('/', async (req, res) => {
  try {
    const { sort, tipoComida } = req.query;
    const query = {};
    let sortOptions = {};

    // Filtro por tipo de comida
    if (tipoComida) {
      query.tipoComida = tipoComida;
    }

    // Ordenação para favoritos (itens com melhores avaliações)
    if (sort === 'avaliacaoMedia') {
      sortOptions = { avaliacaoMedia: -1 }; // Ordem decrescente para mostrar os melhores itens
    }

    // Realiza a busca com filtros e ordenação, se aplicável
    const menuItems = await MenuItem.find(query).sort(sortOptions);
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os itens do menu', error: error.message });
  }
});

// Endpoint para obter todos os itens de um restaurante específico com filtros
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const { minPrice, maxPrice, tipoComida, minAvaliacao } = req.query;
    const restaurantId = req.params.restaurantId;

    // Verificação de ID válido
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: 'ID do restaurante inválido' });
    }

    const query = { restaurantId: new mongoose.Types.ObjectId(restaurantId) };

    // Filtro por tipo de comida
    if (tipoComida) {
      query.tipoComida = tipoComida;
    }

    // Filtro por faixa de preço
    if (minPrice || maxPrice) {
      query.preco = {};
      if (minPrice) query.preco.$gte = parseFloat(minPrice);
      if (maxPrice) query.preco.$lte = parseFloat(maxPrice);
    }

    // Filtro por avaliação mínima
    if (minAvaliacao) {
      query.avaliacaoMedia = { $gte: parseFloat(minAvaliacao) };
    }

    // Busca dos itens do menu com base nos filtros aplicados
    const menuItems = await MenuItem.find(query);
    res.json(menuItems);
  } catch (error) {
    console.error("Erro ao buscar os itens do menu:", error);
    res.status(500).json({ message: 'Erro ao buscar os itens do menu', error: error.message });
  }
});

module.exports = router;
