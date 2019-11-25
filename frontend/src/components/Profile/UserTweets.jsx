import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class UserTweets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      tweets: []
    };
  }
  componentDidMount() {
    let username = localStorage.getItem("username");
    axios
      .post("http://localhost:4500/api/tweets/getTweets", { username })
      .then(response => {
        this.setState({
          tweets: this.state.tweets.concat(response.data)
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
    const tweets = this.state.tweets;
    return (
      <div>
        <br />
        {tweets.map((tweet, tweetIndex) => {
          let avatar = tweet.avatar;
          return (
            <div className="card card-body mb-3" key={tweetIndex}>
              <div className="row">
                <div className="col-md-2">
                  <img
                    src={avatar}
                    width={50}
                    className="rounded-circle"
                    alt="avatar"
                  />

                  <br />
                  <p className="text-center">{tweet.username}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{tweet.tweet_content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default UserTweets;
