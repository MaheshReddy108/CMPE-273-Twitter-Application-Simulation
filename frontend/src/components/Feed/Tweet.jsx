import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TweetItem from "./TweetItem";
import Spinner from "../common/Spinner";
import { getTweet } from "../_actions/tweetAction";

class Tweet extends Component {
  componentDidMount() {
    console.log("Inside tweet component");
    console.log("the tweet id is" + this.props.match.params.id);
    this.props.getTweet(this.props.match.params.id);
  }

  render() {
    const { tweet, loading } = this.props.tweet;
    let tweetContent;
    console.log("this is  tweet component", tweet);

    if (tweet === null || loading || Object.keys(tweet).length === 0) {
      tweetContent = <Spinner />;
    } else {
      tweetContent = (
        <div>
          <TweetItem tweet={tweet} showActions={false} />
        </div>
      );
    }

    return (
      <div className="tweet">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/welcomePage" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {tweetContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Tweet.propTypes = {
  getTweet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tweet: state.tweetState
});

export default connect(mapStateToProps, { getTweet })(Tweet);
