const mongoose = require('mongoose');

// Definindo o esquema de endereço
const enderecoSchema = new mongoose.Schema({
    rua: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    cep: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


const Endereco = mongoose.model('Endereco', enderecoSchema);

module.exports = Endereco;
