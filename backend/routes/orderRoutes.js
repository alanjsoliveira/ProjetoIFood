// orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');
const CartItem = require('../models/cartItem');

// Rota para criar um pedido
router.post('/create', async (req, res) => {
    const { userId, paymentMethod, deliveryFee, addressIndex = 0 } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user || !user.endereco || user.endereco.length === 0) {
            return res.status(404).json({ message: 'Endereço do usuário não encontrado' });
        }

        const deliveryAddress = user.endereco[addressIndex];
        if (!deliveryAddress) {
            return res.status(404).json({ message: 'Endereço não encontrado para o índice fornecido' });
        }

        const cartItems = await CartItem.find({ userId });
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'O carrinho está vazio' });
        }

        const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalAmount = itemsTotal + deliveryFee;

        const newOrder = new Order({
            userId,
            deliveryAddress: {
                postalCode: deliveryAddress.cep,
                street: deliveryAddress.rua,
                city: deliveryAddress.cidade,
                state: deliveryAddress.estado || 'Estado Não Definido'
            },
            paymentMethod,
            deliveryFee,
            totalAmount,
            items: cartItems.map(item => ({
                itemId: item.itemId,
                itemName: item.itemName || 'Produto Indisponível',
                quantity: item.quantity,
                price: item.price
            })),
            orderDate: new Date(),
            status: 'Pendente'
        });

        const savedOrder = await newOrder.save();
        await CartItem.deleteMany({ userId });

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ message: 'Erro ao criar pedido', error });
    }
});

// Rota para simular o pagamento do pedido
router.post('/simulate-payment/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { success } = req.body; // true para pagamento bem-sucedido, false para falha

    console.log(`Simulando pagamento para o pedido ID: ${orderId}`);

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: success ? 'Pago' : 'Falha no pagamento' },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.json({
            message: success ? 'Pagamento confirmado com sucesso' : 'Falha no pagamento',
            order: updatedOrder
        });
    } catch (error) {
        console.error('Erro ao simular pagamento:', error);
        res.status(500).json({ message: 'Erro ao simular pagamento', error });
    }
});

// Rota para gerar a nota fiscal em HTML
router.get('/invoice/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId).populate('userId', 'primeiroNome sobrenome email');
        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        const user = order.userId;
        const { deliveryAddress, items, paymentMethod, totalAmount, deliveryFee, status, orderDate } = order;

        // Geração do HTML
        const invoiceHtml = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Nota Fiscal</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .container { width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; }
                    h2 { text-align: center; color: #333; }
                    .section { margin-bottom: 20px; }
                    .section h3 { color: #666; }
                    .items-table { width: 100%; border-collapse: collapse; }
                    .items-table th, .items-table td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                    .total { font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Nota Fiscal</h2>
                    <div class="section">
                        <h3>Dados do Cliente</h3>
                        <p>Nome: ${user.primeiroNome || 'Nome Indisponível'} ${user.sobrenome || ''}</p>
                        <p>Email: ${user.email || 'Email Indisponível'}</p>
                    </div>
                    <div class="section">
                        <h3>Endereço de Entrega</h3>
                        <p>${deliveryAddress.street || 'Rua Indisponível'}, ${deliveryAddress.city || 'Cidade Indisponível'}, ${deliveryAddress.state || 'Estado Indisponível'} - CEP: ${deliveryAddress.postalCode || 'CEP Indisponível'}</p>
                    </div>
                    <div class="section">
                        <h3>Detalhes do Pedido</h3>
                        <table class="items-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantidade</th>
                                    <th>Preço Unitário</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${items.map(item => `
                                    <tr>
                                        <td>${item.itemName || 'Produto Indisponível'}</td>
                                        <td>${item.quantity}</td>
                                        <td>R$ ${item.price.toFixed(2)}</td>
                                        <td>R$ ${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="section">
                        <h3>Resumo</h3>
                        <p>Subtotal: R$ ${(totalAmount - deliveryFee).toFixed(2)}</p>
                        <p>Taxa de Entrega: R$ ${deliveryFee.toFixed(2)}</p>
                        <p class="total">Total: R$ ${totalAmount.toFixed(2)}</p>
                    </div>
                    <div class="section">
                        <h3>Informações do Pedido</h3>
                        <p>Método de Pagamento: ${paymentMethod || 'Método Indisponível'}</p>
                        <p>Status do Pedido: ${status}</p>
                        <p>Data do Pedido: ${orderDate ? new Date(orderDate).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'Data Indisponível'}</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        res.setHeader('Content-Type', 'text/html');
        res.send(invoiceHtml);

    } catch (error) {
        console.error('Erro ao gerar a nota fiscal:', error);
        res.status(500).json({ message: 'Erro ao gerar a nota fiscal', error });
    }
});

module.exports = router;
