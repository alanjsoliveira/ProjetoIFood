import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import styles from './MinhaConta.module.css';

function MinhaConta() {
    const [user, setUser] = useState({
        primeiroNome: '',
        sobrenome: '',
        email: '',
        celular: '',
        rua: '',
        cep: ''
    });
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) {
            console.error("Erro: userId não encontrado no localStorage");
            return;
        }
    
        const fetchUser = async () => {
            try {
                const response = await api.get(`/${userId}`);
                console.log("Dados do usuário:", response.data); // Verifica os dados retornados
                setUser(response.data);
            } catch (error) {
                console.error("Erro ao carregar os dados do usuário:", error);
            }
        };
        fetchUser();
    }, [userId]); // Apenas executa quando userId mudar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value || "" }); // Garante que o valor seja sempre uma string
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/${userId}`, user);
            alert("Conta atualizada com sucesso!");
    
            // Atualiza o nome do usuário no localStorage
            localStorage.setItem("usuarioNome", user.primeiroNome);
    
            // Adicione um pequeno atraso antes de redirecionar
            setTimeout(() => {
                navigate('/');
            }, 100); // 100ms de atraso
        } catch (error) {
            console.error("Erro ao atualizar conta:", error);
        }
    };
    
    const handleDelete = async () => {
        if (window.confirm("Tem certeza de que deseja excluir sua conta?")) {
            try {
                await api.delete(`/${userId}`);
                localStorage.removeItem("usuarioNome");
                localStorage.removeItem("userId");
                alert("Conta excluída com sucesso!");
    
                // Adicione um pequeno atraso antes de redirecionar
                setTimeout(() => {
                    navigate('/');
                }, 100); // 100ms de atraso
            } catch (error) {
                console.error("Erro ao excluir conta:", error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Minha Conta</h2>
            </div>
            <form className={styles.form} onSubmit={handleUpdate}>
                <label>Nome cadastrado: {user.primeiroNome}</label>
                <input
                    name="primeiroNome"
                    placeholder="Novo nome"
                    value={user.primeiroNome || ""}
                    onChange={handleChange}
                />

                <label>Sobrenome cadastrado: {user.sobrenome}</label>
                <input
                    name="sobrenome"
                    placeholder="Novo sobrenome"
                    value={user.sobrenome || ""}
                    onChange={handleChange}
                />

                <label>Email cadastrado: {user.email}</label>
                <input
                    name="email"
                    placeholder="Novo email"
                    value={user.email || ""}
                    onChange={handleChange}
                />

                <label>Celular cadastrado: {user.celular}</label>
                <input
                    name="celular"
                    placeholder="Novo celular"
                    value={user.celular || ""}
                    onChange={handleChange}
                />

                <label>Rua cadastrada: {user.rua}</label>
                <input
                    name="rua"
                    placeholder="Nova rua"
                    value={user.rua || ""}
                    onChange={handleChange}
                />

                <label>CEP cadastrado: {user.cep}</label>
                <input
                    name="cep"
                    placeholder="Novo CEP"
                    value={user.cep || ""}
                    onChange={handleChange}
                />

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.updateButton}>Atualizar Conta</button>
                    <button type="button" onClick={handleDelete} className={styles.deleteButton}>Excluir Conta</button>
                </div>
            </form>
            <div className={styles.footer}>
                <span>Gerencie as informações da sua conta</span>
            </div>
        </div>
    );
}

export default MinhaConta;
