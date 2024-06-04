import React from "react";
import { Link } from "react-router-dom";
import styles from './loginCelular.module.css';

function LoginCelular(){
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
                <p className={styles.mensagem}>Informe o número do seu celular para continuar</p>
                <form>
                  <input type="text" id="telefone" name="telefone" placeholder="Informe o seu número de celular" maxLength="14" required />
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



export default LoginCelular;