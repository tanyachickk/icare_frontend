import axios from './axios';

export const getAnswers = () => axios.get('/answers').then((response) => response.data);
