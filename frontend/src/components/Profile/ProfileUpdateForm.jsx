import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { rooturl } from "../_config/settings";

class ProfileUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "False",
      msg: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.setState({
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      description: this.props.description,
      city: this.props.city,
      state: this.props.state,
      zipcode: this.props.zipcode
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      username: localStorage.getItem("username"),
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      description: this.state.description,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode
    };
    //console.log("data is............", data);
    axios
      .post(`http://${rooturl}:4500/api/users/update_profile`, data)
      .then(response => {
        console.log("response of update is....", response.data);
        this.setState = {
          auth: "True",
          msg: "Successfully Updated!"
        };
      })
      .catch(function(error) {
        this.setState = {
          auth: "False",
          msg: "Something went Wrong. Try again later!"
        };
        console.log(error);
      });
  };
  render() {
    const {
      first_name,
      last_name,
      description,
      city,
      state,
      zipcode
    } = this.state;
    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
        <div>
          <div className="form-row"></div>
          <div className="form-row form-group">
            <div className="col-md-6 ">
              <label htmlFor="inputFirstname">First name</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="first_name"
                className="form-control"
                id="inputFirstname"
                placeholder="First name"
                defaultValue={first_name}
                required
              />
              <div className="invalid-feedback">First Name is Required.</div>
            </div>
            <div className="col-md-6 ">
              <label htmlFor="inputLastname">Last name</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="last_name"
                className="form-control"
                id="inputLastname"
                placeholder="Last name"
                defaultValue={last_name}
                required
              />
              <div className="invalid-feedback">Last Name is Required.</div>
            </div>
            <br />
            <br />
            <div className="col-md-12 ">
              <label htmlFor="inputDescription">Description</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="description"
                className="form-control"
                id="inputDescription"
                placeholder="Description"
                defaultValue={description}
                required
              />
              <div className="invalid-feedback">Description is Required.</div>
            </div>
            <br />
            <br />
            <div className="col-md-4">
              <label htmlFor="inputCity">City</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="city"
                className="form-control"
                id="inputCity"
                placeholder="City"
                defaultValue={city}
                required
              />
              <div className="invalid-feedback">City is Required.</div>
            </div>
            <div className="col-md-4 ">
              <label htmlFor="inputState">State</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="state"
                className="form-control"
                id="inputState"
                placeholder="State"
                defaultValue={state}
                required
              />
              <div className="invalid-feedback">State is Required.</div>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputZipCode">ZipCode</label>
              <input
                onChange={this.handleChange}
                type="text"
                // pattern='/(^\d{5}$)|(^\d{5}-\d{4}$)/'
                name="zipcode"
                className="form-control"
                id="inputZipCode"
                placeholder="ZipCode"
                defaultValue={zipcode}
                required
              />
              <div className="invalid-feedback">ZipCode is Required.</div>
            </div>
          </div>

          <div className="form-row">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <div> {this.state.msg} </div>
          </div>
        </div>
      </form>
    );
  }
}
export default ProfileUpdateForm;
