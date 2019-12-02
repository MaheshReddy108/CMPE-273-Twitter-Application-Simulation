import React, { Component } from "react";
import { connect } from "react-redux";
import { getBookmarks } from "../_actions/tweetAction";
import IsEmpty from "../validation/is.empty.js";
import TweetItem from "../Feed/TweetItem";
import Spinner from "../common/Spinner";

class Bookmarks extends Component {
  state = {
    bms: []
  };

  componentDidMount() {
    const { user_id } = this.props.auth;
    const data = {
      user_id: user_id
    };
    this.props.getBookmarks(data);
  }

  render() {
    const { bms, loading } = this.props.tweetState;
    let tweetContent;

    if (bms === null || loading) {
      tweetContent = <Spinner />;
    } else {
      tweetContent = bms.map(tweet => (
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
  auth: state.auth,
  tweetState: state.tweetState,
  errors: state.errorState
});
export default connect(mapStateToProps, { getBookmarks })(Bookmarks);
