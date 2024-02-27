import axios from 'axios';

const client = axios.create({
  baseURL: 'http://api.outsidein.dev/v0RmVRWZPh101eeMhi6dEaacJGsxAlsM',
});

const api = {
  async loadRestaurants() {
    const response = await client.get('/restaurants');
    return response.data;
  },
};

export default api;
