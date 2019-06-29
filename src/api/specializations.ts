import axios from './axios';

export const getSpecializations = () => axios.get('/specializations').then((response) => response.data);
