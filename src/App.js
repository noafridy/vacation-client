import './App.css';
import React, { Component } from 'react';
import Header from './components/Header';
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


