import React, { Component } from 'react';
import { addVacation } from "../actions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class AddVacation extends Component {
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  uploadFileToServer(event) {
    const that = this;
    var file = Array.from(event.target.files)[0];
    // console.log(file);
    var reader = new FileReader();

    reader.onload = function () {
      const img = btoa(reader.result); // conversion to base64
      // console.log(img);
      that.setState({ img });
    };
    reader.onerror = function () {
      console.log('there are some problems');
    };
    reader.readAsBinaryString(file); //read file in binary format
  }

  addVactionToDB() {
    // let obj = { ...this.state };  //... its for only copy and not pointer!
    // obj.fromDate = (new Date(obj.fromDate)).toISOString();
    // obj.toDate = (new Date(obj.toDate)).toISOString();
    //  obj.fromDate = obj.fromDate.slice(0,10);
    //  obj.toDate = obj.toDate.slice(0,10);

    this.props.dispatchInsertVacation(this.state);

    alert("The vacation was updated on the system")
   // debugger
  }

  render() {
    return (
      <div className="addVacation">

        <form className="Registration-form">
          <h4>Insert vacation</h4><br />
          <div className="form-group">
            <input name="destination" onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Please insert destination" />
          </div>
          <div className="form-group">
            <input name="description" onChange={this.handleChange.bind(this)} type="text" className="form-control" placeholder="Please insert description" />
          </div>
          <div className="form-group">
            <input name="price" onChange={this.handleChange.bind(this)} type="number" className="form-control" placeholder="Please insert price" />
          </div>
          <div className="form-group">
            <label >Please insert img</label>
            <input name="img" onChange={this.uploadFileToServer.bind(this)} type='file' accept="image/*" className="form-control-file" />
            {(this.state && this.state.base64IFile !== null) && <img src={`data:image/png;base64, ${this.state.img}`} alt="image for upload" />}
          </div>

          <div className="form-group">
            <label >Please insert start date</label>
            <input name="fromDate" onChange={this.handleChange.bind(this)} type="date" className="form-control" />
          </div>
          <div className="form-group">
            <label >Please insert end date</label>
            <input name="toDate" onChange={this.handleChange.bind(this)} type="date" className="form-control" />
          </div>

          <button type="button" className="btn btn-primary" onClick={this.addVactionToDB.bind(this)}>Save</button> 
          
          <Link className="all-vacation-link" to="/"> Back to all vacation</Link>
        </form>

      
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {     //update the reducer - actions
  return {
    dispatchInsertVacation: async (data) => dispatch(await addVacation(data))  //the action is async and becouse that dispatchSearchMovie (the function) need to be also async 
  }
};

// const allvacation1 = connect(mapStateToProps, null)(AllVacations);   //null becouse we dont have action in this compn (mapDispatchToProps)
export default connect(null, mapDispatchToProps)(AddVacation);

