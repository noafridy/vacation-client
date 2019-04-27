import React, { Component } from 'react';
import { connect } from "react-redux"; 
import { deleteVacation, follow, unFollow, updateVacation } from "../actions"
import {checkRol} from "../functions";

class Vacation extends Component {
  state = {
    isFollow: false,
    edit: false,
    vacation_id: this.props.vacation.ID || "",
    img: this.props.vacation.img || "",
    destination: this.props.vacation.destination || "", 
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
    this.props.dispatchUpdate(this.state);  
    this.cancelUpdate();
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  saveAsBase64(event) {
    const that = this;
    var file = Array.from(event.target.files)[0];
    var reader = new FileReader();
    reader.onload = function () {
      const img = btoa(reader.result); 
      that.setState({ img });
    };
    reader.onerror = function () {
      console.log('there are some problems');
    };
    reader.readAsBinaryString(file); 
  }

  cancelUpdate() {
    this.setState({ edit: false });
  }

  addFollow() {
    this.props.dispatchFollow({
      username: this.props.userInfo.username,
      vacation_id: this.props.vacation.ID
    })
    this.setState({ isFollow: true });
  }

  unFollow() {
    this.props.dispatchUnFollow({
      username: this.props.userInfo.username,
      vacation_id: this.props.vacation.ID
    })
    this.setState({ isFollow: false });
  }

  componentWillMount() {     
    if (this.props.followArr.indexOf(this.props.vacation.ID) != -1) {   
      this.setState({ isFollow: true });
    }
  }


  render() {
    const todate = this.props.vacation.toDate.split('-').reverse().join('-');
    const fromdate = this.props.vacation.fromDate.split('-').reverse().join('-');
    return (
      <div className="Vacation">

        <div className="card">
          {
            checkRol("admin",this.props.userInfo) &&   
            <React.Fragment> 
            <div className="delete-edit">
              <i className="fas fa-times" onClick={this.deleteVacationHandler.bind(this)} ></i>
              <i className="fas fa-pencil-alt" onClick={this.updateVacationHandler.bind(this)} ></i>
            </div>
             <i className="vacation-id"> ID: {this.props.vacation.ID}</i>
             </React.Fragment>
          }

          {
            !this.state.edit &&
            <React.Fragment>
              <img name="img" className="card-img-top" src={`data:image/png;base64,${this.props.vacation.img}`} alt="Card image cap" />
              <div className="card-body">
                <h6 name="destination" className="card-title">{this.props.vacation.destination}</h6>
                <p name="description" className="card-text"> {this.props.vacation.description} </p>
                <h5 name="price" className="card-price"> {this.props.vacation.price} </h5>
                <div name="fromDate" > {fromdate} </div>
                <div name="toDate"> {todate} </div>
              </div>
            </React.Fragment>
          }

          {// admin ->  edit
            this.state.edit &&
            <React.Fragment>
              <img name="img" className="card-img-top" src={`data:image/png;base64,${this.state.img}`} alt="Card image cap" />

              <div className="card-body card-body-edit">
                <input name="img" onChange={this.saveAsBase64.bind(this)} type='file' accept="image/*" className="form-control-file" />
                <input name="destination" value={this.state.destination} onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Please insert destination" />
                <input name="description" value={this.state.description} onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Please insert description" />
                <input name="price" value={this.state.price} onChange={this.handleChange.bind(this)} type="number" className="form-control" placeholder="Please insert price" />
                <input name="fromDate" value={this.state.fromDate} onChange={this.handleChange.bind(this)} type="date" className="form-control" />
                <input name="toDate" value={this.state.toDate} onChange={this.handleChange.bind(this)} type="date" className="form-control" />
              </div>
              <div className="update-button">
                <button className="save-button" onClick={this.saveUpdate.bind(this)} > Save </button>
                <button className="cancel-button" onClick={this.cancelUpdate.bind(this)}> Cancel </button>
              </div>

            </React.Fragment>
          }

          {
            checkRol("user",this.props.userInfo) &&
            <React.Fragment>   
              {!this.state.isFollow &&
                <div className=" follow" onClick={this.addFollow.bind(this)} >
                  <i className="far fa-heart"></i>
                  <span className="follow-button" > Follow </span>
                </div>
              }
              {this.state.isFollow &&
                <div className=" follow" onClick={this.unFollow.bind(this)}>
                  <span className="follow-button"> Unfollow </span>
                </div>
              }

            </React.Fragment>
          }

        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {   
  return {
    allvacation: state.vacationReducer,   
    userInfo: state.userReducer,          
    followArr: state.followReducer        
  };
};

const mapDispatchToProps = (dispatch) => {     
  return {
    dispatchDeleteVacation:(data) => dispatch(deleteVacation(data)),  
    dispatchFollow:(data) => dispatch(follow(data)),  
    dispatchUnFollow:(data) => dispatch(unFollow(data)),
    dispatchUpdate:(data) => dispatch(updateVacation(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Vacation);

