
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/auth';

export const signup = async (username, password) => {
  const res = await axios.post(`${API_URL}/signup`, { username, email, password });
  return res.data;
};

export const signin = async (username, password) => {
  const res = await axios.post(`${API_URL}/signin`, { username, password });
  return res.data; 
};

export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => localStorage.setItem('token', token);
