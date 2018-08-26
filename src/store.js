/* *
*  REDUX SETUP (2) - STORE
*/
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index';

const initialState = {};
const middleWare = [thunk];
// 1. Add the reducer as []
// 2. Initial state
// 3. Middleware

export const store = createStore(
    rootReducer,
    initialState,
    compose( // Compose is for DEVTOOLS redux extension
        applyMiddleware(...middleWare),
        // REDUX PLUGIN DEVTOOLS // REMOVE in PROD
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);