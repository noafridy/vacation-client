import React, { Component } from 'react';
import { Link } from "react-router-dom";  
import { registration } from "../actions"
import { connect } from "react-redux";

class Registration extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  }

  handleChng(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  mandatoryFieldChecks() {
    if (!this.state.firstName) {
      window.alert("Plese insert first name");
    }
    else if (!this.state.lastName) {
      window.alert("Plese insert last name");
    }
    else if (!this.state.username) {
      window.alert("Plese insert username");
    }
    else if (!this.state.password) {
      window.alert("Plese insert password");
    } else {
      this.props.dispatchregistration(this.state);
    }
  }

  render() {
    return (
      <div className="registration page-img">
        <form className="Registration-form">
          <h4 id="Registration-title">Registration</h4><br />
          <div className="form-group">
            <input name="firstName" onChange={this.handleChng.bind(this)} type="text" className="form-control" placeholder="Please enter first name" />
            <div id="massage-firstName"></div>
          </div>
          <div className="form-group">
            <input name="lastName" onChange={this.handleChng.bind(this)} type="text" className="form-control" placeholder="Please enter last name" />
            <div id="massage-lastname"></div>
          </div>
          <div className="form-group">
            <input name="username" onChange={this.handleChng.bind(this)} type="text" className="form-control" placeholder="Please enter username" />
            <div id="massage-username"></div>
          </div>
          <div className="form-group">
            <input name="password" onChange={this.handleChng.bind(this)} type="password" className="form-control" placeholder="Please enter password" />
            <small id="emailHelp" className="form-text text-muted">* The password can be any character </small>
            <div id="massage-password"></div>
          </div>
          <button  type="button" className="btn btn-primary" onClick={this.mandatoryFieldChecks.bind(this) }>Save</button>
          <div className="form-group"> 
          Already a member?  <Link className="login-link" to="/login"> click here </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {     
  return {
    dispatchregistration:(data) => dispatch(registration(data))  
  }
};

export default connect(null, mapDispatchToProps)(Registration);



