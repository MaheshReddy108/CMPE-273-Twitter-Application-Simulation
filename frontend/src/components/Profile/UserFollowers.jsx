import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

class UserFollowers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      followers: []
    };
    this.addFollower = this.addFollower.bind(this);
    this.checkFollower = this.checkFollower.bind(this);
  }

  checkFollower = followers => {
    console.log("follower is..", followers);
    let data = {
      username: localStorage.getItem("username"),
      follower_name: followers.follower_name
    };
    const msg = "";
    let url = "http://localhost:4500/api/users/check_follower";
    axios
      .post(url, data)
      .then(function(response) {
        console.log("response from check_follower is..", response.data.msg);
        msg = response.data.msg;
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log("msg is ", msg);
    if (msg == "not exists")
      return (
        <Button style={style1} onClick={() => this.addFollower(followers)}>
          Follow
        </Button>
      );
    else {
      return <Button style={style1}>Unfollow</Button>;
    }
    /* return (
      <Button style={style1} onClick={() => this.addFollower(followers)}>
        Follow
      </Button>
    );*/
  };
  addFollower = followers => {
    //console.log("followers are..", followers);
    let username = localStorage.getItem("username");
    let following_id = followers.follower_id;
    let following_name = followers.follower_name;
    let data = {
      username: username,
      following_id: following_id,
      following_name: following_name
    };
    //console.log("data is..", data);
    var url = "http://localhost:4500/api/users/add_following";
    axios
      .post(url, data)
      .then(function(response) {
        console.log("response from add_following is..", response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  componentDidMount() {
    let username = localStorage.getItem("username");
    axios
      .post("http://localhost:4500/api/users/get_followers", { username })
      .then(response => {
        this.setState({
          followers: this.state.followers.concat(response.data)
        });
      });
  }
  componentWillMount() {
    let username = localStorage.getItem("username");
    this.setState({
      username: username
    });
  }
  render() {
    const followers = this.state.followers;
    return (
      <div>
        {" "}
        <br />
        <div>
          {followers.map(followers => {
            return (
              <div className="card card-body mb-3">
                <div className="row">
                  <div className="col-md-8" style={style}>
                    @ {followers.follower_name}
                    <br />
                    {followers.follower_id}
                  </div>
                  <div className="col-md-4">
                    <br />

                    {this.checkFollower(followers)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const style = {
  fontFamily: "Gotham Narrow SSm",
  fontSize: 25
};
const style1 = {
  backgroundColor: "#00acee",
  color: "white",
  fontSize: 15,
  fontFamily: "Gotham Narrow SSm",
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 50
};
export default UserFollowers;
