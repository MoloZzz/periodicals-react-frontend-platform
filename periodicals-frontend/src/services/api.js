import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7001/api', // замініть на ваш бекенд URL
});

export default api;