import React, { Component } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import TweetItem from "../Feed/TweetItem";
import { Link } from "react-router-dom";
import { rooturl } from "../_config/settings";

class DisplayListDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_Name: "",
      members: [],
      tweets: []
    };
  }
  componentDidMount() {
    var list_Name = this.props.match.params.list_Name;
    axios
      .post(`http://${rooturl}:4500/api/lists/get_members_of_a_list`, {
        list_Name
      })
      .then(response => {
        this.setState({
          members: this.state.members.concat(response.data)
        });
        let l = this.state.members.length;
        let members = this.state.members;
        for (let i = 0; i < l; i++) {
          let username = members[i].username;
          axios
            .post(`http://${rooturl}:4500/api/tweets/getTweets`, { username })
            .then(response => {
              this.setState({
                tweets: this.state.tweets.concat(response.data)
              });
            });
        }
      });
  }
  render() {
    const tweets = this.state.tweets;
    let tweetContent;
    tweetContent = tweets.map(tweet => (
      <TweetItem key={tweet._id} tweet={tweet} />
    ));
    return (
      <div className="feed">
        <br />
        <div className="container">
          <div className="row">
            <Link to="/welcomePage" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            <div className="col-md-12">{tweetContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayListDetails;
