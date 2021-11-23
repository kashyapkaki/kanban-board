import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";
import Welcome from "../components/Welcome";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      error: "",
    };
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangePhone = (e) => {
    this.setState({ phone: e.target.value });
  };

  onSubmit = (e) => {
    let { history } = this.props;
    let ele;
    e.preventDefault();
    let olddata = localStorage.getItem("formdata");
    let oldArr = JSON.parse(olddata);
    if (oldArr) {
      oldArr.map((arr) => {
        if (this.state.email.length > 0 && this.state.password.length > 0) {
          if (
            arr.email == this.state.email &&
            arr.password == this.state.password
          ) {
            localStorage.setItem("isAuthenticated", true);
            history.push({ pathname: "/dashboard", user: arr.name });
            window.location.reload(false);
          } else {
            this.setState({ error: "Please check your email or password" });
          }
        }
      });
    } else {
      this.setState({ error: "User not registered" });
    }
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="container loginDiv col-md-6 col-lg-4 col-sm-6">
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <p className="error">{this.state.error}</p>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              placeholder="Email Address"
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              placeholder="Password"
              onChange={this.onChangePassword}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.props.onLogin}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
