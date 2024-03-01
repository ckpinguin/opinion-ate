import api from './api';

describe('api', () => {
  describe('loadRestaurants', () => {
    const restaurants = [{id: 1, name: 'Sushi Place'}];

    it('returns the response to the right endpoint', async () => {
      await expect(api.loadRestaurants()).resolves.toEqual(restaurants);
    });
  });
});
