import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import './styles/index.scss'
import rootReducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import { Provider } from 'react-redux';
// import { getAll } from './actions/allActions'
 
const store = createStore(
  rootReducers, composeWithDevTools(applyMiddleware(thunk))
)

// store.dispatch(getAll())

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

