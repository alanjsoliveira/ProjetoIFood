const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipoLanche: { type: String, required: true },
  endereco: { type: String, required: true },
  horarioFuncionamento: {
    abertura: { type: String },
    fechamento: { type: String }
  },
  avaliacaoMedia: { type: Number },
  numeroAvaliacoes: { type: Number },
  imagemUrl: { type: String } // Certifique-se de que o campo está aqui
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
