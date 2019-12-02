import React, { Component } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { rooturl } from "../_config/settings";

class PeopleProfileCard extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      create_date: "",
      follower_count: "",
      following_count: "",
      tweet_count: "",
      avatar: "",
      description: "",
      city: "",
      state: "",
      zipcode: ""
    };
  }

  componentDidMount() {
    var username = this.props.data;
    console.log(
      "inside component did mount of profile peoplr card.. hii ",
      username
    );

    axios
      .post(`http://${rooturl}:4500/api/users/get_profile`, {
        username
      })
      .then(response => {
        console.log("profile fetched is    ", response.data);
        let date = response.data.date;
        let date1 = date.slice(0, 10);
        this.setState({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          username: response.data.username,
          create_date: date1,
          follower_count: response.data.follower_count,
          following_count: response.data.following_count,
          avatar: response.data.avatar,
          city: response.data.city,
          state: response.data.state,
          zipcode: response.data.zipcode,
          description: response.data.description
        });
      });
    axios
      .post(`http://${rooturl}:4500/api/tweets/getTweets`, { username })
      .then(response => {
        this.setState({
          tweet_count: response.data.length
        });
      });
  }
  addFollower = () => {
    //console.log("followers are..", followers);
    let username = localStorage.getItem("username");
    let following_name = this.state.username;
    let data = {
      username: username,
      following_name: following_name
    };
    console.log("data is..", data);
    var url = `http://${rooturl}:4500/api/users/add_following`;
    axios
      .post(url, data)
      .then(function(response) {
        console.log("response from add_following is..", response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    let redirectVar = null;
    if (localStorage.getItem("jwtToken") == null) {
      redirectVar = <Redirect to="/" />;
    }
    const {
      first_name,
      last_name,
      username,
      email,
      create_date,
      follower_count,
      following_count,
      tweet_count,
      avatar,
      description,
      city,
      state,
      zipcode
    } = this.state;
    return (
      <div>
        {redirectVar}

        <div className="card text-white bg-secondary  col-12" style={style1}>
          <div className="card-header">
            {first_name} {last_name}
            <br /> <p style={style2}>{tweet_count} Tweet</p>
          </div>
          <div className="card-body" style={style2}>
            <table>
              <tr>
                <td>
                  <img
                    src={avatar}
                    width={150}
                    className="rounded-circle"
                    alt="avatar"
                  />
                </td>
                <td width="10%"></td>
                <td>
                  <tr>
                    <td style={style3}>
                      {first_name} {last_name}
                    </td>
                  </tr>
                  <tr>
                    <td style={style2}>@{username}</td>
                  </tr>
                  <tr>
                    <td style={style2}>{description}</td>
                  </tr>
                  <tr>
                    <td style={style2}>{following_count} Following</td>
                    <td style={style2}>{follower_count} Followers</td>
                  </tr>
                  <tr>
                    <td style={style2}>Joined on {create_date}</td>
                  </tr>
                  <tr>
                    <td style={style2}>
                      {city} {state} {zipcode}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Button style={style} onClick={() => this.addFollower()}>
                        Follow
                      </Button>
                    </td>
                  </tr>
                  <br />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
const style1 = {
  fontFamily: "Gotham Narrow SSm",
  fontSize: 40
};
const style2 = {
  fontFamily: "Gotham Narrow SSm",
  fontSize: 20
};
const style3 = {
  maxWidth: 600,
  fontFamily: "Gotham Narrow SSm",
  fontSize: 30
};
const style = {
  backgroundColor: "#00acee",
  color: "white",
  fontSize: 15,
  fontFamily: "Gotham Narrow SSm",
  paddingLeft: 50,
  paddingRight: 50,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 100
};

export default PeopleProfileCard;
