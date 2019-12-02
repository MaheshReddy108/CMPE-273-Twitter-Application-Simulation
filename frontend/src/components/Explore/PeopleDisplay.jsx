import React, { Component } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import TweetItem from "../Feed/TweetItem";
import { Link } from "react-router-dom";

class PeopleDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_Name: "",
      members: [],
      tweets: []
    };
  }
  componentDidMount() {
    var username = this.props.match.params.username;
    console.log("hii ", username);

    axios
      .post("http://localhost:4500/api/users/get_profile", {
        username
      })
      .then(response => {
        console.log("profile fetched is    ", response.data);
      });
  }
  render() {
    return <div className="feed">hii </div>;
  }
}

export default PeopleDisplay;
