import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './standard.css';
import App from './App';
import cookies from "js-cookie";

import { BrowserRouter as Router } from "react-router-dom"
import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension"

import { userDetailsR, userLoginR } from './reducers/userReducer';

const rootReducer = combineReducers({
  userDetails: userDetailsR,
  userLogin: userLoginR,
})

const userInfoFromStorage = cookies.get("user") ? JSON.parse(cookies.get("user")) : null

const initialState = {
  userLogin: {userInfo: userInfoFromStorage},
};
const middleware = [thunk]
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
