
import React, { Component } from 'react';
import { Link } from "react-router-dom";  //that i can use in router
import { connect } from "react-redux";
import userReducer from '../reducers/user';
class Header extends Component {

    handleLogout = () => {
        document.cookie = "userInfo=null";
        window.location.reload();

    }

    render() {
        return (
            <div className="header">
                {/* דרך נוספת ל איף */}
                {!this.props.userInfo && 
                    <React.Fragment>  {/* יוצר דיו עוטף בלי המילה דיו */}
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
                            <a href="/" onClick={this.handleLogout}>Logout</a>  {/* !# סימן מוסכם שלא משנה כתובת */}
                        </div>
                </React.Fragment>
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {   //mapStateToProps is connect to the store
    return {
        userInfo: state.userReducer   // get the user information - needed to know if user is logged in
    };
};

export default connect(mapStateToProps, null)(Header);