const User = require('../models/User'); // Certifique-se de que o caminho para o modelo de usuário está correto

// Função para criar um novo endereço
exports.createEndereco = async (req, res) => {
    const { rua, cidade, estado, cep, userId } = req.body;
    console.log("Dados recebidos para criar endereço:", { rua, cidade, estado, cep, userId });

    try {
        // Encontre o usuário pelo ID
        const user = await User.findById(userId);
        
        // Verifique se o usuário existe
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        // Adiciona o novo endereço ao array de endereços do usuário
        user.endereco.push({ rua, cidade, estado, cep });
        
        // Salva o usuário com o endereço atualizado
        await user.save();

        console.log("Novo endereço adicionado:", user.endereco);
        res.status(201).json({ msg: 'Endereço criado com sucesso', endereco: user.endereco });
    } catch (error) {
        console.error("Erro ao criar endereço:", error);
        res.status(500).json({ msg: 'Erro ao criar endereço' });
    }
};






// Função para obter todos os endereços de um usuário específico
exports.getEnderecosByUser = async (req, res) => {
    const { userId } = req.params;
    console.log("UserId recebido:", userId); // Log para verificar o ID recebido

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        console.log("Endereços do usuário:", user.endereco); // Log para verificar os endereços
        res.json(user.endereco);
    } catch (error) {
        console.error("Erro ao obter endereços:", error);
        res.status(500).json({ msg: 'Erro ao obter endereços' });
    }
};








exports.updateEndereco = async (req, res) => {
    const { userId, enderecoId } = req.params;
    const { rua, cidade, estado, cep } = req.body;

    try {
        // Buscar o usuário pelo userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        // Encontrar o endereço específico dentro do array de endereços
        const endereco = user.endereco.id(enderecoId);
        if (!endereco) {
            return res.status(404).json({ msg: 'Endereço não encontrado' });
        }

        // Atualizar os campos do endereço
        endereco.rua = rua || endereco.rua;
        endereco.cidade = cidade || endereco.cidade;
        endereco.estado = estado || endereco.estado;
        endereco.cep = cep || endereco.cep;

        // Salvar o usuário com o endereço atualizado
        await user.save();

        res.json({ msg: 'Endereço atualizado com sucesso', endereco });
    } catch (error) {
        console.error("Erro ao atualizar endereço:", error);
        res.status(500).json({ msg: 'Erro ao atualizar endereço' });
    }
};






// Função para excluir um endereço específico de um usuário
exports.deleteEndereco = async (req, res) => {
    const { userId, enderecoId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        // Filtrar o endereço a ser removido
        user.endereco = user.endereco.filter(e => e._id.toString() !== enderecoId);

        // Salva as alterações no banco de dados
        await user.save();
        res.json({ msg: 'Endereço excluído com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir endereço:", error);
        res.status(500).json({ msg: 'Erro ao excluir endereço' });
    }
};
