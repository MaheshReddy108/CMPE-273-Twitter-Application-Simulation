import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classnames from "classnames";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      isLogin: false,
      signup: false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("jwtToken") != null) {
      this.setState({
        isLogin: true
      });
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    //console.log("changes");
    // console.log("new value ", e.target.value);
  }
  handleClick(event) {
    console.log("inside handleclick");
    //console.log("event is..", event);
    var url = "http://localhost:4500/api/users/register";
    var data = {
      username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };
    console.log("data is..", data);
    axios
      .post(url, data)
      .then(res => {
        console.log("response is.....", res.data);
        this.setState({ signup: true });
      })
      .catch(err => {
        console.log("its an error.....", err);
        this.setState({ errors: err.response.data });
        console.log("errors are......", this.state.errors);
      });
  }
  render() {
    const { errors } = this.state;
    let signup = this.state.signup;
    let isLogin = this.state.isLogin;
    let redirect = null;
    if (isLogin == true) {
      redirect = <Redirect to="/welcomePage" />;
    } else {
      if (signup == true) {
        redirect = <Redirect to="/login" />;
      }
    }

    return (
      <div>
        {redirect}
        <table>
          <tbody>
            <tr>
              <td>
                <img
                  src={require("./twitter.png")}
                  width={770}
                  className="rounded"
                  alt="avatar"
                />
              </td>

              <td width="33%">
                <Form>
                  <Form.Group controlId="username">
                    <Form.Label style={style1}>Username</Form.Label>
                    <Form.Control
                      type="text"
                      className={classnames({
                        "is-invalid": errors.username
                      })}
                      placeholder="Enter Username"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="first_name">
                    <Form.Label style={style1}>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      className={classnames({
                        "is-invalid": errors.first_name
                      })}
                      placeholder="Enter your First name"
                      name="first_name"
                      value={this.state.first_name}
                      onChange={this.handleChange}
                    />
                    {errors.first_name && (
                      <div className="invalid-feedback">
                        {errors.first_name}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="last_name">
                    <Form.Label style={style1}>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      className={classnames({
                        "is-invalid": errors.last_name
                      })}
                      placeholder="Enter your Last name"
                      name="last_name"
                      value={this.state.last_name}
                      onChange={this.handleChange}
                    />
                    {errors.last_name && (
                      <div className="invalid-feedback">{errors.last_name}</div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label style={style1}>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      className={classnames({ "is-invalid": errors.email })}
                      placeholder="Enter email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label style={style1}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      className={classnames({
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </Form.Group>
                  <br></br>

                  <Button
                    style={style2}
                    onClick={event => this.handleClick(event)}
                  >
                    Submit
                  </Button>
                </Form>
                <br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
var style1 = {
  fontSize: 20,
  fontFamily: "Gotham Narrow SSm"
};
const style2 = {
  backgroundColor: "#00acee",
  color: "white",
  fontSize: 20,
  fontFamily: "Gotham Narrow SSm",
  paddingLeft: 170,
  paddingRight: 170,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 100
};

/*let mapStateToProps = state => ({
  auth: state.auth
});*/

export default Register;
