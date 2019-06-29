import axios from './axios';

export const getDoctors = () => axios.get('/doctors').then((response) => response.data);
