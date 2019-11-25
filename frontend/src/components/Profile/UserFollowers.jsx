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
  }
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
                  </div>
                  <div className="col-md-4">
                    <br />
                    <Button style={style1}>Follow</Button>
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
