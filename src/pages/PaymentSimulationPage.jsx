import React, { useState } from 'react';
import styles from './PaymentSimulationPage.module.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function PaymentSimulationPage() {
  const { orderId } = useParams();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      await axios.post(`http://localhost:5000/api/orders/simulate-payment/${orderId}`, {
        success: true,
      });
      alert("Pagamento realizado com sucesso!");

      // Redireciona diretamente para a nota fiscal em HTML
      window.location.href = `http://localhost:5000/api/orders/invoice/${orderId}`;
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
      alert("Erro ao processar o pagamento.");
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <h2>Simulação de Pagamento</h2>
      <div className={styles.formGroup}>
        <label>Número do Cartão</label>
        <input 
          type="text" 
          value={cardNumber} 
          onChange={(e) => setCardNumber(e.target.value)} 
        />
      </div>
      <div className={styles.formGroup}>
        <label>Data de Validade</label>
        <input 
          type="text" 
          value={expiryDate} 
          onChange={(e) => setExpiryDate(e.target.value)} 
        />
      </div>
      <div className={styles.formGroup}>
        <label>CVV</label>
        <input 
          type="text" 
          value={cvv} 
          onChange={(e) => setCvv(e.target.value)} 
        />
      </div>
      <button onClick={handlePayment} className={styles.payButton}>
        Confirmar Pagamento
      </button>
    </div>
  );
}

export default PaymentSimulationPage;
