import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Certifique-se de importar useNavigate
import styles from './VerificarCodigo.module.css';

function VerificarCodigo() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate(); // Obtém a função navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const celular = localStorage.getItem("celular"); // Recuperando o número do celular armazenado
    try {
      const response = await fetch("http://localhost:5000/api/auth/verificar-codigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ celular, codigo }) // Passando o celular e o código
      });

      const data = await response.json();
      alert(data.msg); // Exibir a mensagem de sucesso ou erro

      if (response.ok) {

        localStorage.setItem("usuarioNome", data.usuarioNome);
        // Redirecionar para a página principal ou onde você desejar
        navigate('/'); // Redireciona após a verificação bem-sucedida
      }

      if (response.ok) {
        localStorage.setItem("usuarioNome", data.usuarioNome);
        console.log("Nome do usuário armazenado:", data.usuarioNome); // Verificação
        navigate('/'); 
      }
      
    } catch (error) {
      console.error("Erro ao verificar o código:", error);
    }
  };

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
            <div className={styles.formulario}>
              <p className={styles.mensagem}>Insira o código que você recebeu</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  placeholder="Digite o código de 6 dígitos"
                  maxLength="6"
                  required
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
                <input type="submit" value="Verificar Código" />
              </form>
              <p>
                <Link to="/loginCelular">Voltar</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificarCodigo;
