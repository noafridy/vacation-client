import React, { Component } from 'react';
import { Link } from "react-router-dom";  //that i can use in router
import { login } from "../actions"
import { connect } from "react-redux";

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  mandatoryFieldChecks() {
    if (!this.state.username) {
      window.alert("Please insert username");
    }
    else if (!this.state.password) {
      window.alert("Please insert password");
    }else{
      this.props.dispatchLogin(this.state);
    }

  }
  render() {
    return (
      <div className="Login page-img">

        <form className="login-form">
        <h4 id="login-title">Login</h4><br/>
          <div className="form-group">
            <input type="text" name="username" onChange={this.handleChange.bind(this)} className="form-control" id="usernameid"  placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <input type="password" name="password" onChange={this.handleChange.bind(this)} className="form-control" id="passwordid" placeholder="Enter your password" />
          </div>
          <button type="button" className="btn btn-primary" onClick={this.mandatoryFieldChecks.bind(this)}>Continue</button> 
          <div className="endForm"><br/>
          <div className="form-group">
          Not a member yet?<Link className="login-link" to="/registration"> Join now</Link> 
          </div>
          </div>
        </form>


      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {     //update the reducer - actions
  return {
    dispatchLogin:(data) => dispatch(login(data))  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
  }
};

export default connect(null, mapDispatchToProps)(Login);
