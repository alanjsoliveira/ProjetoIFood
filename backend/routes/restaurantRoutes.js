// routes/restaurantRoutes.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Endpoint para buscar restaurantes com filtros
router.get('/', async (req, res) => {
  try {
    const { sort, random, limit, tipoLanche } = req.query;
    let query = {};

    // Filtrar por tipo de comida
    if (tipoLanche) {
      query.tipoLanche = tipoLanche;
    }

    let restaurants;
    if (sort === 'avaliacaoMedia') {
      // Ordenar por melhores avaliados
      restaurants = await Restaurant.find(query).sort({ avaliacaoMedia: -1 });
    } else if (random === 'true') {
      // Selecionar alguns restaurantes aleatoriamente
      const count = await Restaurant.countDocuments(query);
      const randomIndexes = Array.from({ length: limit || 3 }, () => Math.floor(Math.random() * count));
      restaurants = await Restaurant.find(query)
        .skip(randomIndexes[0]) // Ajuste necessário para obter registros aleatórios
        .limit(parseInt(limit) || 3);
    } else {
      // Padrão: buscar todos os restaurantes sem ordenação específica
      restaurants = await Restaurant.find(query);
    }

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar restaurantes', error });
  }
});

// Endpoint para criar um novo restaurante
router.post('/', async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o restaurante' });
  }
});

// Rota para obter um restaurante específico pelo ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante não encontrado' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar restaurante', error });
  }
});

module.exports = router;
