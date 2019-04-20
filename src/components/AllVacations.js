import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
import { connect } from "react-redux"; //אם נרצה גישה לכל מה שקשור לרידקס נוסיף את הקונקט
import { getVacations, socketUpdateVecations, myFollow } from "../actions"
import { Link } from "react-router-dom";
import Vacation from './Vacation';
import io from 'socket.io-client';  //ספריה של סוקט
const socket = io('http://localhost:3001');  //מגדירים לאיזה פורט וכתובת מאזינים בשרת
// import Graph from './Graph';

class AllVacations extends Component {

  checkRol(rol) {
    return ((this.props.userInfo) && (this.props.userInfo.rol === rol))
  }

  componentDidMount() {
    this.props.dispatchGetVacations();
    (this.props.userInfo) &&
      this.props.dispatchMyFollows(this.props.userInfo.username);

    // socket.emit('event',{name: 'test', value: 10});  // תשדר בתדר של אוונט את האובייקט שיצרנו
    // socket.on('server-message', function(msg){
    //   console.log('message: ' + msg);
    // });

    socket.on('vecations-updated', (vecations) => {
      return this.props.dispatchSocketUpdateVecations(vecations);
    });
  }

  render() {
    if (this.props.allvacation.length === 0) {
      return (<div></div>);
    }

    return (
      <React.Fragment >

        {this.checkRol("admin") &&
          <div className="link">
            <i className="fas fa-plus"></i>
            <Link className="insert-vaction-link" to="/addVacation"> Add New Vacation</Link>
          </div>
        }
        {this.checkRol("admin") &&
          <div className="link">
            <i className="fas fa-chart-bar"></i>
            <Link className="insert-vaction-link" to="/graph"> Show Graph</Link>
          </div>
        }
        <div className="AllVacations">
        {(!this.checkRol("user") && !this.checkRol("admin")) && 
          <h3 className="title">All Vacation </h3>}

          {/*  includes its like index of */}
          {/* <div className="followCards"> */}
          {/* <div className="row title">   </div>*/}
          {this.checkRol("user") &&
            <React.Fragment>
              <h3 className="title">My Favorite Vacation <span>({this.props.followArr.length})</span></h3>
              <div className="row">
                {this.props.allvacation.filter(v => this.props.followArr.includes(v.ID)).map(v2 => <Vacation key={v2.ID} vacation={v2} />)}
              </div>
            </React.Fragment>
          }
          {/* </div> */}
          {/* <div className="unfollowCards"  > */}
          {/* <div className="row title"> </div>*/}
          {this.checkRol("user") && <h3 className="title">Vacations That I Don't Follow <span>({this.props.allvacation.length - this.props.followArr.length})</span></h3>}
          <div className="row">
            {this.props.allvacation.filter(v => !this.props.followArr.includes(v.ID)).map(v2 => <Vacation key={v2.ID} vacation={v2} />)}
          </div>
          {/* </div> */}
         
          {/* <div className="row"> 
          {this.props.allvacation.map(v => <Vacation key={v.ID} vacation={v} />)}
          </div> */}
          

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
    dispatchGetVacations: async (data) => dispatch(await getVacations(data)),  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
    dispatchSocketUpdateVecations: async (data) => dispatch(await socketUpdateVecations(data)),  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
    dispatchMyFollows: async (data) => dispatch(await myFollow(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllVacations);



