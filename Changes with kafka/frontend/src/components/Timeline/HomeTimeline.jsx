import React, { Component } from "react";
import Feed from "../Feed/Feed";
import TweetTextBox from "../Feed/TweetTextBox";

class HomeTimeline extends Component {
  render() {
    return (
      <div className="container">
        <TweetTextBox />
        <Feed />
      </div>
    );
  }
}

export default HomeTimeline;
