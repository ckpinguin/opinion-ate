import restaurantsReducer from './restaurants/reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {loadRestaurants} from './restaurants/actions';

describe('restaurants', () => {
  describe('loadRestaurants action', () => {
    // Arrange
    it('stores the restaurants', async () => {
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };
      const initialState = {
        records: [],
      };
      const store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );
      // Act
      await store.dispatch(loadRestaurants());
      // Assert
      expect(store.getState().records).toEqual(records);
    });
  });
});
