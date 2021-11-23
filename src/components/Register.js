import { Alert } from "bootstrap";
import React from "react";
import "../App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      captcha: "",
    };
  }

  componentDidMount() {
    loadCaptchaEnginge(6);
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

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onChangeCaptcha = (e) => {
    this.setState({ captcha: e.target.value });
  };

  onSubmit = (e) => {
    let ob = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
    };
    if (this.state.captcha) {
      if (!validateCaptcha(this.state.captcha)) {
        this.setState({ captcha: "" });
        alert("Captcha did not match!");
        return;
      }
    }
    let olddata = localStorage.getItem("formdata");
    if (olddata == null) {
      olddata = [];
      olddata.push(ob);
      localStorage.setItem("formdata", JSON.stringify(olddata));
      localStorage.setItem("isAuthenticated", true);
      this.props.history.push({ pathname: "/dashboard" });
      window.location.reload(false);
      alert("User registered successfully");
    } else {
      let oldArr = JSON.parse(olddata);
      oldArr.push(ob);
      localStorage.setItem("formdata", JSON.stringify(oldArr));
      console.log(oldArr, "hhg");
    }
  };

  render() {
    return (
      <div className="container loginDiv col-md-6 col-lg-4 col-sm-6">
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group d-flex">
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              placeholder="Name"
              onChange={this.onChangeName}
              required
            />
            <span className="required">*</span>
          </div>
          <div className="form-group d-flex">
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              placeholder="Email"
              onChange={this.onChangeEmail}
              required
            />
            <span className="required">*</span>
          </div>
          <div className="form-group d-flex">
            <input
              type="tel"
              className="form-control"
              value={this.state.phone}
              placeholder="Phone"
              onChange={this.onChangePhone}
            />
            <span className="required" style={{ visibility: "hidden" }}>
              *
            </span>
          </div>
          <div className="form-group d-flex">
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              placeholder="Password"
              onChange={this.onChangePassword}
              required
            />
            <span className="required">*</span>
          </div>
          <div className="form-group d-flex">
            <input
              type="text"
              className="form-control"
              value={this.state.captcha}
              placeholder="Captcha"
              onChange={this.onChangeCaptcha}
              required
            />
            <LoadCanvasTemplate />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.props.onRegister}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
