
import React, { Component } from 'react';
import { connect } from "react-redux";
import { followShowGraph } from "../actions"
import { Link } from "react-router-dom";
import {checkRol} from "../functions";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Graph extends Component {

  componentDidMount() {
    this.props.dispatchFollowGraph();
  }

  // checkRol(rol) {
  //   return ((this.props.userInfo) && (this.props.userInfo.rol === rol))
  // }

  render() {
    
    let data = this.props.graphPoints.map(follow => {
      return (
        { name: follow.vacation_id, 'number of followers': follow.followers }
      );
    })

    return (

      <div className="graph">
        <React.Fragment>
          {
            checkRol("admin",this.props.userInfo) &&
            <div className="link-graph">
             <i class="fas fa-angle-double-left"></i>
              <Link className="graph-vaction-link" to="/"> Back To All Vacation</Link>
            </div>
          }
        </React.Fragment>
        {
         checkRol("admin",this.props.userInfo) &&
          <React.Fragment>
            <h3> number of followers by vacation id</h3>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis interval={1} />
              <Tooltip />
              <Legend />
              <Bar dataKey="number of followers" fill="#20599a" />
            </BarChart>

          </React.Fragment>
        }


      </div>
    );
  }
}

const mapStateToProps = (state) => {   //mapStateToProps בסטייט יש את הנקודות שנרצה לשים על הגרף
  return {
    graphPoints: state.followGraphReducer,
    userInfo: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {     //mapDispatchToProps כדי לקבל את האניפורמציה לבנית הגרף מהנק קצה
  return {
    dispatchFollowGraph:() => dispatch(followShowGraph())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

