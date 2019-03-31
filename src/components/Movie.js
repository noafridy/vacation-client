import React, { Component } from 'react';

class Movie extends Component {

    state= {
        title: this.props.movie.Title,

    }

    handleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

  render() {
    return (
      <div className="movie">
       <input type="text" value={this.state.title} onChange={this.handleChange.bind(this)}></input>
       <img src={this.props.movie.Poster}/>
      </div>
    );
  }
}

export default Movie;
