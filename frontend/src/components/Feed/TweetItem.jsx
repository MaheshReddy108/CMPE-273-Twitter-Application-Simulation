import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  getTweets,
  deleteTweet,
  addLike,
  removeLike
} from "../_actions/tweetAction";

class TweetItem extends Component {
  onDeleteClick(id) {
    this.props.deleteTweet(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    }
    return false;
  }

  render() {
    const { tweet, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                width={50}
                src={tweet.avatar}
                alt="avt"
              />
            </a>
            <br />
            <p className="text-center">{tweet.username}</p>
          </div>
          <br />
          <div className="col-md-10">
            <p className="lead">{tweet.tweet_content}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, tweet._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(tweet.likes)
                    })}
                  />
                  <span className="badge badge-light">{tweet.likes_count}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, tweet._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/tweet/${tweet._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>

                {tweet.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, tweet._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

TweetItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({
  tweetState: state.tweetState,
  errors: state.errorState,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getTweets,
  deleteTweet,
  addLike,
  removeLike
})(TweetItem);
