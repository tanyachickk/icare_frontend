import axios from './axios';

export const createOption = (data: any) => axios.post('/options', data).then((response) => response.data);

export const getOptions = () => axios.get('/options').then((response) => response.data);
