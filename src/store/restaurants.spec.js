import restaurantsReducer from './restaurants/reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {loadRestaurants} from './restaurants/actions';

describe('restaurants', () => {
  describe('initially', () => {
    // Arrange
    let store;
    beforeEach(() => {
      const initialState = {};
      store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk), // no api needed here
      );
    });
    it('does not have the loading flag set', () => {
      // Assert
      expect(store.getState().loading).toEqual(false);
    });
    it('does not have the error flag set', () => {
      expect(store.getState().loadError).toEqual(false);
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
      let store;
      beforeEach(() => {
        // Arrange
        const api = {
          loadRestaurants: () => new Promise(() => {}), // Never resolves
        };
        const initialState = {loadError: true};
        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        // No await here, because we want instant result (loading state)
        store.dispatch(loadRestaurants());
      });

      it('sets a loading flag', () => {
        // Assert
        expect(store.getState().loading).toEqual(true);
      });

      it('clears the error flag', () => {
        expect(store.getState().loadError).toEqual(false);
      });
    });

    describe('when loading fails', () => {
      let store;
      beforeEach(() => {
        // Arrange
        const api = {loadRestaurants: () => Promise.reject()}; // Fails always

        const initialState = {};

        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );
        return store.dispatch(loadRestaurants());
      });
      it('sets an error flag', () => {
        expect(store.getState().loadError).toEqual(true);
      });
      it('clears the loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });
    });
  });
});
