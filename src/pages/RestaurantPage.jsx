import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import styles from './restaurantPage.module.css';
import { CartContext } from '../context/CartContext'; // Importa o contexto do carrinho

function RestaurantPage() {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const { addToCart } = useContext(CartContext); // Usa a função addToCart do contexto

  // Obtém o userId do localStorage para garantir que o usuário esteja autenticado
  const userId = localStorage.getItem("userId");

  // Função para buscar o restaurante específico
  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error("Erro ao buscar restaurante:", error);
    }
  };

  // Função para buscar os itens do menu do restaurante
  const fetchMenuItems = async () => {
    console.log("ID do restaurante:", id);
    try {
      const response = await axios.get(`http://localhost:5000/api/menuItems/restaurant/${id}`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens do menu:", error);
    }
  };

  useEffect(() => {
    fetchRestaurant();
    fetchMenuItems();
  }, [id]);

  // Função para adicionar um item ao carrinho
  const handleAddToCart = (item) => {
    if (userId) {
      addToCart(userId, item); // Chama a função addToCart do contexto, passando o usuário e o item
    } else {
      console.error("Usuário não está autenticado. Faça o login para adicionar itens ao carrinho.");
    }
  };

  return (
    <div>
      {restaurant && (
        <header className={styles.cabecalho}>
          <img src={`http://localhost:5000${restaurant.imagemUrl}`} alt={`Logo ${restaurant.nome}`} />
          <h1>{restaurant.nome}</h1>
          <p>{restaurant.tipoLanche}</p>
          <p>Avaliação: {restaurant.avaliacaoMedia.toFixed(1)} ({restaurant.numeroAvaliacoes} avaliações)</p>
        </header>
      )}
      <div id="menu">
        <main className={styles.grid}>
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div key={item._id} className={styles.container}>
                <img
                  className={styles.imgLanche}
                  src={`http://localhost:5000${item.imagemUrl}`}
                  alt={item.nome}
                />
                <div className={styles.descricaoLanche}>
                  <p><strong>{item.nome}</strong></p>
                  <p>{item.descricao}</p>
                  <p>Preço: R${item.preco.toFixed(2)}</p>
                  <p>Avaliação: {item.avaliacaoMedia.toFixed(1)} ({item.numeroAvaliacoes} avaliações)</p>
                  <button
                    className={styles.addCarrinhoBtn}
                    onClick={() => handleAddToCart(item)}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum item de menu encontrado.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default RestaurantPage;
