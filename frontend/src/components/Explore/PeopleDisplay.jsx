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
      username: ""
    };
  }
  componentDidMount() {
    var username = this.props.match.params.username;
    this.setState({ username: username });
  }
  render() {
    let redirectVar = null;
    if (localStorage.getItem("jwtToken") == null) {
      redirectVar = <Redirect to="/" />;
    }
    let username = this.props.match.params.username;
    return (
      <div className="container">
        {redirectVar}
        <Link to="/welcomePage" className="btn btn-light mb-3">
          Back To Feed
        </Link>
        <br />
        <PeopleProfileCard data={username} />
        <br />
        <PeopleNavbar data={username} />
      </div>
    );
  }
}

export default PeopleDisplay;
