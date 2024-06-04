import React from "react";
import { Link } from "react-router-dom";
import styles from './registroUsuario.module.css';

function RegistroUsuario() {
  return (
    <div className={styles.container}>
      <div className={styles.cabecalho}>
        <a href="/index.html">
          <img src="/images/logo-nova-era-.png" alt="Logo Nova Era" />
        </a>
      </div>
      <div>
        <div className={styles.box}>
          <div className={styles.img}>
            <img src="/images/pessoas-ifood.png" alt="Pessoas iFood" />
          </div>
          <div className={styles.banner}>
            <div className={styles.form}>
              <div className={styles['form-header']}>
                <div className={styles.title}>
                  <h1>Cadastre-se</h1>
                </div>
                <div className={styles['login-button']}>
                  <Link to="/login">Entrar</Link>
                </div>
              </div>

              <div className={styles['input-group']}>
                <div className={styles['input-box']}>
                  <label htmlFor="firstname">Primeiro Nome</label>
                  <input id="firstname" type="text" name="firstname" placeholder="Digite seu primeiro nome" required />
                </div>

                <div className={styles['input-box']}>
                  <label htmlFor="lastname">Sobrenome</label>
                  <input id="lastname" type="text" name="lastname" placeholder="Digite seu sobrenome" required />
                </div>

                <div className={styles['input-box']}>
                  <label htmlFor="email">E-mail</label>
                  <input id="email" type="email" name="email" placeholder="Digite seu e-mail" required />
                </div>

                <div className={styles['input-box']}>
                  <label htmlFor="number">Celular</label>
                  <input id="number" type="tel" name="number" placeholder="(xx) xxxx-xxxx" required />
                </div>

                <div className={styles['input-box']}>
                  <label htmlFor="password">Senha</label>
                  <input id="password" type="password" name="password" placeholder="Digite sua senha" required />
                </div>

                <div className={styles['input-box']}>
                  <label htmlFor="cpf">CPF</label>
                  <input id="cpf" type="text" name="cpf" placeholder="Digite seu CPF" required />
                </div>

                <div className={styles['input-box']}>
                  <label htmlFor="cep">CEP</label>
                  <input id="cep" type="text" name="cep" placeholder="Digite seu CEP" required />
                </div>

                <div className={styles['input-box']}>
                  <label htmlFor="rua">Rua</label>
                  <input id="rua" type="text" name="rua" placeholder="Digite o nome de sua rua" required />
                </div>
              </div>

              <div className={styles['continue-button']}>
                <Link to="/proximo-passo">Continuar</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroUsuario;
