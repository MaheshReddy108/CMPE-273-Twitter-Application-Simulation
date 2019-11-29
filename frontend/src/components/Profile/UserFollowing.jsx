import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

class UserFollowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      following: []
    };
    //this.handleUnfollow = this.handleUnfollow.bind(this);
  }
  componentDidMount() {
    let username = localStorage.getItem("username");
    axios
      .post("http://localhost:4500/api/users/get_following", { username })
      .then(response => {
        console.log("response is.", response.data);
        this.setState({
          following: this.state.following.concat(response.data)
        });
      });
  }
  componentWillMount() {
    let username = localStorage.getItem("username");
    this.setState({
      username: username
    });
  }

  handleUnfollow = e => {
    console.log("Unfollow pressed");
    console.log("following is ", e.target.id);
    let data = {
      following_name: e.target.id,
      username: localStorage.getItem("username")
    };
    //console.log(data);
    var url = "http://localhost:4500/api/users/unfollow";
    axios
      .post(url, data)
      .then(function(response) {
        console.log("response from unfollow is..", response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    const following = this.state.following;
    return (
      <div>
        {" "}
        <br />
        <div>
          {following.map(following => {
            return (
              <div className="card card-body mb-3">
                <div className="row">
                  <div className="col-md-8" style={style}>
                    @ {following.following_name} <br />
                    {following._id}
                  </div>
                  <div className="col-md-4">
                    <br />
                    <Button
                      id={following.following_name}
                      style={style1}
                      onClick={this.handleUnfollow}
                    >
                      Unfollow
                    </Button>
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
export default UserFollowing;
