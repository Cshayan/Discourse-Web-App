/* Store file for Redux */

// Dependencies
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// Initial State
const initialState = {};

// Midddleware
const middleWare = [thunk];

// Setup store
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

// Export store
export default store;