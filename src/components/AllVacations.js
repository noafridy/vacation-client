import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
import { connect } from "react-redux"; //אם נרצה גישה לכל מה שקשור לרידקס נוסיף את הקונקט
import { getVacations } from "../actions"
import Vacation from './Vacation';

class AllVacations extends Component {

  componentDidMount() {
    this.props.dispatchGetVacations();
  }

  render() {
    return (
      <div className="AllVacations">
        {this.props.allvacation.map(v => <Vacation key={v.ID} vacation={v} />)}
      </div>
    );
  }
}
const mapStateToProps = (state) => {   //mapStateToProps is connect to the store
  return {
    allvacation: state.vacationReducer   // state.allmovies  is the state of redux, the this.props.allmovies will exsist in this comp also
  };
};

const mapDispatchToProps = (dispatch) => {     //update the reducer - actions
  return {
    dispatchGetVacations: async (data) => dispatch(await getVacations(data))  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllVacations);



