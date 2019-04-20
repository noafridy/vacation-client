import React, { Component } from 'react';
// import logo from './logo.svg';
import dreamvacation from './img/dreamvacation.jpg'
import './App.css';
//import { login } from './state/actions';
import Login from './components/Login'
import Registration from './components/Registration';
import Header from './components/Header';
import AddVacation from './components/AddVacation';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="header-img">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
