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

  // Make overrides of props possible (i.e. loading state etc.)
  function renderComponent(propOverrides = {}) {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      // default restaurant or jest-mock could be easily overriden:
      loading: false,
      restaurants,
      ...propOverrides,
    };
    loadRestaurants = props.loadRestaurants;
    render(<RestaurantList {...props} />);
  }

  it('loads restaurants on first render', () => {
    // Arrange
    loadRestaurants = jest.fn().mockName('loadRestaurants');
    // Act
    renderComponent();
    // Assert
    expect(loadRestaurants).toHaveBeenCalled();
  });

  describe('when loading succeeds', () => {
    it('displays the restaurants', () => {
      // Arrange
      // Act
      renderComponent(); // Assert
      expect(screen.getByText('Sushi Place')).toBeInTheDocument();
      expect(screen.getByText('Pizza Place')).toBeInTheDocument();
    });
    it('does not display the loading indicator when not loading', () => {
      // Arrange
      renderComponent();
      // Assert
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  describe('when loading is successful', () => {
    it('displays the loading indicator while loading', () => {
      // Arrange
      renderComponent({loading: true});
      // Assert
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
    it('does not display the error message', () => {
      // Arrange
      renderComponent({loadError: false});
      // Assert
      expect(
        screen.queryByText('Restaurants could not be loaded.'),
      ).not.toBeInTheDocument();
    });
  });

  describe('when loading fails', () => {
    it('displays an error message', () => {
      // Arrange
      renderComponent({loadError: true});
      // Assert
      expect(
        screen.getByText('Restaurants could not be loaded.'),
      ).toBeInTheDocument();
    });
  });
});
