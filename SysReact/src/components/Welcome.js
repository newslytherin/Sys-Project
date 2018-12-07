import React, { Component } from "react";
import facade from "./../data/apiFacade";
//import { Route, Redirect, NavLink } from "react-router";
import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      userinfo: { roles: props.roles },
      signUp: false,
      validation: "",
      redirect: ""
    };
  }
  logout = () => {
    facade.logout();
    this.props.changeLoggedIn();
    this.setState({ loggedIn: !this.state.loggedIn });
    this.props.setname("");
  };
  login = async (user, pass) => {
    try {
      let userinfo = await facade.login(user, pass);
      this.setState({ userinfo, validation: "" });
      this.props.changeLoggedIn();
      this.props.setname(user);

      this.setState({ redirect: <Redirect to="/" /> });
    } catch (err) {
      console.log("err:: " + err);
      this.setState({ validation: "invalid username or password" });
    }
  };
  render() {
    return (
      <div>
        <LogIn
          login={this.login}
          validation={this.state.validation}
          redirect={this.state.redirect}
        />
      </div>
    );
  }
}

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  login = evt => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };
  render() {
    return (
      <div>
        {this.props.redirect}
        <h2>Login</h2>
        <hr />
        <p style={{ color: "#ff0000" }}>{this.props.validation}</p>
        <form onSubmit={this.login} onChange={this.onChange} className="grid">
          <div className="input-container w50">
            <label style={{ display: "block" }}>{`${"Username"}:`}</label>
            <input type="text" id="username" />
          </div>
          <div className="input-container w50">
            <label style={{ display: "block" }}>{`${"Password"}:`}</label>
            <input type="password" id="password" />
          </div>
          <div className="input-container w100">
            <button className="center">Sign in</button>
          </div>
        </form>
        <br />

        <NavLink to="/signup">
          Dont have an account? Click here to sign up!
        </NavLink>
      </div>
    );
  }
}
