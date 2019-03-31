import React, { Component } from 'react';
import { connect } from "react-redux"; //אם נרצה גישה לכל מה שקשור לרידקס נוסיף את הקונקט
import Movie from './Movie';
class AllMovies extends Component {


  render() {
    return (
      <div className="AllMovies">
        {this.props.allmovies.Search && this.props.allmovies.Search.map((m) => 
          <Movie key={m.Title} movie={m}/>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {   //mapStateToProps is connect to the store
  return {
    allmovies: state.allmovies   // state.allmovies  is the state of redux, the this.props.allmovies will exsist in this comp also
  };
};

const allMovies1 = connect(mapStateToProps, null)(AllMovies);   //null becouse we dont have action in this compn (mapDispatchToProps)

export default allMovies1;
