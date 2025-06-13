import axios from 'axios';
import { auth } from '../firebase';


const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});


api.interceptors.request.use(async config => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Request token:', token);
  }
  return config;
});

export default api;
 