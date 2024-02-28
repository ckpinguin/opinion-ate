import restaurantsReducer from './restaurants/reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {loadRestaurants} from './restaurants/actions';

describe('restaurants', () => {
  describe('initially', () => {
    it('does not have the loading flag set', () => {
      // Arrange
      const initialState = {};
      const store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk), // no api needed here
      );
      // Expect
      expect(store.getState().loading).toEqual(false);
    });
  });
  describe('loadRestaurants action', () => {
    describe('when loading succeeds', () => {
      // Arrange
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];
      let store;

      beforeEach(() => {
        // Arrange
        const api = {
          loadRestaurants: () => Promise.resolve(records),
        };
        const initialState = {
          records: [],
        };
        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        // Act
        // Since we do not await a Promise, we need to return here
        return store.dispatch(loadRestaurants());
      });

      it('stores the restaurants', () => {
        // Assert
        expect(store.getState().records).toEqual(records);
      });
      it('clears the loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });
    });
    describe('while loading', () => {
      it('sets a loading flag', () => {
        // Arrange
        const api = {
          // Does never resolve:
          loadRestaurants: () => new Promise(() => {}),
        };
        const initialState = {};

        const store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        // Act
        // No await here, because we want instant result (loading state)
        store.dispatch(loadRestaurants());
        // Assert
        expect(store.getState().loading).toEqual(true);
      });
    });
  });
});
