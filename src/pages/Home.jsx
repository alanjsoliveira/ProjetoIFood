// home.jsx
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './home.module.css';
import { CartContext } from "../context/CartContext"; // Importa o contexto do carrinho

function Home() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurantFilter, setSelectedRestaurantFilter] = useState('');
  const [selectedItemFilter, setSelectedItemFilter] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  
  const { cartItems } = useContext(CartContext); // Acessa os itens do carrinho
  const usuarioNome = localStorage.getItem("usuarioNome");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("userId");
    navigate('/');
  };

  const handleRestaurantFilterChange = async (filter) => {
    setSelectedRestaurantFilter(filter);
    setIsFilterApplied(true);
    
    if (filter === "") {
      resetFilters(); 
    } else {
      await fetchFilteredRestaurants(filter);
    }
  };

  const handleItemFilterChange = async (filter) => {
    setSelectedItemFilter(filter);
    setIsFilterApplied(true);
    
    if (filter === "") {
      resetFilters(); 
    } else {
      await fetchFilteredMenuItems(filter);
    }
  };

  const resetFilters = () => {
    setRestaurants([]);
    setMenuItems([]);
    setSelectedRestaurantFilter('');
    setSelectedItemFilter('');
    setIsFilterApplied(false);
  };

  const fetchFilteredRestaurants = async (filter) => {
    try {
      let url = 'http://localhost:5000/api/restaurants';
      let params = {};

      if (filter === 'Favoritos') {
        params.sort = 'avaliacaoMedia';
      } else if (filter === 'Próximos a Mim') {
        params.random = true;
        params.limit = 2;
      } else if (filter) {
        params.tipoLanche = filter;
      }

      const response = await axios.get(url, { params });
      setRestaurants(response.data);
      setMenuItems([]);
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error);
    }
  };

  const fetchFilteredMenuItems = async (filter) => {
    try {
      let url = 'http://localhost:5000/api/menuItems';
      let params = {};
  
      // Ajuste o filtro com base no valor do parâmetro selecionado
      if (filter === 'Favoritos') {
        params.sort = 'avaliacaoMedia'; // Ordena pelos itens com melhor avaliação
      } else if (filter) {
        params.tipoComida = filter; // Define o parâmetro do filtro de tipo de comida
      }
  
      const response = await axios.get(url, { params });
      setMenuItems(response.data); // Atualiza o estado com os itens de menu filtrados
      setRestaurants([]); // Limpa a lista de restaurantes ao buscar itens de menu
    } catch (error) {
      console.error('Erro ao buscar itens do menu:', error); // Log de erro para depuração
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.header}>
          <ul>
            {usuarioNome && (
              <li>
                <Link to="/carrinho">Carrinho de Compras</Link>
                {cartItems.length > 0 && (
                  <span className={styles.cartCount}>{cartItems.length}</span> // Exibe a quantidade de itens
                )}
              </li>
            )}
            <li><Link to='/restaurantes'>Restaurantes</Link></li>
            <li onClick={() => setDropdownOpen(!isDropdownOpen)}>
              {usuarioNome ? (
                <>
                  <span>{usuarioNome}</span>
                  {isDropdownOpen && (
                    <div className={styles.dropdown}>
                      <Link to="/minha-conta">Minha Conta</Link><br/>
                      <Link to="/meusenderecos">Meus Endereços</Link>
                      <p onClick={handleLogout}>Sair</p>
                    </div>
                  )}
                </>
              ) : (
                <Link to='/telaLogin'>Entrar</Link>
              )}
            </li>
          </ul>
        </div>
        
        {/* Conteúdo principal */}
        <div className={styles.bg}>
          <div className={styles.left}>
            <img src="/images/dish-left.png" alt="" />
            <img className={styles.svg} src="/images/left.svg" alt="" />
          </div>
          <div className={styles.right}>
            <img className={styles.svg} src="/images/right.svg" alt="" />
            <img src="/images/dish-right.png" alt="" />
          </div>
          <div className={styles.content}>
            <img src="/images/alanfood.png" alt="" className={styles.logo} />
            <h2>Nunca foi tão fácil pedir <span>lanche</span></h2>
            <p>Descubra restaurantes perto de você</p>
            <div className={styles.form}>
              <div className={styles.search}>
                <img src="/images/search.svg" alt="" />
                <input
                  type="text"
                  placeholder="Buscar restaurantes ou item"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button onClick={() => fetchFilteredRestaurants(selectedRestaurantFilter)}>Buscar Restaurantes</button>
            </div>

            {/* Filtros de restaurantes e itens */}
            <div className={styles.filterContainer}>
              <div className={styles.filterWrapper}>
                <label className={styles.filterLabel}>Filtros para Restaurantes:</label>
                <select 
                  onChange={(e) => handleRestaurantFilterChange(e.target.value)} 
                  value={selectedRestaurantFilter} 
                  className={styles.filterSelect}
                >
                  <option value="">Escolha um filtro</option>
                  <option value="Favoritos">Favoritos</option>
                  <option value="Próximos a Mim">Próximos a Mim</option>
                  <option value="Japones">Comida Japonesa</option>
                  <option value="Sanduíches">Sanduíches</option>
                  <option value="Sopa">Sopa</option>
                  <option value="Comidas">Comida Brasileira</option>
                  <option value="Churrasco">Churrasco</option>
                  <option value="Hot Dog">Hot Dog</option>
                </select>
              </div>

              <div className={styles.filterWrapper}>
                <label className={styles.filterLabel}>Filtros para Itens:</label>
                <select 
                  onChange={(e) => handleItemFilterChange(e.target.value)} 
                  value={selectedItemFilter} 
                  className={styles.filterSelect}
                >
                  <option value="">Escolha um filtro</option>
                  <option value="Favoritos">Favoritos</option>
                  <option value="Japones">Comida Japonesa</option>
                  <option value="Sanduíches">Sanduíches</option>
                  <option value="Sopa">Sopa</option>
                  <option value="Comidas">Comida Brasileira</option>
                  <option value="Churrasco">Churrasco</option>
                  <option value="Hot Dog">Hot Dog</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banners de publicidade */}
      {!isFilterApplied && (
        <div className={styles.banner}>
          <img src="/images/landing-banner-1.png" alt="" />
          <img src="/images/landing-banner-2.png" alt="" />
          <img src="/images/landing-banner-3.png" alt="" />
        </div>
      )}

      {/* Resultados de pesquisa */}
      <div className={styles.results}>
        {restaurants.length > 0 ? (
          <div className={styles.grid}>
            {restaurants.map((restaurant) => (
              <div key={restaurant._id} className={styles.restaurantCard}>
                <Link to={`/restaurante/${restaurant._id}`}>
                  <img src={`http://localhost:5000${restaurant.imagemUrl}`} alt={restaurant.nome} />
                  <h3>{restaurant.nome}</h3>
                  <p>{restaurant.tipoLanche}</p>
                  <p>Avaliação: {restaurant.avaliacaoMedia}</p>
                </Link>
              </div>
            ))}
          </div>
        ) : menuItems.length > 0 ? (
          <div className={styles.grid}>
            {menuItems.map((item) => (
              <div key={item._id} className={styles.restaurantCard}>
                <Link to={`/restaurante/${item.restaurantId}`}>
                  <img src={`http://localhost:5000${item.imagemUrl}`} alt={item.nome} />
                  <h3>{item.nome}</h3>
                  <p>{item.descricao}</p>
                  <p>Preço: R$ {item.preco}</p>
                  <p>Avaliação: {item.avaliacaoMedia}</p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum restaurante ou item encontrado.</p>
        )}
      </div>

      {/* Rodapé */}
      <div className={styles.footer}>
        <img src="/images/logofooter.svg" alt="" />
        <span>© Clone do iFood <br />Alan</span>
      </div>
    </div>
  );
}

export default Home;
