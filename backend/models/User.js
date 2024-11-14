const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definindo o esquema de dados do usuário
const userSchema = new mongoose.Schema({
    primeiroNome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    celular: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    endereco: [
        {
            cep: { type: String, required: true },
            rua: { type: String, required: true },
            cidade: { type: String, required: true },
            estado: { type: String, required: true }
        }
    ],
    loginCodigo: { type: String }, // Código de 6 dígitos para login via celular
    codigoExpiracao: { type: Date } // Data de expiração do código
});

// Middleware para criptografar a senha antes de salvar no banco de dados
userSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

// Método para verificar a senha
userSchema.methods.verifyPassword = async function(senha) {
    return bcrypt.compare(senha, this.senha);
};

// Verifica se o modelo User já existe, para evitar o erro OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
