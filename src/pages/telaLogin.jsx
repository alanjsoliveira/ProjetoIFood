import React from "react";
import { Link } from "react-router-dom"; 
import styles from './telaLogin.module.css';

function TelaLogin () {
    return (
        <div className={styles.container}>
          <div className={styles.cabecalho}>
            <a href="/index.html">
              <img src="/images/logo-nova-era-.png" alt="" />
            </a>
          </div>
          <div>
            <div className={styles.box}>
              <div className={styles.img}>
                <img src="/images/pessoas-ifood.png" alt="" />
              </div>
              <div className={styles.banner}>
                <h1>Falta pouco para <br />  matar sua fome!</h1>
                <p>Como deseja continuar?</p>
                <ul className={styles.face}>
                  <img src="/images/face.png" alt="" />
                  <li>Continuar com Facebook</li>
                </ul>
                <ul className={styles.google}>
                  <img src="/images/google.png" alt="" />
                  <li>Continuar com Google</li>
                </ul>
                <div className={styles.opcoes}>
                  <ul>
                    <Link to='/loginCelular'>Celular</Link> 
                  </ul>
                  <ul>
                      <Link to='/loginEmail'>E-mail</Link>              
                  </ul>
                  <ul>
                    <Link to='/RegistroUsuario'>Registrar-se</Link>   
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    export default TelaLogin;
