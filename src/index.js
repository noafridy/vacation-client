import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore, compose } from "redux";
import ReduxThunk from 'redux-thunk'
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import Registration from './components/Registration';
import Login from './components/Login';
import AllVacation from './components/AllVacations';
import AddVacation from './components/AddVacation';
import Graph from './components/Graph';

const composeEnhancer = (typeof window === 'object' && typeof window.devToolsExtension !== "undefined") ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
function isLoggedIn() {
  const userInfo = document.cookie ? JSON.parse(decodeURIComponent(document.cookie).split('=')[1]) : null;
  return (userInfo !== null);
}
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ReduxThunk))

);

ReactDOM.render(<Provider store={store}>

  <Router>
    <App>
      <Switch>
        <Route exact path="/registration/" component={Registration} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/" render={() => (
          isLoggedIn() ? (
            <AllVacation />
          ) : (
              <Redirect to="/login" />
            )
        )} />
        <Route exact path="/addVacation" component={AddVacation} />
        <Route exact path="/graph" component={Graph} />
      </Switch>
    </App>
  </Router>


</Provider>, document.getElementById('root'));


serviceWorker.unregister();
