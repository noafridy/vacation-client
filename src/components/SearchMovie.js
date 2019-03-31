import React, { Component } from 'react';
import { connect } from "react-redux"; //אם נרצה גישה לכל מה שקשור לרידקס נוסיף את הקונקט
import {searchMovie} from "../state/actions"


class SearchMovie extends Component {
  render() {
    return (
      <div className="SearchMovie">
     <h1> Search Movie</h1>
     <input onChange={e => this.props.dispatchSearchMovie(e.target.value)} placeholder="insert movie name" />
     

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {     //update the reducer - actions
  return {
    dispatchSearchMovie: async (data) => dispatch( await searchMovie(data))  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
  }
};

const mapStateToProps = (state) => {   //updte the state
  return { 
    allmovies : state.allmovies
  };
};

const searchMovie1 = connect(mapStateToProps, mapDispatchToProps)(SearchMovie);

export default searchMovie1;
