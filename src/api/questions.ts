import axios from './axios';

export const getQuestions = () => axios.get('/questions').then((response) => response.data);

export const createQuestion = (data: any) => axios.post('/questions', data).then((response) => response.data);

export const deleteQuestion = (id: number) => axios.delete(`/questions/${id}`).then((response) => response.data);
