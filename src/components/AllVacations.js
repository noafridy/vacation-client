import React, { Component } from 'react';
import { connect } from "react-redux"; //אם נרצה גישה לכל מה שקשור לרידקס נוסיף את הקונקט
import { getVacations, socketUpdateVecations, myFollow } from "../actions"
import { Link } from "react-router-dom";
import Vacation from './Vacation';
import { checkRol } from "../functions";

class AllVacations extends Component {

  componentDidMount() {
    this.props.dispatchGetVacations();
    (this.props.userInfo) &&
      this.props.dispatchMyFollows(this.props.userInfo.username);

  }

  render() {
    if (this.props.allvacation.length === 0) {
      return (<div></div>);
    }

    return (
      <React.Fragment >

        {checkRol("admin", this.props.userInfo) &&
          <div className="link">
            <i className="fas fa-plus"></i>
            <Link className="insert-vaction-link" to="/addVacation"> Add New Vacation</Link>
          </div>
        }
        {checkRol("admin", this.props.userInfo) &&
          <div className="link">
            <i className="fas fa-chart-bar"></i>
            <Link className="insert-vaction-link" to="/graph"> Show Graph</Link>
          </div>
        }
        <div className="AllVacations">
          {(!checkRol("user", this.props.userInfo) && !checkRol("admin", this.props.userInfo)) &&
            <h3 className="title firstTitle">All Vacation </h3>}

          {checkRol("user", this.props.userInfo) &&
            <React.Fragment>
              <h3 className="title firstTitle">My Favorite Vacation <span>({this.props.followArr.length})</span></h3>
              <div className="row">
                {this.props.allvacation.filter(v => this.props.followArr.includes(v.ID)).map(v2 => <Vacation key={v2.ID} vacation={v2} />)}
              </div>
            </React.Fragment>
          }

          {checkRol("user", this.props.userInfo) && <h3 className="title">Vacations That I Don't Follow <span>({this.props.allvacation.length - this.props.followArr.length})</span></h3>}
          <div className="row">
            {this.props.allvacation.filter(v => !this.props.followArr.includes(v.ID)).map(v2 => <Vacation key={v2.ID} vacation={v2} />)}
          </div>

        </div>

      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {   //mapStateToProps is connect to the store
  return {
    allvacation: state.vacationReducer,   // state.allmovies  is the state of redux, the this.props.allmovies will exsist in this comp also
    userInfo: state.userReducer,
    followArr: state.followReducer
  };
};

const mapDispatchToProps = (dispatch) => {     //update the reducer - actions
  return {
    dispatchGetVacations: () => dispatch(getVacations()),  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
    // dispatchSocketUpdateVecations: (data) => dispatch(socketUpdateVecations(data)),  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
    dispatchMyFollows: (data) => dispatch(myFollow(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllVacations);



