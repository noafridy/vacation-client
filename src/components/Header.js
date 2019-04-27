import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Header extends Component {

    handleLogout = () => {
        document.cookie = "userInfo=null";
        window.location.reload();

    }

    render() {
        return (
            <div className="header">
                {!this.props.userInfo &&
                    <React.Fragment>
                        <img src="/logo.jpg" />
                        <div className="header-links">
                            <Link to="/login">Login</Link>
                            <Link to="/registration">Join</Link>
                        </div>
                    </React.Fragment>
                }
                {this.props.userInfo &&
                    <React.Fragment>

                        <Link to="/"><img src="/logo.jpg" /></Link>
                        <div className="header-links">
                            <span className="username-hello">{`Hello ${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`}</span>
                            <a href="/" onClick={this.handleLogout}>Logout</a> 
                        </div>
                    </React.Fragment>
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {   
    return {
        userInfo: state.userReducer   
    };
};

export default connect(mapStateToProps, null)(Header);