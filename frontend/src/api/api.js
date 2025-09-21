
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://truegradient-assigment1-d8eg.onrender.com', 
  withCredentials: true 
});

export default api;

