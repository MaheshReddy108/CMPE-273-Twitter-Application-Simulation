import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Modal from "react-responsive-modal";
import Button from "react-bootstrap/Button";
import RetweetForm from "../Retweet/RetweetForm";
import { Link } from "react-router-dom";
import { rooturl } from "../_config/settings";
import axios from "axios";
import {
  getTweets,
  deleteTweet,
  addLike,
  removeLike,
  bookmark
} from "../_actions/tweetAction";

class TweetItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      blockScroll: true,
      ProfileImagePreview: ""
    };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentDidMount() {
    let { tweet } = this.props;
    console.log("imageList", tweet.imageList[0]);

    axios
      .post(
        `http://${rooturl}:4500/api/tweets/download-file/` + tweet.imageList[0]
      )
      .then(response => {
        let imagePreview = "data:image/jpg;base64, " + response.data;
        tweet.imageList.push(imagePreview);
        console.log("tweet.imageList", tweet.imageList);
        this.setState({
          ProfileImagePreview: imagePreview
        });
      })
      .catch(err => {
        if (err) {
          this.setState({
            errorRedirect: true
          });
        }
      });
  }

  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  onDeleteClick(id) {
    this.props.deleteTweet(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  onBookmark(id) {
    this.props.bookmark(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    }
    return false;
  }

  render() {
    const { open } = this.state;
    const { tweet, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link
              to={{
                pathname: "/profile/" + tweet.username
              }}
            >
              <img
                className="rounded-circle d-none d-md-block "
                width={50}
                src={tweet.avatar}
                alt="avt"
              />
            </Link>
            <br />
            <strong className="text-left font-weight-bold">
              {tweet.firstname}
              {tweet.lastname}
            </strong>
            <p className="text-left font-weight-light">@{tweet.username}</p>
          </div>
          <br />
          <div className="col-md-10">
            <p className="lead">{tweet.tweet_content}</p>
            <p className="lead">{tweet.hashtags}</p>
            <img
              className="square d-none d-md-block "
              width={400}
              src={tweet.imageList[1]}
              alt=""
            />

            {tweet.retweeted === true ? (
              <div>
                <div className="card card-body mb-5">
                  <div className="row">
                    <div className="col-md-3">
                      <a href="profile.html">
                        <img
                          className="rounded-circle d-none d-md-block"
                          width={50}
                          src={tweet.retweeted_status.avatar}
                          alt="avt"
                        />
                      </a>
                      <br />

                      <strong className="text-left font-weight-bold">
                        {tweet.retweeted_status.firstname}
                        {tweet.retweeted_status.lastname}
                      </strong>
                      <p className="text-left font-weight-light">
                        @{tweet.retweeted_status.username}
                      </p>
                      <br />
                    </div>
                    <br />
                    <div className="col-md-10">
                      <p className="lead">
                        {tweet.retweeted_status.tweet_content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}

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

                <button
                  onClick={this.onOpenModal}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  {" "}
                  <i
                    className={classnames("fas fa-retweet", {
                      "text-info": tweet.retweets_count
                    })}
                  />
                  <span className="badge badge-light">
                    {tweet.retweets_count}
                  </span>
                </button>
                <Modal open={open} onClose={this.onCloseModal} center>
                  <p className="text-left tex-secondary  font-weight-bold">
                    Retweet
                  </p>
                  <RetweetForm
                    user_id={auth.user.id}
                    username={auth.user.username}
                    firstname={auth.user.first_name}
                    lastname={auth.user.last_name}
                    avatar={auth.user.avatar}
                    org_tweet={tweet}
                  />
                </Modal>

                <Link to={`/tweet/${tweet._id}`} className="btn btn-info mr-1">
                  Replies
                </Link>

                <button
                  onClick={this.onBookmark.bind(this, tweet._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-bookmark" />
                </button>

                {tweet.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, tweet._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fa fa-remove" />
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
  removeLike,
  bookmark
})(TweetItem);
