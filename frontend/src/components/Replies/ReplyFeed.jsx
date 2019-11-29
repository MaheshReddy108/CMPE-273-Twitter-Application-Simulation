import React, { Component } from "react";
import PropTypes from "prop-types";
import ReplyItem from "./ReplyItem";

class ReplyFeed extends Component {
  render() {
    console.log("enters reply test");
    const { replies, tweetId } = this.props;

    return replies.map(reply => (
      <ReplyItem key={reply._id} reply={reply} tweetId={tweetId} />
    ));
  }
}

ReplyFeed.propTypes = {
  replies: PropTypes.array.isRequired,
  tweetId: PropTypes.string.isRequired
};

export default ReplyFeed;
