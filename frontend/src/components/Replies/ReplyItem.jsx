import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteReply } from "../_actions/tweetAction";

class ReplyItem extends Component {
  onDeleteClick(tweetId, replyId) {
    this.props.deleteReply(tweetId, replyId);
  }

  render() {
    const { reply, tweetId, auth } = this.props;

    return (
      <div className="card card-body mb-3 ">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={reply.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{reply.username}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{reply.text}</p>
            {reply.username === auth.user.username ? (
              <button
                onClick={this.onDeleteClick.bind(this, tweetId, reply._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ReplyItem.propTypes = {
  deleteReply: PropTypes.func.isRequired,
  reply: PropTypes.object.isRequired,
  tweetId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteReply })(ReplyItem);
