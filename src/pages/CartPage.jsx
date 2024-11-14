// src/pages/CartPage.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate
import { CartContext } from '../context/CartContext';
import styles from './CartPage.module.css';

function CartPage() {
  const { cartItems, fetchCartItems, updateCartItemQuantity, removeFromCart } = useContext(CartContext);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); // Cria o hook para navegação

  useEffect(() => {
    if (userId) {
      fetchCartItems(userId); // Carrega os itens do carrinho ao montar o componente
    }
  }, [userId, fetchCartItems]);

  // Função para remover o item do carrinho
  const handleRemove = (itemId) => {
    removeFromCart(userId, itemId); // Passa userId e itemId para remover corretamente
  };

  // Função para alterar a quantidade de itens no carrinho
  const handleQuantityChange = (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      updateCartItemQuantity(userId, item.itemId, newQuantity);
    }
  };

  // Função para redirecionar para a página de checkout
  const handleCheckout = () => {
    navigate('/checkout'); // Redireciona para a página de checkout
  };

  // Calcula o total do carrinho
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.cartTitle}>Meu Carrinho</h1>
      <div className={styles.cartItems}>
        {cartItems.map(item => (
          <div key={item._id} className={styles.cartItem}>
            <div className={styles.itemDetails}>
              <div className={styles.itemName}>{item.itemName}</div>
              <div className={styles.itemPrice}>R${item.price.toFixed(2)}</div>
            </div>
            <div className={styles.quantityControls}>
              <button 
                className={styles.quantityButton}
                onClick={() => handleQuantityChange(item, -1)}
                disabled={item.quantity <= 1}
              >-</button>
              <span className={styles.itemQuantity}>{item.quantity}</span>
              <button 
                className={styles.quantityButton}
                onClick={() => handleQuantityChange(item, 1)}
              >+</button>
            </div>
            <button 
              className={styles.removeButton}
              onClick={() => handleRemove(item.itemId)} // Chama a função handleRemove com itemId
            >Remover</button>
          </div>
        ))}
      </div>
      <div className={styles.cartSummary}>
        <div className={styles.totalPrice}>Total: R${total.toFixed(2)}</div>
        <button 
          className={styles.checkoutButton}
          onClick={handleCheckout} // Adiciona o redirecionamento no botão
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default CartPage;
