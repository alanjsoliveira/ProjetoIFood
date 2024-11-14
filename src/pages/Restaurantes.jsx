import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from './restaurantes.module.css';

function Restaurantes() {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants');
      console.log(response.data); // Log para verificar os dados recebidos
      setRestaurants(response.data);
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div>
      <header className={styles.cabecalho}>
        <img src="/images/logo restau.jpg" alt="LOGO RESTAURANTE" />
        <h1>Restaurantes</h1>
      </header>
      <div id="menu">
        <main className={styles.grid}>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <div key={restaurant._id} className={styles.container}>
                {typeof window !== 'undefined' && (
                  <Link to={`/restaurante/${restaurant._id}`} className={styles.btnRestaurante}>
                    <img
                      className={styles.imgRestaurante}
                      src={`http://localhost:5000${restaurant.imagemUrl}`} // URL completa para o backend
                      alt={`logo ${restaurant.nome}`}
                    />
                  </Link>
                )}
                <div className={styles.descricaoRestaurante}>
                  <p><strong>{restaurant.nome}</strong></p>
                  <p>{restaurant.tipoLanche}</p>
                  <p>Avaliação: {restaurant.avaliacaoMedia} ({restaurant.numeroAvaliacoes} avaliações)</p>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum restaurante encontrado.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Restaurantes;
