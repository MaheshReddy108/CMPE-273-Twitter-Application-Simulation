import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getTweets } from "../_actions/tweetAction";

class TweetItem extends Component {
  render() {
    return (
         <div className="card card-body mb-3" key={tweetIndex}>
                <div className="row">
                  <div className="col-md-2">
                    <a href="profile.html">
                      <img
                        className="rounded-circle d-none d-md-block"
                        src={tweet.avatar}
                        alt="avt"
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
                          onClick={this.onLik eClick.bind(this, tweet._id)}
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
          }}


const mapStateToProps = state => ({
  tweetState: state.tweetState,
  errors: state.errorState
});

export default connect(mapStateToProps)(TweetItem);
