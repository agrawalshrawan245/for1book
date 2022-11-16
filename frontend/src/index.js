import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './standard.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import {createStore, combineReducers} from "redux"
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension"

const rootReducer = combineReducers({})

const store = createStore(rootReducer, composeWithDevTools())
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
