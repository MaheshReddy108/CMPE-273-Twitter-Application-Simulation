import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTweets } from "../_actions/tweetAction";
import IsEmpty from "../validation/is.empty.js";

class Feed extends Component {
  state = {
    tweets: []
  };

  componentDidMount() {
    this.props.getTweets();
  }

  componentDidUpdate(prevProps) {
    if (this.props.tweetState !== prevProps.tweetState) {
      let newTweets = [];
      console.log("Printing Initial State" + newTweets);
      if (!IsEmpty(this.props.tweetState.tweets)) {
        let tweetData = this.props.tweetState.tweets;
        console.log("Tweet Data is " + JSON.stringify(tweetData));
        tweetData.map((tweet, tweet_index) => {
          var itemObj = {};
          itemObj.username = tweet.username;
          itemObj.tweet_content = tweet.tweet_content;
          newTweets.push(itemObj);
        });
        this.setState({
          tweets: newTweets
        });
      }
    }
  }

  render() {
    const tweets = this.state.tweets;
    return (
      <div>
        <div>
          <h5 className="text-center">{`Welcome to your Feed`}</h5>
        </div>
        <div>
          {tweets.map((tweet, Index) => {
            return (
              <div className="card card-body mb-3">
                <div className="row">
                  <div className="col-md-2">
                    <a href="profile.html">
                      <img
                        className="rounded-circle d-none d-md-block"
                        src={tweet.avatar}
                        alt=""
                      />
                    </a>
                    <br />
                    <p className="text-center">{tweet.username}</p>
                  </div>
                  <div className="col-md-10">
                    <p className="lead">{tweet.tweet_content}</p>
                    {/* {showActions ? (
                      <span>
                        <button
                          onClick={this.onLikeClick.bind(this, tweet._id)}
                          type="button"
                          className="btn btn-light mr-1"
                        >
                          <i
                            className={classnames('fas fa-thumbs-up', {
                              'text-info': this.findUserLike(tweet.likes_count)
                            })}
                          />
                          <span className="badge badge-light">{tweet.likes.length}</span>
                        </button>
                        <button
                          onClick={this.onUnlikeClick.bind(this, tweet._id)}
                          type="button"
                          className="btn btn-light mr-1"
                        >
                          <i className="text-secondary fas fa-thumbs-down" />
                        </button>
                        <Link to={`/post/${tweet._id}`} className="btn btn-info mr-1">
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
                    ) : null} */}
                  </div>
                </div>
              </div>
            );
          })}
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
