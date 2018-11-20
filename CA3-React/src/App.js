import React, { Component } from "react"
import { HashRouter as Router, Route, NavLink } from "react-router-dom"
import Welcome from "./components/Welcome";
import User from "./components/User";
import Admin from "./components/Admin";
import SWAPI from "./components/swapi";
import LargeDataSet from "./components/LargeDataSet";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {roles: [], username: "Username", loggedIn: false}
  }
  setname = (username) => {
    this.setState({username});
  }
  changeLoggedIn = () => {
    this.setState({loggedIn: !this.state.loggedIn});
  }
  setroles = (roles) => {
    this.setState({roles});
  }
  render() {
    return (
      <Router>
        <div>
          <ul className="header">
            <li>{(this.state.loggedIn)?this.state.username:''}</li>
            <li> <NavLink exact to="/">Home</NavLink> </li>
            <li> <NavLink to="/swapi">SWAPI</NavLink> </li>
            <li> <NavLink to="/large-data-set">Large Data Set</NavLink> </li>
            {(this.state.loggedIn && this.state.roles.includes('user')) ? <li> <NavLink to="/user">User</NavLink> </li> : ''}
            {(this.state.loggedIn && this.state.roles.includes('admin')) ? <li> <NavLink to="/admin">Admin</NavLink> </li> : ''}
          </ul>
          <hr />
          <Route exact path="/" render={() => <Welcome roles={this.state.roles} setroles={this.setroles} setname={this.setname} loggedIn={this.state.loggedIn} changeLoggedIn={this.changeLoggedIn} />} />
          <Route path="/user"  render={() => <User username={this.state.username} roles={this.state.roles} />} />
          <Route path="/admin" render={() => <Admin username={this.state.username} roles={this.state.roles} />} />
          <Route path="/swapi" component={SWAPI} />
          <Route path="/large-data-set" component={LargeDataSet} />
        </div>
      </Router>
    );
  }
}
