import {render, screen} from '@testing-library/react';
import RestaurantList from './RestaurantList';

describe('RestaurantList', () => {
  it('loads restaurants on first render', () => {
    // Arrange
    const loadRestaurants = jest.fn().mockName('loadRestaurants');
    const restaurants = [];
    // Act
    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />,
    );
    // Assert
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    // Arrange
    const noop = () => {};
    const restaurants = [
      {id: 1, name: 'Sushi Place'},
      {id: 2, name: 'Pizza Place'},
    ];
    // Act
    render(<RestaurantList loadRestaurants={noop} restaurants={restaurants} />);
    // Assert
    expect(screen.getByText('Sushi Place')).toBeInTheDocument();
    expect(screen.getByText('Pizza Place')).toBeInTheDocument();
  });
});
