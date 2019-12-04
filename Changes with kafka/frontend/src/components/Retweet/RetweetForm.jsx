import React, { Component } from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import { Retweet } from "../_actions/tweetAction";
import PropTypes from "prop-types";

class RetweetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      username: "",
      firstname: "",
      lastname: "",
      avatar: "",
      tweet_id: "",
      text: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      user_id: this.props.user_id,
      username: this.props.username,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      avatar: this.props.avatar,
      tweet_id: this.props.org_tweet._id
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      user_id,
      username,
      firstname,
      lastname,
      avatar,
      text,
      tweet_id
    } = this.state;

    const newTweet = {
      tweet_content: text,
      user_id: user_id,
      username: username,
      firstname: firstname,
      lastname: lastname,
      avatar: avatar,
      tweet_id: tweet_id
    };

    this.props.Retweet(newTweet);
    this.setState({ text: "" });
  };

  render() {
    const { user_id, username, org_tweet, text } = this.props;
    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
        <div className="card-body">
          <div className="form-group">
            <TextAreaFieldGroup
              placeholder="Type in"
              name="text"
              value={text}
              onChange={this.onChange}
            />
          </div>

          <div>
            <div className="card card-body mb-30">
              <div className="row">
                <div className="col-md-5">
                  <a href="profile.html">
                    <img
                      className="rounded-circle d-none d-md-block "
                      width={50}
                      src={org_tweet.avatar}
                      alt="avt"
                    />
                  </a>
                  <strong className="text-left font-weight-bold">
                    {org_tweet.firstname}
                    {org_tweet.lastname}
                  </strong>
                  <p className="text-left font-weight-light">
                    @{org_tweet.username}
                  </p>
                </div>
                <br />
                <div className="col-md-10">
                  <p className="lead">{org_tweet.tweet_content}</p>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Retweet
          </button>
        </div>
      </form>
    );
  }
}

RetweetForm.propTypes = {
  username: PropTypes.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tweetState: state.tweetState,
  errors: state.errorState
});

export default connect(mapStateToProps, { Retweet })(RetweetForm);
