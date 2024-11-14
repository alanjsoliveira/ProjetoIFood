// src/context/CartContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar um item ao carrinho
  const addToCart = async (userId, item) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        userId,
        restaurantId: item.restaurantId,
        itemId: item._id,
        itemName: item.nome,
        quantity: 1,
        price: item.preco,
      });
      setCartItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
    }
  };

  // Função para remover um item do carrinho
  const removeFromCart = async (userId, itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${userId}/${itemId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.itemId !== itemId));
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
    }
  };

  // Função para atualizar a quantidade de um item no carrinho
  const updateCartItemQuantity = async (userId, itemId, quantity) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/cart/${userId}/${itemId}`, { quantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.itemId === itemId ? { ...item, quantity: response.data.quantity } : item
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do item:', error);
    }
  };

  // Função para obter todos os itens do carrinho do usuário
  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Erro ao buscar itens do carrinho:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
