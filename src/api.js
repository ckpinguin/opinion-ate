import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.outsidein.dev/v0RmVRWZPh101eeMhi6dEaacJGsxAlsM',
});

const api = {
  async loadRestaurants() {
    const response = await client.get('/restaurants');
    return response.data;
  },

  async createRestaurant(name) {
    const response = await client.post('/restaurants', {name});
    return response.data;
  },
};

export default api;
