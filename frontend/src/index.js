import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App';
import * as serviceWorker from './serviceWorker';

import { combineReducers, legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk'; // Correct import for redux-thunk
import authReducer from './store/authReducer';

// Create root reducer
const reducer = combineReducers({ auth: authReducer }); 

// Set up Redux DevTools
const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Redux store with thunk middleware
const store = createStore(reducer, composeEnhanced(applyMiddleware(thunk)));

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Unregister service worker
serviceWorker.unregister();
