// controllers/restaurantController.js


// Listar todos os restaurantes

const Restaurant = require('../models/restaurant');

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar restaurantes' });
  }
};


// Avaliar um restaurante
exports.avaliarRestaurante = async (req, res) => {
  const { id } = req.params;
  const { avaliacao } = req.body;

  if (avaliacao < 1 || avaliacao > 5) {
    return res.status(400).json({ message: 'Avaliação deve ser entre 1 e 5 estrelas' });
  }

  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante não encontrado' });
    }

    const novaAvaliacaoMedia = 
      ((restaurant.avaliacaoMedia * restaurant.numeroAvaliacoes) + avaliacao) 
      / (restaurant.numeroAvaliacoes + 1);

    restaurant.avaliacaoMedia = novaAvaliacaoMedia;
    restaurant.numeroAvaliacoes += 1;
    await restaurant.save();

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao avaliar restaurante' });
  }
};


// controllers/restaurantController.js


exports.createRestaurant = async (req, res) => {
  try {
    console.log(req.body); // Verifica o conteúdo do corpo da requisição
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o restaurante' });
  }
};



// Adicione ao menuItemController.js
exports.avaliarMenuItem = async (req, res) => {
  const { id } = req.params; // ID do item do menu
  const { avaliacao } = req.body; // Avaliação enviada pelo usuário

  try {
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Lanche não encontrado' });
    }

    // Atualize a média de avaliações
    const novaMedia =
      (menuItem.avaliacaoMedia * menuItem.numeroAvaliacoes + avaliacao) /
      (menuItem.numeroAvaliacoes + 1);
    
    menuItem.avaliacaoMedia = novaMedia;
    menuItem.numeroAvaliacoes += 1;

    await menuItem.save();
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao avaliar o lanche' });
  }
};
