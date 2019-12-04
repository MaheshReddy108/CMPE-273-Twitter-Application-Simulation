import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { rooturl } from "../_config/settings";

class CreateListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "False",
      msg: "",
      l_Name: "",
      l_Desc: "",
      ownerID: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.setState({
      l_Name: this.props.l_Name,
      l_Desc: this.props.l_Desc,
      ownerID: localStorage.getItem("user_id")
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
      ownerID: this.state.ownerID,
      l_Name: this.state.l_Name,
      l_Desc: this.state.l_Desc
    };
    //console.log("data is............", data);
    axios
      .post(`http://${rooturl}:4500/api/lists/create`, data)
      .then(response => {
        console.log("response of update is....", response.data);
        this.setState = {
          auth: "True",
          msg: "Successfully Created!"
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
    const { l_Desc, l_Name } = this.state;
    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
        <div>
          <div className="form-row"></div>
          <div className="form-row form-group">
            <div className="col-md-12 ">
              <label htmlFor="inputFirstname">List name</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="l_Name"
                className="form-control"
                id="inputListname"
                placeholder="List name"
                defaultValue={l_Name}
                required
              />
              <div className="invalid-feedback">List Name is Required.</div>
            </div>
            <br />
            <br />
            <div className="col-md-12 ">
              <label htmlFor="inputListDesc">List Description</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="l_Desc"
                className="form-control"
                id="inputListDesc"
                placeholder="List Description"
                defaultValue={l_Desc}
                required
              />
              <div className="invalid-feedback">
                List Description is Required.
              </div>
            </div>
            <br />
            <br />

            <div className="invalid-feedback">Description is Required.</div>
          </div>
          <br />
          <br />

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
export default CreateListForm;
