import api from './api';
import { jwtDecode } from 'jwt-decode';

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', null, {
      params: { username, password }
    });
    const token = response.data;

    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    return { "token" : token,
    "role": userRole };
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const register = async (email, username, password) => {
  try {
    await api.post('/register', null, {
      params: { username, email, password }});
  } catch (error) {
    throw new Error('Registration failed. Please try again later.');
  }
};
