import React, { Component } from 'react';
import { addVacation } from "../actions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class AddVacation extends Component {

  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
  }

  state = {
    destination: "",
    description: "",
    price: "",
    img:"",
    fromDate: "",
    toDate: ""
  }

  checkRol(rol) {
    return ((this.props.userInfo) && (this.props.userInfo.rol === rol))
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  saveAsBase64(event) {
    const that = this;
    const target = event.target;
    var file = Array.from(target.files)[0];
    var reader = new FileReader();
    reader.onload = function () {
      const img = btoa(reader.result); // conversion to base64
      that.setState({ img });
    };
    reader.onerror = function () {
      console.log('there are some problems');
    };
    reader.readAsBinaryString(file); //read file in binary format
  }

  mandatoryFieldChecks() {
    if (!this.state.destination) {
      window.alert("Plese insert destination");
    }
    else if (!this.state.description) {
      window.alert("Plese insert description");
    }
    else if (!this.state.price) {
      window.alert("Plese insert price");
    } else if (!this.state.img) {
      window.alert("Plese insert img");
    } else if (!this.state.fromDate) {
      window.alert("Plese insert fromDate");
    } else if (!this.state.toDate) {
      window.alert("Plese insert toDate");
    } else {
      // this.props.addVactionToDB(this.state);

      //addVactionToDB
      const backup = {...this.state};
      this.props.dispatchInsertVacation(backup);

      this.setState({
        destination: "",
        description: "",
        price: "",
        img: "",
        fromDate: "",
        toDate: ""
      })

      // clear the file in the file input
      this.fileUpload.current.value = null
    }
  }

  // addVactionToDB() {
  //   const stateBackUp = {...this.state} ;
  //   this.props.dispatchInsertVacation(stateBackUp);
  //   // alert("The vacation was updated on the system")
  //   this.setState({
  //     destination:"",
  //     description:"",
  //     price:"",
  //     img:"",
  //     fromDate:"",
  //     toDate:""
  //   })
  // }

  render() {
    return (
      <div className="addVacation">
        {this.checkRol("admin") &&
          <form className="Registration-form">
            <h4>Insert vacation</h4><br />
            <div className="form-group">
              <input name="destination" value={this.state.destination} onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Please insert destination" />
            </div>
            <div className="form-group">
              <input name="description" value={this.state.description} onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Please insert description" />
            </div>
            <div className="form-group">
              <input name="price" value={this.state.price} onChange={this.handleChange.bind(this)} type="number" className="form-control" placeholder="Please insert price" />
            </div>
            <div className="form-group">
              <label >Please insert img</label>
              <input name="img" ref={this.fileUpload} onChange={this.saveAsBase64.bind(this)} type='file' accept="image/*" className="form-control-file" />
              {(this.state && this.state.base64IFile !== null) && <img src={`data:image/png;base64, ${this.state.img}`} alt="image for upload" />}
            </div>

            <div className="form-group">
              <label >Please insert start date</label>
              <input name="fromDate" value={this.state.fromDate} onChange={this.handleChange.bind(this)} type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label >Please insert end date</label>
              <input name="toDate" value={this.state.toDate} onChange={this.handleChange.bind(this)} type="date" className="form-control" />
            </div>

            <button type="button" className="btn btn-primary" onClick={this.mandatoryFieldChecks.bind(this)}>Save</button>

            <Link className="all-vacation-link" to="/"> Back to all vacation</Link>
          </form>

        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {   //mapStateToProps is connect to the store
  return {
    userInfo: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {     //update the reducer - actions
  return {
    dispatchInsertVacation: (data) => dispatch(addVacation(data))  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 

  }
};

// const allvacation1 = connect(mapStateToProps, null)(AllVacations);   //null becouse we dont have action in this compn (mapDispatchToProps)
export default connect(mapStateToProps, mapDispatchToProps)(AddVacation);

