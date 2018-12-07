import React, { Component, useEffect, useState } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import Welcome from "./components/Welcome";
import User from "./components/User";
import Admin from "./components/Admin";
import SWAPI from "./components/swapi";
import LargeDataSet from "./components/LargeDataSet";
import EditTrip from "./components/EditTrip";
import AddFlight from "./components/MakeFlight";
import FlightsTable from "./components/FlightsTable";
import facade from "./data/apiFacade";
import Signup from "./components/AddUser";
import Home from "./components/Home";
import logo from "./img/logo.png";
import editFlightTable from './components/EditFlightTable'

function Header(props) {
  //console.log(props);

  //   const parts = window.location.href.split("/");
  //   const page = parts[parts.length - 1];

  const isHomePage =
    window.location.href.charAt(window.location.href.length - 1) === "/";

  return (
    <header className={isHomePage && "trans"}>
      <div className="header-width-container">
        <img className="logo" src={logo} alt="NDJS logo" />
        <nav>
          <NavLink exact to="/" className="navlink">
            Home
          </NavLink>
          <NavLink to="/flights" className="navlink">
            show flights
          </NavLink>

          {facade.getRole() && facade.getRole().includes("admin") && (
            <>
            <NavLink to="/add" className="navlink">
              add flight
            </NavLink>
            <NavLink to="/editTable" className="navlink">
              edit flights
            </NavLink>
            </>
          )}

          {!facade.loggedIn() && (
            <>
              <NavLink to="/login" className="button">
                login
              </NavLink>
              <NavLink to="/signup" className="button grey">
                signup
              </NavLink>
            </>
          )}
          {facade.loggedIn() && (
            <>
              <NavLink to="/user" className="button">
                profile
              </NavLink>
              <NavLink to="/" className="button" onClick={facade.logout}>
                sign out
              </NavLink>
            </>
          )}

          {/* <button className="trans button">
            language
            <i className="fas fa-caret-right" />
          </button> */}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const isHomePage =
    window.location.href.charAt(window.location.href.length - 1) === "/";

  if (isHomePage) {
    return (
      <footer>
        <div className="container">
          <div className="box">
            <form>
              <h4>Get Connected</h4>
              <div className="grid">
                <div className="input-container w50">
                  <label htmlFor="fname">Your name</label>
                  <input type="text" name="fname" id="fname" />
                </div>
                <div className="input-container w50">
                  <label htmlFor="femail">Your e-mail</label>
                  <input type="text" name="femail" id="femail" />
                </div>
                <div className="input-container w50">
                  <label htmlFor="fservice">service</label>
                  <input type="text" name="fservice" id="fservice" />
                </div>
                <div className="input-container w50">
                  <label htmlFor="fphone">Your phone number</label>
                  <input type="text" name="fphone" id="fphone" />
                </div>
                <div className="input-container w100">
                  <label htmlFor="fmessage">Your message</label>
                  <textarea type="text" name="fmessage" id="fmessage" />
                </div>
              </div>
              <button>send mail</button>
            </form>
          </div>
          <div className="box">
            <h5>Address</h5>
            <p>Nørgaardsvej 30, Lyngby, Danmark</p>
            <h5>E-mail</h5>
            <p>contact@ndjs.dk</p>
            <h5>Telephone</h5>
            <p>(+45) 2785 5747</p>
          </div>
        </div>
      </footer>
    );
  } else {
    return (
      <footer>
        <div className="container">
          <div className="box-long">
            <div className="block">
              <h5>Address</h5>
              <p>Nørgaardsvej 30, Lyngby, Danmark</p>
            </div>
            <div className="block">
              <h5>E-mail</h5>
              <p>contact@ndjs.dk</p>
            </div>
            <div className="block">
              <h5>Telephone</h5>
              <p>(+45) 2785 5747</p>
            </div>
          </div>
        </div>
        <div className="container">
          <p className="cr">Copyright C 203-208 NDJS all righs reserved.</p>
        </div>
      </footer>
    );
  }
}
//   return (
//     <ul className="header">
//       <li>
//         <NavLink exact to="/" className="navlink">
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/flights">show flights</NavLink>
//       </li>
//       <li>
//         <NavLink to="/add">add flight</NavLink>
//       </li>
//       <li>
//         <NavLink to="/edit">edit flight</NavLink>
//       </li>
//       {loggedIn && roles.includes("user") ? (
//         <li>
//           <NavLink to="/user">User</NavLink>
//         </li>
//       ) : (
//         ""
//       )}
//       {loggedIn && roles.includes("admin") ? (
//         <li>
//           <NavLink to="/admin">Admin</NavLink>
//         </li>
//       ) : (
//         ""
//       )}
//     </ul>
//   );

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "Username", loggedIn: false };
  }
  setname = username => {
    this.setState({ username });
  };
  changeLoggedIn = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
  };
  render() {
    console.log(facade.getRole());
    console.log(this.state);
    return (
      <Router>
        <>
          <Header />

          <Route
            exact
            path="/"
            render={() => <Home user={this.state.username} />}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <div className="main">
                <Welcome
                  roles={this.state.roles}
                  setname={this.setname}
                  loggedIn={this.state.loggedIn}
                  changeLoggedIn={this.changeLoggedIn}
                />
              </div>
            )}
          />
          <Route
            path="/user"
            render={() => (
              <User username={this.state.username} roles={facade.getRole()} />
            )}
          />
          <Route
            path="/admin"
            render={() => (
              <Admin username={this.state.username} roles={facade.getRole()} />
            )}
          />
          <Route path="/editTable/" component={editFlightTable} />
          <Route path="/swapi" component={SWAPI} />
          <Route path="/large-data-set" component={LargeDataSet} />
          <Route path="/edit" component={EditTrip} />
          <Route path="/add" component={AddFlight} />
          <Route path="/flights" component={FlightsTable} />
          <Route
            path="/signup"
            render={() => (
              <div className="main">
                <Signup
                  roles={this.state.roles}
                  setname={this.setname}
                  changeLoggedIn={this.changeLoggedIn}
                />
              </div>
            )}
          />
          <Footer />
        </>
      </Router>
    );
  }
}
