import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
import { connect } from "react-redux"; //אם נרצה גישה לכל מה שקשור לרידקס נוסיף את הקונקט
import { getVacations, myFollow } from "../actions"
import { Link } from "react-router-dom";

import Vacation from './Vacation';

class AllVacations extends Component {

  checkRol(rol) {
    return ((this.props.userInfo) && (this.props.userInfo.rol === rol))
  }

  componentDidMount() {
    this.props.dispatchGetVacations();
    (this.props.userInfo) &&
      this.props.dispatchMyFollows(this.props.userInfo.username);
  }

  render() {
    return (
      <React.Fragment >

        {this.checkRol("admin") &&
          <div className="link">
            <i className="fas fa-plus"></i>
            <Link className="insert-vaction-link" to="/addVacation"> Add New Vacation</Link>
          </div>
        }

        <div className="AllVacations">
        {this.props.allvacation.map(v => <Vacation key={v.ID} vacation={v} />)}
          {/* {this.props.allvacation.filter(v=> v.ID === this.props.followArr.vacation_id).map(v2 =><Vacation key={v2.ID} vacation={v2} />)}    */}
          
        
        </div>

      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {   //mapStateToProps is connect to the store
  return {
    allvacation: state.vacationReducer,   // state.allmovies  is the state of redux, the this.props.allmovies will exsist in this comp also
    userInfo: state.userReducer
    // ,
    // followArr: state.followReducer
  };
};

const mapDispatchToProps = (dispatch) => {     //update the reducer - actions
  return {
    dispatchGetVacations: async (data) => dispatch(await getVacations(data)),  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
    dispatchMyFollows: async (data) => dispatch(await myFollow(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllVacations);



