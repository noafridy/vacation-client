import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore, compose } from "redux";
import ReduxThunk from 'redux-thunk'
import rootReducer from "./reducers";    //import index.js if we don't specify file
import { Provider } from "react-redux";
import Registration from './components/Registration';
import Login from './components/Login';
import AllVacation from './components/AllVacations';
import AddVacation from './components/AddVacation';
import Graph from './components/Graph';

const composeEnhancer = (typeof window === 'object' && typeof window.devToolsExtension !== "undefined") ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
function isLoggedIn() {      // יצרתי פונקציה שתפנה לקוקי ותבדוק האם המשתמש מחובר אם לא יוצא לוגין אם כן יוצג חופשות
  const userInfo = document.cookie ? JSON.parse(decodeURIComponent(document.cookie).split('=')[1]) : null;
  return (userInfo !== null);
}
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(ReduxThunk))

);

//const store = createStore(userReducer,composeWithDevTools()); //need to change the Reducer name

ReactDOM.render(<Provider store={store}>

  <Router>
    <App>
      <Switch>
        {/* <Route exact path="/" exact component={Index} /> */}
        <Route exact path="/registration/" component={Registration} />  {/* to see in url http://localhost:3000/registration */}
        <Route exact path="/login/" component={Login} />  {/* to see in url http://localhost:3000/login */}
        {/* <Route exact path="/" component={AllVacation} /> home page -> to see in url http://localhost:3000 */}
        <Route exact path="/" render={() => (
          isLoggedIn() ? (
            <AllVacation/>
          ) : (
            <Redirect to="/login"/>
          )
        )}/>
        <Route exact path="/addVacation" component={AddVacation} />
        <Route exact path="/graph" component={Graph} />
      </Switch>
    </App>
  </Router>


</Provider>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
