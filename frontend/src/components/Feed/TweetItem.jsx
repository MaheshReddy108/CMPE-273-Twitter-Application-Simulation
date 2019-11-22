import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getTweets } from "../_actions/tweetAction";

class TweetItem extends Component {
  render() {
      const {}
    return <div>
          <div key={Index}>
                <div className="row">
                  <div className="col-auto">
                    <p>{tweet.username}</p>
                  </div>
                  <div className="col-auto">
                    <p>{tweet.tweet_content}</p>
                  </div>
                </div>
              </div>

    </div>;
  }
}

const mapStateToProps = state => ({
  tweetState: state.tweetState,
  errors: state.errorState
});

export default connect(mapStateToProps)(TweetItem);
