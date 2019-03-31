import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from "redux";
import vacationReducer from "./state/vacationReducer";    //need to change the Reducer name
import { Provider } from "react-redux";

// const store = createStore(userReducer);

const store = createStore(vacationReducer, composeWithDevTools()); //need to change the Reducer name

ReactDOM.render(  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
