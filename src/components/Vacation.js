import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';



class Vacation extends Component {


  render() {
    return (
      <div className="Vacation">
        {/* <div className="card" style="width: 18rem;"> */}
        <div className="card">
          <img className="card-img-top" src={`data:image/png;base64,${this.props.vacation.img}`} alt="Card image cap" />
          <div className="card-body">
            <h6 className="card-title">{this.props.vacation.destination}</h6>
            <p className="card-text"> {this.props.vacation.description} </p>
            <h5> {this.props.vacation.price} </h5>
            <div > {this.props.vacation.fromDate} </div>
            <div > {this.props.vacation.toDate} </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default Vacation;
