import {render, screen} from '@testing-library/react';
// Use the named export (not connected with the store)
// In the prod. App then use the default export (which is connected with the store)
import {RestaurantList} from './RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  let loadRestaurants;

  function renderComponent() {
    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />,
    );
  }

  it('loads restaurants on first render', () => {
    // Arrange
    loadRestaurants = jest.fn().mockName('loadRestaurants');
    // Act
    renderComponent();
    // Assert
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    // Arrange
    // Act
    renderComponent(); // Assert
    expect(screen.getByText('Sushi Place')).toBeInTheDocument();
    expect(screen.getByText('Pizza Place')).toBeInTheDocument();
  });
});
