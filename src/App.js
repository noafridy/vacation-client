import './App.css';
import React, { Component } from 'react';
import Header from './components/Header';
import { connect } from "react-redux";
import {socketUpdateVecations} from "./actions"
import io from 'socket.io-client';
const socket = io('https://app-vacation.herokuapp.com');  //מגדירים לאיזה פורט וכתובת מאזינים בשרת
class App extends Component {

  constructor(props) {
    super(props)
    socket.on('vecations-updated', (vecations) => {
      return this.props.dispatchSocketUpdateVecations(vecations);
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

const mapDispatchToProps = (dispatch) => {     //update the reducer - actions
  return {
    //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
    dispatchSocketUpdateVecations: (data) => dispatch(socketUpdateVecations(data))
  }
};

export default connect(null, mapDispatchToProps)(App);



