import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
import { connect } from "react-redux"; //אם נרצה גישה לכל מה שקשור לרידקס נוסיף את הקונקט
import { deleteVacation } from "../actions"
import { stat } from 'fs';

class Vacation extends Component {

  deleteVacationHandler() {
    this.props.dispatchDeleteVacation(this.props.vacation.ID);
  }

  checkRol(rol) {
    return ((this.props.userInfo) &&  (this.props.userInfo.rol === rol))
  }

  render() {
    return (
      <div className="Vacation">

        <div className="card">
          {/* for admin */}
          {
            // (this.props.userInfo.rol === "admin") &&
            this.checkRol("admin")&&   //&& המטרה היא שאם הביטוי יצליח הוא ממשיך הלאה לדיב ומצייר אותו ואם הביטוי נכשל הוא לא ימשיך לדיב
            <div className="delete-edit">
              <i className="fas fa-times" onClick={this.deleteVacationHandler.bind(this)} ></i>
              <i className="fas fa-pencil-alt"></i>
            </div>
          }

          <img className="card-img-top" src={`data:image/png;base64,${this.props.vacation.img}`} alt="Card image cap" />
          <div className="card-body">
            <h6 className="card-title">{this.props.vacation.destination}</h6>
            <p className="card-text"> {this.props.vacation.description} </p>
            <h5 className="card-price"> {this.props.vacation.price} </h5>
            <div > {this.props.vacation.fromDate} </div>
            <div > {this.props.vacation.toDate} </div>

            {/* for user */}
            {
              // (this.props.userInfo.rol === "user") &&
              this.checkRol("user")&&
              <div className=" follow" >
                <i className="far fa-heart"></i>
                <span className="follow-button"> Follow </span>
              </div>
            }



          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {   //mapStateToProps is connect to the store
  return {
    allvacation: state.vacationReducer,   // state.allmovies  is the state of redux, the this.props.allmovies will exsist in this comp also
    userInfo: state.userReducer           // מביאה את היוזר המחובר
  };
};

const mapDispatchToProps = (dispatch) => {     //update the reducer - actions
  return {
    dispatchDeleteVacation: async (data) => dispatch(await deleteVacation(data))  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Vacation);

