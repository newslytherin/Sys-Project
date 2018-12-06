import React from "react";
import { TextField, PasswordField, EmailField } from "./InputFields";
import facade from "../data/apiFacade";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loggedIn: false,
      invalidEmail: "",
      invalidPassword: ""
    };
  }

  inputChanged = evt => {
    const property = evt.target.id;
    const value = evt.target.value;
    const user = this.state.user;
    user[property] = value;
    this.setState({ user });
    console.log(this.state.user);
  };

  send = () => {
    this.state.user.userPass === this.state.user.confirmPassword
      ? this.validPassword()
      : this.invalidPassword();
  };

  validateEmail = response => {
    response.ok
      ? this.setState({ invalidEmail: "" })
      : this.setState({ invalidEmail: "email is already used" });
  };

  validatePassword = () => {};

  validPassword = async () => {
    this.setState({ invalidPassword: "", invalidEmail: "" });
    const user = this.state.user;
    user.confirmPassword = "";
    this.setState({ user });
    delete user.confirmPassword;
    try {
      const logUser = await facade.signup(user);
      await this.setState({ user: logUser, loggedIn: true, invalidEmail: "" });
    } catch (err) {
      console.log("err:: " + err);
      this.setState({ invalidEmail: "email is already used" });
    }
  };

  invalidPassword = () => {
    console.log("wrong pass");
    this.setState({ invalidPassword: "unmatching passwords" });
    const user = this.state.user;
    user.confirmPassword = "";
    this.setState({ user });
  };

  render = () => {
    if (this.state.loggedIn)
      return (
        <div style={{ fontSize: 24, textAlign: "center" }}>{`welcome ${
          this.state.user.userName
        }`}</div>
      );
    return (
      <>
        <h2>create profile</h2>
        <hr />
        <form onSubmit={this.send} className="grid">
          <TextField
            title="name"
            id="userName"
            value={this.state.user.name}
            onChanged={this.inputChanged}
          />

          <p style={{ fontSIze: 18, color: "#ff0000" }}>
            {this.state.invalidEmail}
          </p>
          <EmailField
            title="email"
            id="email"
            value={this.state.user.email}
            onChanged={this.inputChanged}
          />

          <TextField
            title="gender"
            id="gender"
            value={this.state.user.gender}
            onChanged={this.inputChanged}
          />

          <PasswordField
            title="password"
            id="userPass"
            value={this.state.user.password}
            onChanged={this.inputChanged}
          />

          <p style={{ fontSIze: 18, color: "#ff0000" }}>
            {this.state.invalidPassword}
          </p>
          <PasswordField
            title="confirm password"
            id="confirmPassword"
            value={this.state.user.confirmPassword}
            onChanged={this.inputChanged}
          />
          <button class="center">create</button>
        </form>
      </>
    );
  };
}
