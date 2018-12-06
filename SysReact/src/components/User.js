import React, { Component } from "react";
import facade from "./../data/apiFacade";
import OrderTable from "./OrderTable";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: facade.getName(),
        email: facade.getEmail(),
        gender: facade.getGender()
      },
      orders: [],
      loadingOrders: true,
      updateTable: false
    };
    this.getOrders();
  }

  getOrders = async () => {
    const orders = await facade.getUserOrders();
    await this.setState({ orders, loadingOrders: false });
    console.log(this.state.orders);
  };

  updateTable = () => {
    this.getOrders();
    console.log("TEST::");
  };

  render() {
    if (facade.loggedIn()) {
      return (
        <div className="main">
          <h2>My Profile</h2>
          <hr />

          <div className="grid">
            <div className="info-container w20">
              <i className="fas fa-user" />
              <p className="desc">First Name</p>
              <p className="info">{facade.getName()}</p>
            </div>
            <div className="info-container w20">
              <i className="fas fa-at" />
              <p className="desc">E-mail</p>
              <p className="info">{facade.getEmail()}</p>
            </div>
            <div className="info-container w20">
              <i className="fas fa-transgender-alt" />
              <p className="desc">Gender</p>
              <p className="info">{facade.getGender()}</p>
            </div>
            <div className="info-container w20">
              <i className="fas fa-globe" />
              <p className="desc">Country</p>
              <p className="info">Denmark</p>
            </div>
            <div className="info-container w20">
              <i className="fas fa-pencil-ruler" />
              <p className="desc">Role</p>
              <p className="info">{facade.getRole()}</p>
            </div>
          </div>
          <hr />
          <div className="grid">
            <div className="info-container w100">
              <i className="fas fa-hand-holding-usd" />
              <p className="bigtext">Order history</p>
            </div>

            <OrderTable />
          </div>
          {/* <form onSubmit={this.send}>
              <label>Username</label>
              <input
                id="name"
                type="text"
                value={this.state.user.name}
                onChange={this.inputChanged}
              />
              <hr />
              <label>Email</label>
              <input
                id="email"
                type="text"
                value={this.state.user.email}
                onChange={this.inputChanged}
              />
              <hr />
              <label>Gender</label>
              <input
                id="gender"
                type="text"
                value={this.state.user.gender}
                onChange={this.inputChanged}
              />
              <hr />
              <button>Save changes</button>
            </form> */}
        </div>
      );
    } else {
      return <h1>You need to be logged in</h1>;
    }
  }

  send = e => {
    e.preventDefault();
    console.log("IS WORKING!!!!!!!!!!!!");
    console.log(this.state.user);
    sessionStorage.setItem("name", this.state.user.name);
    sessionStorage.setItem("email", this.state.user.email);
    sessionStorage.setItem("gender", this.state.user.gender);
    facade.editUser(this.state.user, facade.getId());
  };

  inputChanged = e => {
    const property = e.target.id;
    const value = e.target.value;
    const user = this.state.user;
    user[property] = value;
    this.setState({ user });
    console.log(this.state.user);
  };
}
