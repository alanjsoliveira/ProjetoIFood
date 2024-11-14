import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import styles from './registroUsuario.module.css';

function RegistroUsuario() {
  const [formData, setFormData] = useState({
    primeiroNome: '',
    sobrenome: '',
    email: '',
    celular: '',
    senha: '',
    cpf: '',
    cep: '',
    rua: '',
    cidade: '', // novo campo
    estado: ''  // novo campo
  });

  const navigate = useNavigate(); // Inicializa o useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosParaEnviar = {
      ...formData,
      celular: formData.celular // Usa o celular como digitado
    };

    console.log(dadosParaEnviar); // Verificar se está correto

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      const data = await response.json();
      console.log(data); // Resposta do servidor
      alert(data.msg); // Mensagem do servidor

      if (response.status === 201 && data.userId) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("usuarioNome", formData.primeiroNome);
        navigate('/');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cabecalho}>
        <a href="/index.html">
          <img src="/images/alanfood.png" alt="Logo Alan Food" />
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

              <form onSubmit={handleSubmit}>
                <div className={styles['input-group']}>
                  <div className={styles['input-box']}>
                    <label htmlFor="firstname">Primeiro Nome</label>
                    <input id="firstname" type="text" name="primeiroNome" placeholder="Digite seu primeiro nome" required value={formData.primeiroNome} onChange={handleChange} />
                  </div>

                  <div className={styles['input-box']}>
                    <label htmlFor="lastname">Sobrenome</label>
                    <input id="lastname" type="text" name="sobrenome" placeholder="Digite seu sobrenome" required value={formData.sobrenome} onChange={handleChange} />
                  </div>

                  <div className={styles['input-box']}>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="email" name="email" placeholder="Digite seu e-mail" required value={formData.email} onChange={handleChange} />
                  </div>

                  <div className={styles['input-box']}>
                    <label htmlFor="number">Celular</label>
                    <input id="number" type="tel" name="celular" placeholder="Digite seu celular" maxLength="11" required value={formData.celular} onChange={handleChange} />
                  </div>

                  <div className={styles['input-box']}>
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" name="senha" placeholder="Digite sua senha" required value={formData.senha} onChange={handleChange} />
                  </div>

                  <div className={styles['input-box']}>
                    <label htmlFor="cpf">CPF</label>
                    <input id="cpf" type="text" name="cpf" placeholder="Digite seu CPF" required value={formData.cpf} onChange={handleChange} />
                  </div>

                  <div className={styles['input-box']}>
                    <label htmlFor="cep">CEP</label>
                    <input id="cep" type="text" name="cep" placeholder="Digite seu CEP" required value={formData.cep} onChange={handleChange} />
                  </div>

                  <div className={styles['input-box']}>
                    <label htmlFor="rua">Rua</label>
                    <input id="rua" type="text" name="rua" placeholder="Digite o nome de sua rua" required value={formData.rua} onChange={handleChange} />
                  </div>

                  <div className={styles['input-box']}>
                    <label htmlFor="cidade">Cidade</label>
                    <input id="cidade" type="text" name="cidade" placeholder="Digite o nome da sua cidade" required value={formData.cidade} onChange={handleChange} />
                  </div>

                  <div className={styles['input-box']}>
                    <label htmlFor="estado">Estado</label>
                    <input id="estado" type="text" name="estado" placeholder="Digite o nome do seu estado" required value={formData.estado} onChange={handleChange} />
                  </div>
                </div>

                <div className={styles['continue-button']}>
                  <input type="submit" value="Continuar" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroUsuario;
