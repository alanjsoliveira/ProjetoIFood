
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/auth', // Certifique-se de que o backend está rodando na porta 5000
});

export default api;
