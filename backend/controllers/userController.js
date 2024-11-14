const User = require('../models/User');

// Função para obter usuário pelo ID
exports.getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error("Erro ao obter usuário:", error);
        res.status(500).json({ msg: 'Erro ao obter usuário' });
    }
};
