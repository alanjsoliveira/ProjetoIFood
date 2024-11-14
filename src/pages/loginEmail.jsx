import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Adicione useNavigate
import styles from './loginEmail.module.css';
import axios from 'axios';

function LoginEmail() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate(); // Obtém a função navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        senha,
      });

      console.log("Resposta do login:", response.data);

      // Verifique se o `userId` e `usuarioNome` estão na resposta
      if (response.data.userId && response.data.usuarioNome) {
        console.log("Armazenando userId e usuarioNome:", response.data.userId, response.data.usuarioNome);
        // Armazene o `userId` e `usuarioNome` no localStorage
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("usuarioNome", response.data.usuarioNome);

        // Redirecione para a página inicial
        navigate('/');
      } else {
        setMensagem("Login realizado com sucesso, mas não foi possível recuperar o ID do usuário.");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao realizar login");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.cabecalho}>
        <a href="/index.html">
          <img src="/images/alanfood.png" alt="" />
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
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Informe o seu e-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <input type="submit" value="Entrar" />
              </form>
              {mensagem && <p>{mensagem}</p>} {/* Mostra a mensagem de feedback */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginEmail;
