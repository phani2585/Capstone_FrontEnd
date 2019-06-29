import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import Profile from "./profile/Profile";

/**
 * Class component for controller
 * @class Controller
 * @extends {Component}
 */
class Controller extends Component {
  //baseUrl = "https:/localhost:8080/api";

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route
            path="/"
            render={props => <Home {...props} baseUrl={this.baseUrl} />}
          />
          <Route
            path="/login"
            render={props => <Login {...props} baseUrl={this.baseUrl} />}
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