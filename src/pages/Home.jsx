import React from "react";
import { Link } from "react-router-dom";
import styles from './home.module.css';


function Home () {
    return (
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={styles.header}>
              <ul>
                <li><a href="">Comidas</a></li>
                <li><Link to='/restaurantes'>Restaurantes</Link></li>
                <li><Link to='/telaLogin'>Entrar</Link></li>
              </ul>
            </div>
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
                <img src="/images/logo-nova-era-.png" alt="" className={styles.logo} />
                <h2>Nunca foi tão fácil pedir <span>lanche</span></h2>
                <p>Descubra restaurantes perto de você</p>
                <div className={styles.form}>
                  <div className={styles.search}>
                    <img src="/images/search.svg" alt="" />
                    <input type="text" placeholder="Buscar restaurantes ou item" />
                  </div>
                  <button>Buscar</button>
                </div>
                <div className={styles.tags}>
                  <span>#pizza</span>
                  <span>#lanche</span>
                  <span>#comidabrasileira</span>
                  <span>#pizza</span>
                  <span>#lanche</span>
                  <span>#comidabrasileira</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.banner}>
            <img src="/images/landing-banner-1.png" alt="" />
            <img src="/images/landing-banner-2.png" alt="" />
            <img src="/images/landing-banner-3.png" alt="" />
          </div>
          <div className={styles.footer}>
            <img src="/images/logofooter.svg" alt="" />
            <span>© Clone do iFood <br />Grupo Nova Era</span>
          </div>
        </div>
    );
}export default Home;
