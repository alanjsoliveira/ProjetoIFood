const User = require('../models/User');
const twilio = require('twilio');
const bcrypt = require('bcryptjs');

// Teste para verificar se as variáveis de ambiente estão sendo lidas corretamente
console.log('TWILIO_SID:', process.env.TWILIO_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);






//registro de um novo usuario



exports.registerUser = async (req, res) => {
    console.log(req.body); // Verifique o corpo da requisição

    const { primeiroNome, sobrenome, email, senha, celular, cpf, rua, cep, cidade, estado } = req.body;

    // Crie o objeto de endereço corretamente com os novos campos
    const endereco = {
        rua,
        cep,
        cidade,
        estado
    };

    try {
        const newUser = new User({
            primeiroNome,
            sobrenome,
            email,
            senha,
            celular,
            cpf,
            endereco // Aqui estamos passando o objeto endereco com cidade e estado
        });

        await newUser.save();
        res.status(201).json({ msg: 'Usuário registrado com sucesso', userId: newUser._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Erro ao registrar usuário', error: error.message });
    }
};







// Código do seu endpoint de login
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email }); // Encontre o usuário pelo email
        if (!user) {
            return res.status(400).json({ msg: 'Usuário não encontrado' });
        }

        // Verifique se a senha está correta
        const senhaValida = await user.verifyPassword(senha);
        if (!senhaValida) {
            return res.status(400).json({ msg: 'Senha inválida' });
        }

        // Se tudo estiver certo, retorne o `userId` e o `usuarioNome`
        res.json({
            userId: user._id,               // Inclua o `userId` na resposta
            usuarioNome: user.primeiroNome,  // Nome do usuário
            msg: 'Login realizado com sucesso'
        });
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        res.status(500).json({ msg: 'Erro ao realizar login' });
    }
};













// Função para solicitar o código
exports.solicitarCodigo = async (req, res) => {
    const { celular } = req.body;

    try {
        console.log("Solicitando código de verificação para:", celular);

        const user = await User.findOne({ celular });
        if (!user) {
            console.log("Usuário não encontrado.");
            return res.status(400).json({ msg: 'Usuário não encontrado' });
        }

        // Gerar código aleatório de 6 dígitos
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        const expiracao = new Date(Date.now() + 5 * 60000); // 5 minutos de validade

        user.loginCodigo = codigo;
        user.codigoExpiracao = expiracao;
        await user.save();

        // Enviar o código via WhatsApp usando Twilio
        await twilioClient.messages.create({
            body: `Seu código de login é: ${codigo}`,
            from: 'whatsapp:+14155238886', // Número WhatsApp do Twilio
            to: `whatsapp:${celular}`
        });

        console.log("Código enviado para o WhatsApp.");

        // Inclua `userId` e `usuarioNome` na resposta
        res.json({
            msg: 'Código enviado para o WhatsApp',
            userId: user._id,               // Inclui o `userId` para o frontend armazenar
            usuarioNome: user.primeiroNome  // Inclui o `usuarioNome` para o frontend armazenar
        });
    } catch (error) {
        console.error("Erro ao enviar o código:", error);
        res.status(500).json({ msg: 'Erro ao enviar o código' });
    }
};





// Função para verificar o código
exports.verificarCodigo = async (req, res) => {
    const { celular, codigo } = req.body;

    try {
        // Buscar usuário pelo celular
        const user = await User.findOne({ celular });
        
        if (!user) {
            console.log("Usuário não encontrado.");
            return res.status(400).json({ msg: 'Usuário não encontrado' });
        }

        // Logs para depuração
        console.log("Código recebido:", codigo);
        console.log("Código armazenado:", user.loginCodigo);

        // Verificar se o código fornecido corresponde ao armazenado
        if (user.loginCodigo !== codigo) {
            console.log("Código inválido.");
            return res.status(400).json({ msg: 'Código inválido' });
        }

        // Se o código for válido, você pode prosseguir com a lógica desejada
        console.log("Código verificado com sucesso.");
        // Aqui você pode adicionar o nome do usuário à resposta
        res.json({ msg: 'Código verificado com sucesso!', usuarioNome: user.primeiroNome }); // Altere conforme a propriedade correta
    } catch (error) {
        console.error("Erro ao verificar o código:", error);
        res.status(500).json({ msg: 'Erro ao verificar o código' });
    }
};








exports.getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }
        
        // Remover informações sensíveis, como a senha
        const { senha, ...userInfo } = user._doc;
        res.json(userInfo);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ msg: 'Erro ao buscar usuário' });
    }
};




exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { primeiroNome, sobrenome, email, celular, rua, cep } = req.body;

    try {
        // Encontra o usuário pelo ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        // Atualiza apenas os campos fornecidos
        user.primeiroNome = primeiroNome || user.primeiroNome;
        user.sobrenome = sobrenome || user.sobrenome;
        user.email = email || user.email;
        user.celular = celular || user.celular;
        
        // Atualiza apenas os campos do endereço fornecidos
        if (rua) user.endereco.rua = rua;
        if (cep) user.endereco.cep = cep;

        // Salva as alterações no banco de dados
        await user.save();
        res.json({ msg: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ msg: 'Erro ao atualizar usuário' });
    }
};


exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id); // Encontra e exclui o usuário
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        res.json({ msg: 'Usuário excluído com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ msg: 'Erro ao excluir usuário' });
    }
};



