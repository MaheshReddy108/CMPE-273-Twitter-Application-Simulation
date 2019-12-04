import React, { Component } from "react";
import { connect } from "react-redux";
import { getTweets } from "../_actions/tweetAction";
import IsEmpty from "../validation/is.empty.js";
import TweetItem from "./TweetItem";
import Spinner from "../common/Spinner";

class Feed extends Component {
  state = {
    tweets: []
  };

  componentDidMount() {
    this.props.getTweets();
  }

  render() {
    const { tweets, loading } = this.props.tweetState;
    let tweetContent;

    if (tweets === null || loading) {
      tweetContent = <Spinner />;
    } else {
      tweetContent = tweets.map(tweet => (
        <TweetItem key={tweet._id} tweet={tweet} />
      ));
    }

    return (
      <div className="feed">
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-12">{tweetContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tweetState: state.tweetState,
  errors: state.errorState
});
export default connect(mapStateToProps, { getTweets })(Feed);
