import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ProfileUpdateForm from "./ProfileUpdateForm";
import Modal from "react-responsive-modal";
//import { loginUser } from "../actions/authActions";

class ProfileDisplay extends Component {
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
      zipcode: "",
      open: false,
      blockScroll: true
    };
  }
  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    let username = localStorage.getItem("username");
    axios
      .post("http://localhost:4500/api/users/get_profile", { username })
      .then(response => {
        console.log("PROFILE IS................", response.data);
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
      .post("http://localhost:4500/api/tweets/getTweets", { username })
      .then(response => {
        this.setState({
          tweet_count: response.data.length
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
    let redirectVar = null;
    if (localStorage.getItem("jwtToken") == null) {
      redirectVar = <Redirect to="/" />;
    }
    const {
      first_name,
      last_name,
      username,
      email,
      open,
      create_date,
      follower_count,
      following_count,
      tweet_count,
      avatar,
      description,
      city,
      state,
      zipcode,
      blockScroll
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
                  <br />
                  <tr>
                    <Button style={style4} onClick={this.onOpenModal}>
                      Edit Profile
                    </Button>
                    <div className="overflow-auto">
                      <Modal open={open} onClose={this.onCloseModal} center>
                        <h4 className="text-center tex-secondary">
                          Update Your Profile Details
                        </h4>
                        <ProfileUpdateForm
                          first_name={first_name}
                          last_name={last_name}
                          description={description}
                          city={city}
                          state={state}
                          zipcode={zipcode}
                        />
                      </Modal>
                    </div>
                  </tr>
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
const style4 = {
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
/*const mapStateToProps = state => ({
  auth: state.auth
});*/

export default ProfileDisplay;
