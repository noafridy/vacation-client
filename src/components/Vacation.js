import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
import { connect } from "react-redux"; //אם נרצה גישה לכל מה שקשור לרידקס נוסיף את הקונקט
import { deleteVacation, follow, unFollow, updateVacation } from "../actions"

// import { stat } from 'fs';

class Vacation extends Component {
  state = {
    isFollow: false,
    edit: false,
    vacation_id : this.props.vacation.ID || "",
    img: "",
    destination: this.props.vacation.destination || "",  //מאתחלת בשדה ששיך לכרטיסיה
    description: this.props.vacation.description || "",
    price: this.props.vacation.price || "",
    fromDate: this.props.vacation.fromDate || "",
    toDate: this.props.vacation.toDate || ""
  }

  deleteVacationHandler() {
    this.props.dispatchDeleteVacation(this.props.vacation.ID);
  }

  updateVacationHandler() {
    this.setState({ edit: true }); 
  }

  saveUpdate() {
    this.props.dispatchUpdate(this.state);  //I sent to server this.state
    this.cancelUpdate();
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  cancelUpdate(){
    this.setState({ edit: false }); 
  }

  checkRol(rol) {
    return ((this.props.userInfo) && (this.props.userInfo.rol === rol))
  }

  addFollow() {
    this.props.dispatchFollow({
      username: this.props.userInfo.username,
      vacation_id: this.props.vacation.ID
    })
    this.setState({ isFollow:true });
  }

  unFollow() {
    this.props.dispatchUnFollow({
      username: this.props.userInfo.username,
      vacation_id: this.props.vacation.ID
    })
    this.setState({ isFollow: false });
  }

  componentWillMount() {     //קורה לפני שהרנדר מצטייר
    if (this.props.followArr.indexOf(this.props.vacation.ID) != -1) {   //קיים פולו על הכרטיסיה וצריך לעדכן את הסטיט
      this.setState({ isFollow: true });
    }
  }

  render() {
    return (
      <div className="Vacation">

        <div className="card">
          {/* for admin */}
          {
            // (this.props.userInfo.rol === "admin") &&
            this.checkRol("admin") &&   //&& המטרה היא שאם הביטוי יצליח הוא ממשיך הלאה לדיב ומצייר אותו ואם הביטוי נכשל הוא לא ימשיך לדיב
            <div className="delete-edit">
              <i className="fas fa-times" onClick={this.deleteVacationHandler.bind(this)} ></i>
              <i className="fas fa-pencil-alt" onClick={this.updateVacationHandler.bind(this)} ></i>
            </div>
          }

          {
            !this.state.edit &&
            <React.Fragment>
              <img name="img" className="card-img-top" src={`data:image/png;base64,${this.props.vacation.img}`} alt="Card image cap" />
              <div className="card-body">
                <h6 name="destination" className="card-title">{this.props.vacation.destination}</h6>
                <p name="description" className="card-text"> {this.props.vacation.description} </p>
                <h5 name="price" className="card-price"> {this.props.vacation.price} </h5>
                <div name="fromDate" > {this.props.vacation.fromDate} </div>
                <div name="toDate"> {this.props.vacation.toDate} </div>
              </div>
            </React.Fragment>
          }

          {// to  deit
            this.state.edit &&
            <React.Fragment>
              <img name="img" className="card-img-top" src={`data:image/png;base64,${this.props.vacation.img}`} alt="Card image cap" />

              <div className="card-body">
                <input name="destination" value={this.state.destination} onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Please insert destination" />
                <input name="description" value={this.state.description} onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Please insert description" />
                <input name="price" value={this.state.price} onChange={this.handleChange.bind(this)} type="number" className="form-control" placeholder="Please insert price" />
                <input name="fromDate" value={this.state.fromDate} onChange={this.handleChange.bind(this)} type="date" className="form-control" />
                <input name="toDate" value={this.state.toDate} onChange={this.handleChange.bind(this)} type="date" className="form-control" />
              </div>
              <button className="save" onClick={this.saveUpdate.bind(this)} > Save </button>
              <button className="save" onClick={this.cancelUpdate.bind(this)}> Cancel </button>
            </React.Fragment>
          }

          {/* for user */}
          {
            // (this.props.userInfo.rol === "user") &&
            this.checkRol("user") &&
            <React.Fragment>    {/*  סוג של עטיפה כמו דיב רק שזה לא מתנהג כמו תגית בגלל שהשתמשנו בסימן של וגם */}
              {!this.state.isFollow &&
                <div className=" follow" >
                  <i className="far fa-heart"></i>
                  <span className="follow-button" onClick={this.addFollow.bind(this)} > Follow </span>
                </div>
              }

              {this.state.isFollow &&
                <div className=" follow" >
                  <i className="far fa-heart"></i>
                  <span className="follow-button" onClick={this.unFollow.bind(this)}> Unfollow </span>
                </div>
              }

            </React.Fragment>
          }

        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {   //mapStateToProps is connect to the store
  return {
    allvacation: state.vacationReducer,   // state.allmovies  is the state of redux, the this.props.allmovies will exsist in this comp also
    userInfo: state.userReducer,           // מביאה את היוזר המחובר
    followArr: state.followReducer        //the name its from the index reducer
  };
};

const mapDispatchToProps = (dispatch) => {     //update the reducer - actions
  return {
    dispatchDeleteVacation: async (data) => dispatch(await deleteVacation(data)),  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
    dispatchFollow: async (data) => dispatch(await follow(data)),  //follow its from action
    dispatchUnFollow: async (data) => dispatch(await unFollow(data)),
    dispatchUpdate: async (data) => dispatch(await updateVacation(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Vacation);

