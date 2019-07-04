import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";
import Details from "../screens/details/Details";
//import Checkout from "../screens/checkout/Checkout";

/**
 * Class component for controller
 * @class Controller
 * @extends {Component}
 */
class Controller extends Component {
  constructor() {
    super();
    this.state = {
        loggedIn: sessionStorage.getItem("access-token") == null ? false : true
    }
    this.baseUrl = "http://localhost:8080/api";
}
  render() {
    return (
      <Router>
        <div className="main-container">
          <Route
            exact
            path="/"
            render={props => <Home {...props} baseUrl={this.baseUrl} />}
          />
          <Route
            path="/restaurant/:id"
            render={props => <Details {...props} baseUrl={this.baseUrl} />}
          />
          <Route
            path="/checkout"
            render={props =>this.state.loggedIn ? (<Redirect to='/' />) : (<Redirect to='/' />)} 
          />
          <Route
            path="/profile"
            render={props => <Profile {...props} baseUrl={this.baseUrl} />}
          />  
        </div>
      </Router>
    );
  }
}

export default Controller;