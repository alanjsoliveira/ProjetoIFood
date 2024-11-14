import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './loginCelular.module.css';

function LoginCelular() {
    const [celular, setCelular] = useState("");
    const [mensagem, setMensagem] = useState(""); // Para armazenar mensagens de erro ou sucesso
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/solicitar-codigo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ celular }) // Enviando o celular para o backend
            });

            const data = await response.json();
            setMensagem(data.msg); // Atualiza a mensagem com a resposta do servidor

            // Verifique se `userId` está presente na resposta
            if (data.userId) {
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("usuarioNome", data.usuarioNome);
                navigate('/verificar-codigo'); // Redireciona para a página de verificação de código
            } else {
                setMensagem("Solicitação realizada com sucesso, mas não foi possível recuperar o ID do usuário.");
            }
        } catch (error) {
            console.error("Erro ao solicitar o código:", error);
            setMensagem("Erro ao enviar o código"); // Mensagem de erro para o usuário
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
                            <p className={styles.mensagem}>Informe o número do seu celular para continuar</p>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    id="telefone"
                                    name="telefone"
                                    placeholder="Ex: +55XXXXXXXXXXX" // Indica o formato do número
                                    maxLength="14"
                                    required
                                    value={celular}
                                    onChange={(e) => setCelular(e.target.value)}
                                />
                                <input type="submit" value="Solicitar Código" />
                            </form>
                            {mensagem && <p>{mensagem}</p>} {/* Exibe a mensagem de erro ou sucesso */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginCelular;
