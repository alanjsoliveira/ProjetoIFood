import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './meusenderecos.module.css';

function MeusEnderecos() {
  const [enderecos, setEnderecos] = useState([]);
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const userId = localStorage.getItem("userId");

  // Estados para edição
  const [editIndex, setEditIndex] = useState(null); // Índice do endereço em edição
  const [editRua, setEditRua] = useState("");
  const [editCidade, setEditCidade] = useState("");
  const [editEstado, setEditEstado] = useState("");
  const [editCep, setEditCep] = useState("");

  // Função para buscar os endereços do usuário
  const fetchEnderecos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/enderecos/${userId}`);
      console.log("Endereços recebidos no fetchEnderecos:", response.data);
      if (Array.isArray(response.data)) {
        setEnderecos(response.data);
      } else {
        console.error("Estrutura de dados inesperada:", response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar endereços:", error);
    }
  };

  useEffect(() => {
    fetchEnderecos();
  }, [userId]);

  // Função para adicionar um novo endereço
  const handleAddEndereco = async () => {
    console.log("Iniciando adição de endereço...");
    const novoEndereco = {
      rua,
      cidade,
      estado,
      cep,
      userId,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/enderecos", novoEndereco);
      console.log("Resposta ao adicionar endereço:", response.data);

      // Atualizar a lista de endereços com o novo endereço adicionado
      setEnderecos([...enderecos, response.data.endereco]);

      // Limpar os campos
      setRua("");
      setCidade("");
      setEstado("");
      setCep("");
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
    }
  };

  // Função para iniciar a edição de um endereço
  const startEditing = (index) => {
    const endereco = enderecos[index];
    setEditIndex(index);
    setEditRua(endereco.rua);
    setEditCidade(endereco.cidade);
    setEditEstado(endereco.estado);
    setEditCep(endereco.cep);
  };

  // Função para salvar alterações do endereço editado
  const saveEdit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/enderecos/${userId}/${id}`, {
        rua: editRua,
        cidade: editCidade,
        estado: editEstado,
        cep: editCep,
      });

      // Atualizar o estado de endereços com o novo valor
      const updatedEnderecos = [...enderecos];
      updatedEnderecos[editIndex] = response.data.endereco;
      setEnderecos(updatedEnderecos);

      // Limpar o modo de edição
      setEditIndex(null);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  // Função para excluir um endereço
  const handleDelete = async (enderecoId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/enderecos/${userId}/${enderecoId}`);
        console.log("Resposta ao excluir endereço:", response.data);

        // Atualiza a lista de endereços no frontend
        setEnderecos(enderecos.filter(e => e._id !== enderecoId));
    } catch (error) {
        console.error("Erro ao excluir endereço:", error);
    }
};


  return (
    <div className={styles.container}>
      <h2>Meus Endereços</h2>
      {enderecos.length > 0 ? (
        enderecos.map((endereco, index) => (
          <div key={index} className={styles.endereco}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editRua}
                  onChange={(e) => setEditRua(e.target.value)}
                  placeholder="Rua"
                />
                <input
                  type="text"
                  value={editCidade}
                  onChange={(e) => setEditCidade(e.target.value)}
                  placeholder="Cidade"
                />
                <input
                  type="text"
                  value={editEstado}
                  onChange={(e) => setEditEstado(e.target.value)}
                  placeholder="Estado"
                />
                <input
                  type="text"
                  value={editCep}
                  onChange={(e) => setEditCep(e.target.value)}
                  placeholder="CEP"
                />
                <button onClick={() => saveEdit(endereco._id)}>Salvar</button>
                <button onClick={() => setEditIndex(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <p><strong>Rua:</strong> {endereco.rua}</p>
                <p><strong>Cidade:</strong> {endereco.cidade}</p>
                <p><strong>Estado:</strong> {endereco.estado}</p>
                <p><strong>CEP:</strong> {endereco.cep}</p>
                <button onClick={() => startEditing(index)}>Editar</button>
                <button onClick={() => handleDelete(endereco._id)}>Excluir</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>Nenhum endereço cadastrado.</p>
      )}
      <h3>Adicionar Novo Endereço</h3>
      <input
        type="text"
        placeholder="Rua"
        value={rua}
        onChange={(e) => setRua(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />
      <input
        type="text"
        placeholder="Estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      />
      <input
        type="text"
        placeholder="CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <button onClick={handleAddEndereco}>Adicionar Endereço</button>
    </div>
  );
}

export default MeusEnderecos;






