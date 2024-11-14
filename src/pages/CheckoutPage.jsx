// src/pages/CheckoutPage.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutPage.module.css';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

function CheckoutPage() {
  const { cartItems } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(10); // Exemplo de taxa de entrega
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setAddress(response.data.endereco[0] || {}); // Pega o primeiro endereço do usuário ou um objeto vazio
      } catch (error) {
        console.error("Erro ao carregar o endereço:", error);
      }
    };

    fetchAddress();

    // Calculando o total dos itens do carrinho
    const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(itemsTotal + deliveryFee); // Soma o total dos itens com a taxa de entrega
  }, [userId, cartItems, deliveryFee]);

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Por favor, selecione uma forma de pagamento.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/orders/create', {
        userId,
        items: cartItems.map(item => ({
          itemId: item.itemId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount,
        deliveryAddress: address,
        paymentMethod,
        deliveryFee
      });

      alert("Pedido realizado com sucesso!");
      console.log("Detalhes do Pedido:", response.data);

      // Redireciona para a página de simulação de pagamento com o `orderId` como parte da URL
      navigate(`/payment-simulation/${response.data._id}`);
    } catch (error) {
      console.error("Erro ao fazer o pedido:", error);
      alert("Erro ao fazer o pedido.");
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>

      {/* Endereço de Entrega */}
      <div className={styles.section}>
        <h3>Endereço de Entrega</h3>
        {address && address.rua ? (
          <p>{`${address.rua}, ${address.cidade}, ${address.estado} - CEP: ${address.cep}`}</p>
        ) : (
          <p>Carregando endereço...</p>
        )}
      </div>

      {/* Forma de Pagamento */}
      <div className={styles.section}>
        <h3>Forma de Pagamento</h3>
        <select 
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className={styles.select}
        >
          <option value="">Selecione uma forma de pagamento</option>
          <option value="Cartão de Crédito">Cartão de Crédito</option>
          <option value="Cartão de Débito">Cartão de Débito</option>
          <option value="Pix">Pix</option>
          <option value="Dinheiro">Dinheiro</option>
        </select>
      </div>

      {/* Resumo do Pedido */}
      <div className={styles.section}>
        <h3>Resumo do Pedido</h3>
        {cartItems.map((item) => (
          <div key={item.itemId} className={styles.summaryRow}>
            <span>{item.itemName}</span>
            <span>R$ {item.price.toFixed(2)} x {item.quantity}</span>
          </div>
        ))}
        <div className={styles.summaryRow}>
          <span>Taxa de Entrega</span>
          <span>R$ {deliveryFee.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <h4>Total</h4>
          <h4>R$ {totalAmount.toFixed(2)}</h4>
        </div>
      </div>

      {/* Botão para Confirmar Pedido */}
      <button onClick={handlePlaceOrder} className={styles.placeOrderButton}>
        Confirmar Pedido
      </button>
    </div>
  );
}

export default CheckoutPage;
