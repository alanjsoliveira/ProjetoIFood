const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  tipoComida: { type: String, required: true },
  imagemUrl: { type: String, required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  avaliacaoMedia: { type: Number, default: 0 }, // Média das avaliações
  numeroAvaliacoes: { type: Number, default: 0 } // Número de avaliações
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
