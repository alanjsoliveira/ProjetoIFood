import React from "react";
import { Link } from "react-router-dom"; 

import styles from './restaurantes.module.css';


function Restaurantes() {
    return (
        <div>
          <header className={styles.cabecalho}>
            <img src="/images/logo restau.jpg" alt="LOGO RESTAURANTE" />
            <h1>Restaurantes</h1>
          </header>
          <div id="menu">
            <main className={styles.grid}>
              <div className={styles.container}>
                {typeof window !== 'undefined' && (
                  <Link to="/restaurante/mcdonalds" className={styles.btnRestaurante}>
                    <img className={styles.imgRestaurante} src="/images/logo-mc.jpg" alt="logo mc" />
                  </Link>
                )}
                <div className={styles.descricaoRestaurante}>
                  <p><strong>Mc Donalds</strong></p>
                  <p>Deliciosos lanches para você e sua família</p>
                </div>
              </div>
              <div className={styles.container}>
                {typeof window !== 'undefined' && (
                  <Link to="/restaurante/burger-king" className={styles.btnRestaurante}>
                    <img className={styles.imgRestaurante} src="/images/novo-logo-burger-king-2021.png" alt="logo mc" />
                  </Link>
                )}
                <div className={styles.descricaoRestaurante}>
                  <p><strong>Burguer King</strong></p>
                  <p>Promoção 2 por R$25,00</p>
                </div>
              </div>
              <div className={styles.container}>
                {typeof window !== 'undefined' && (
                  <Link to="/restaurante/giraffas" className={styles.btnRestaurante}>
                    <img className={styles.imgRestaurante} src="/images/logo giraffas.png" alt="logo mc" />
                  </Link>
                )}
                <div className={styles.descricaoRestaurante}>
                  <p><strong>Giraffas</strong></p>
                  <p>Almoço e Jantar de Felicidade!</p>
                </div>
              </div>
              <div className={styles.container}>
                {typeof window !== 'undefined' && (
                  <Link to="/restaurante/madero" className={styles.btnRestaurante}>
                    <img className={styles.imgRestaurante} src="/images/madero.png" alt="logo mc" />
                  </Link>
                )}
                <div className={styles.descricaoRestaurante}>
                  <p><strong>Madero</strong></p>
                  <p>Um pouco de tudo para sua família!</p>
                </div>
              </div>
              <div className={styles.container}>
                {typeof window !== 'undefined' && (
                  <Link to="/restaurante/outback" className={styles.btnRestaurante}>
                    <img className={styles.imgRestaurante} src="/images/ouback.png" alt="logo mc" />
                  </Link>
                )}
                <div className={styles.descricaoRestaurante}>
                  <p><strong>Outback</strong></p>
                  <p>Jantares inesquecíveis!!</p>
                </div>
              </div>
              <div className={styles.container}>
                {typeof window !== 'undefined' && (
                  <Link to="/restaurante/paris-6" className={styles.btnRestaurante}>
                    <img className={styles.imgRestaurante} src="/images/paris.png" alt="logo mc" />
                  </Link>
                )}
                <div className={styles.descricaoRestaurante}>
                  <p><strong>Paris 6</strong></p>
                  <p>O restaurante dos famosos</p>
                </div>
              </div>
              <div className={styles.container}>
                {typeof window !== 'undefined' && (
                  <Link to="/restaurante/ragazzo" className={styles.btnRestaurante}>
                    <img className={styles.imgRestaurante} src="/images/ragazzo.png" alt="logo mc" />
                  </Link>
                )}
                <div className={styles.descricaoRestaurante}>
                  <p><strong>Ragazzo</strong></p>
                  <p>15 coxinhas por 1 real!</p>
                </div>
              </div>
              <div className={styles.container}>
                {typeof window !== 'undefined' && (
                  <Link to="/restaurante/habibs" className={styles.btnRestaurante}>
                    <img className={styles.imgRestaurante} src="/images/habibs.png" alt="logo mc" />
                  </Link>
                )}
                <div className={styles.descricaoRestaurante}>
                  <p><strong>Habib's</strong></p>
                  <p>Promoção 50 esfihas por R$20,00</p>
                </div>
              </div>
              <div className={styles.container}>
                {typeof window !== 'undefined' && (
                  <Link to="/restaurante/subway" className={styles.btnRestaurante}>
                    <img className={styles.imgRestaurante} src="/images/subway-logo-5E2F09E018-seeklogo.com.png" alt="logo mc" />
                  </Link>
                )}
                <div className={styles.descricaoRestaurante}>
                  <p><strong>Subway</strong></p>
                  <p>30 cm de sanduíche é só aqui</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      );
    }

export default Restaurantes;
