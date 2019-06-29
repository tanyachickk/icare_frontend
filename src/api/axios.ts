import axios from 'axios';

export default axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: process.env.VUE_APP_HOST,
});
