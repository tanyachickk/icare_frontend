import axios from './axios';

export const getAppointments = () => axios.get('/appointments?userId=1').then((response) => response.data);
