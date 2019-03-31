import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import SearchMovie from './components/SearchMovie';
import AllMovies from './components/AllMovies';


class App extends Component {
  render() {
    return (
      <div className="App">
     
      
       <SearchMovie/>
       <AllMovies/>


      </div>
    );
  }
}

export default App;
