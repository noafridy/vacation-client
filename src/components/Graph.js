import React, { Component } from 'react';
import { connect } from "react-redux";
import { followShowGraph } from "../actions"
import { Link } from "react-router-dom";
import { checkRol } from "../functions";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Graph extends Component {

  componentDidMount() {
    this.props.dispatchFollowGraph();
  }

  render() {
    debugger;
    let data;
    if (this.props.graphPoints.length === 0) {
      data = [];
    } else {
      data = this.props.graphPoints.map(follow => {
        return (
          { name: follow.vacation_id, 'number of followers': follow.followers }
        );
      })
    }


    return (

      <div className="graph page-img">
        <React.Fragment>
          {
            checkRol("admin", this.props.userInfo) &&
            <div className="link-graph">
              <i className="fas fa-angle-double-left"></i>
              <Link className="graph-vaction-link" to="/"> Back To All Vacation</Link>
            </div>
          }
        </React.Fragment>
        {
          checkRol("admin", this.props.userInfo) &&
          <React.Fragment>
            <h3> number of followers by vacation id</h3>
            {(data.length !== 0) && <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 30, right: 30, left: 20, bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis interval={1} />
              <Tooltip />
              <Legend />
              <Bar dataKey="number of followers" fill="#20599a" />
            </BarChart>}

          </React.Fragment>
        }


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    graphPoints: state.followGraphReducer,
    userInfo: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFollowGraph: () => dispatch(followShowGraph())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

