import axios from 'axios';

const client = axios.create({
  // Normally we would get this from a .evn file
  baseURL: 'https://api.outsidein.dev/v0RmVRWZPh101eeMhi6dEaacJGsxAlsM',
});

const api = {
  async loadRestaurants() {
    // To test, use this:
    // const response = await client.get('/BAD');
    const response = await client.get('/restaurants');
    // To test, uncomment this return
    return response.data;
  },

  async createRestaurant(name) {
    const response = await client.post('/restaurants', {name});
    return response.data;
  },
};

export default api;
