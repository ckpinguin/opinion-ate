import {render} from '@testing-library/react';
import RestaurantList from './RestaurantList';

describe('RestaurantList', () => {
  it('loads restaurants on first render', () => {
    // Arrange
    const loadRestaurants = jest.fn().mockName('loadRestaurants');
    // Act
    render(<RestaurantList loadRestaurants={loadRestaurants} />);
    // Assert
    expect(loadRestaurants).toHaveBeenCalled();
  });
});
