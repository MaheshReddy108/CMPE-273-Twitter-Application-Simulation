import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { rooturl } from "../_config/settings";

class AddMemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "False",
      msg: "",
      listName: "",
      memberName: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.setState({
      listName: this.props.listName
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
      list_Name: this.state.listName,
      username: this.state.memberName
    };
    console.log("data is............", data);
    axios
      .post(`http://${rooturl}:4500/api/lists/add_a_member`, data)
      .then(response => {
        console.log("response of update is....", response.data);
        this.setState = {
          auth: "True",
          msg: "Successfully Created!"
        };
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    const { listName, memberName } = this.state;
    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
        <div>
          <div className="form-row"></div>
          <div className="form-row form-group">
            <div className="col-md-12 ">
              <label htmlFor="inputMembername">Member name</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="memberName"
                className="form-control"
                id="inputMembername"
                placeholder="Member name"
                defaultValue={memberName}
                required
              />
              <div className="invalid-feedback">Member Name is Required.</div>
            </div>
            <br />
            <br />

            <br />
            <br />
          </div>
          <br />
          <br />

          <div className="form-row">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default AddMemberForm;
