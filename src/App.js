import React, { Component } from 'react';
// import logo from './logo.svg';
import dreamvacation from './img/dreamvacation.jpg'
import './App.css';
//import { login } from './state/actions';
import Login from './components/Login'
import Registration from './components/Registration';
import Header from './components/Header';
import AddVacation from './components/AddVacation';
import io from 'socket.io-client';  //ספריה של סוקט
const socket = io('http://localhost:3001');  //מגדירים לאיזה פורט וכתובת מאזינים בשרת

class App extends Component {

  componentDidMount() {
    socket.emit('event',{name: 'test', value: 10});
    socket.on('server-message', function(msg){
      console.log('message: ' + msg);
    });
  }
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
