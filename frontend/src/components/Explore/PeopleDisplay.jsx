import React, { Component } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import PeopleProfileCard from "./PeopleProfileCard";
import PeopleNavbar from "./PeopleNavbar";

class PeopleDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      display_id: ""
    };
  }
  componentDidMount() {
    var username = this.props.match.params.username;
    //const { display_id } = this.props.location.state;
    //console.log("the id of this user clicked is.....", display_id);
    //this.setState({ username: username, display_id: display_id });
  }
  render() {
    let redirectVar = null;
    if (localStorage.getItem("jwtToken") == null) {
      redirectVar = <Redirect to="/" />;
    }
    let username = this.props.match.params.username;
    let display_id = this.props.location.state;
    return (
      <div className="container">
        {redirectVar}
        <Link to="/welcomePage" className="btn btn-light mb-3">
          Back To Feed
        </Link>
        <br />
        <PeopleProfileCard data={username} />
        <br />
        <PeopleNavbar data={username} data1={display_id} />
      </div>
    );
  }
}

export default PeopleDisplay;
