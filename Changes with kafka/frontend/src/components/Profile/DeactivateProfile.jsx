import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { rooturl } from "../_config/settings";

class DeactivateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "False",
      msg: "",
      username: localStorage.getItem("username")
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    console.log("component will mount of deactivate profile");
    this.setState({
      username: this.props.username
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("handlesubmit of deactivate profile");
    const data = {
      username: localStorage.getItem("username")
    };
    //console.log("data is............", data);
    axios
      .post(`http://${rooturl}:4500/api/users/deactivate`, data)
      .then(response => {
        console.log("response of update is....", response.data);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        /* this.setState = {
          auth: "True",
          msg: "Successfully Updated!"
        };*/
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    const { username } = this.state;
    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
        <div>
          <div className="form-row"></div>
          <div className="form-row form-group">
            <div className="col-md-6 ">
              <label>
                Hey {username}! Click button if you want to deactivate your
                account.
              </label>
            </div>
          </div>
        </div>

        <div className="form-row">
          <button type="submit" className="btn btn-primary">
            Deactivate
          </button>
        </div>
      </form>
    );
  }
}
export default DeactivateProfile;
