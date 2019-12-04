import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { rooturl } from "../_config/settings";

class MessageTimeline extends Component {
  constructor(props) {
    super(props);
    //maintain the state required for this component
    this.state = {
      followersResult: []
    };
  }
  componentDidMount() {
    var data = {
      username: localStorage.getItem("username")
    };
    axios.defaults.withCredentials = true;
    axios
      .post(`http://${rooturl}:4500/api/users/get_followers`, data)
      .then(response => {
        this.setState({ followersResult: response.data });
      })
      .catch(err => {
        if (err) {
          this.setState({
            errorRedirect: true
          });
        }
      });
  }

  render() {
    let redrirectVar = null;

    if (this.state.errorRedirect === true) {
      redrirectVar = "some error in obtaining followers";
    }

    let followerList = this.state.followersResult.map(function(
      follower,
      index
    ) {
      return (
        <div className="container display-properties-container" key={index}>
          <Link to={"/MessageDisplay/" + follower.follower_name}>
            <div className="follower-content row border">
              <div className="follower-content-desc col-9 hidden-xs">
                <div style={style1}>
                  <h2>
                    <strong>{follower.follower_name}</strong>
                  </h2>
                  {/*<div>{follower.follower_id}</div>*/}
                </div>
              </div>
              <br />
            </div>
            <br />
          </Link>
        </div>
      );
    });

    return (
      <div className="cotainer">
        <div className="property-listing-content">{followerList}</div>
      </div>
    );
  }
}
const style1 = {
  fontFamily: "Gotham Narrow SSm",
  fontSize: 40
};
export default MessageTimeline;
