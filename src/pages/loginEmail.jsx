import React from "react";
import { Link } from "react-router-dom";
import styles from './loginEmail.module.css';

function LoginEmail () {
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
                <div className={styles.formulario}>
                  <p className={styles.mensagem}>Informe o seu e-mail para continuar</p>
    
                  <form>
                    <input type="email" id="email" name="email" placeholder="Informe o seu e-mail" required />
                    <input type="password" id="senha" name="senha" required />
                    <input type="submit" value="Entrar" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    export default LoginEmail;
