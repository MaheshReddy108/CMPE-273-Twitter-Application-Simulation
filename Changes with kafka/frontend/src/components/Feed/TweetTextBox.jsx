import React, { Component } from "react";
import { connect } from "react-redux";
import { addTweet } from "../_actions/tweetAction";
import axios from "axios";
import { rooturl } from "../_config/settings";

class TweetTextBox extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      upload: "",
      textError: "",
      loading: false,
      hashtag: "",
      photos: "",
      errorRedirect: false,
      photoThumbnail: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    console.log("name: ", name);
    const value = target.value;

    if (name === "photos") {
      console.log("Files : ", target.files);
      var photos = target.files;
      console.log("photos:", photos);
      let data = new FormData();
      for (var i = 0; i < photos.length; i++) {
        data.append("photos", photos[i]);
      }

      axios.defaults.withCredentials = true;
      axios
        .post(`http://${rooturl}:4500/api/tweets/upload-file`, data)
        .then(response => {
          var imagePreviewArr = [];
          var photoArr = "";
          console.log("inside upload-file post call front end");

          if (response.status === 200) {
            for (var i = 0; i < photos.length; i++) {
              photoArr =
                photoArr.length == 0
                  ? photos[i].name
                  : photoArr + "," + photos[i].name;
              axios.defaults.withCredentials = true;
              axios
                .post(
                  `http://${rooturl}:4500/api/tweets/download-file/` +
                    photos[i].name
                )
                .then(response => {
                  //console.log("Imgae Res : ", response);
                  let imagePreview = "data:image/jpg;base64, " + response.data;
                  imagePreviewArr.push(imagePreview);
                  console.log("imagePreviewArr:", imagePreviewArr);

                  this.setState({
                    photoThumbnail: imagePreviewArr,
                    photos: photoArr
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

            console.log("Photos: ", this.state.photos);
          }
        })
        .catch(err => {
          if (err) {
            this.setState({
              errorRedirect: true
            });
          }
        });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    var hashtag = this.state.hashtag;
    var hashtagArr = hashtag.split(",");
    const newTweet = {
      tweet_content: this.state.text,
      user_id: user.id,
      username: user.username,
      firstname: user.first_name,
      lastname: user.last_name,
      avatar: user.avatar,
      imageList: this.state.photos,
      hashtag: hashtagArr
    };

    this.props.addTweet(newTweet);
    this.setState({ text: "", hashtag: "" });
  };

  render() {
    let button;
    if (this.state.text.length > 0 && this.state.text.length <= 280) {
      button = (
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.props.handleFormClose}
        >
          Tweet
        </button>
      );
    } else {
      button = (
        <div className="animated lightSpeedIn">
          <button type="submit" className="btn btn-primary" disabled="true">
            {" "}
            Tweet
          </button>
          <button type="submit" className="btn btn-primary" disabled="true">
            {" "}
            Upload
          </button>
        </div>
      );
    }
    return (
      <div className="card w-95">
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Whats happening?"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
              />
            </div>
            <textarea
              className=""
              placeholder="Hastags"
              name="hashtag"
              value={this.state.hashtag}
              onChange={this.onChange}
              rows="1"
              cols="50"
            />
            <div className="container photo-upload-btn-container">
              <div className="">
                <button className="btn btn-lg photo-upload-btn">
                  <input
                    type="file"
                    name="photos"
                    className="btn btn-lg photo-upload-btn"
                    onChange={this.handleInputChange}
                    multiple
                    className="btn btn-lg photo-upload-btn"
                  />
                </button>
              </div>
            </div>
            {button}
          </form>
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
export default connect(mapStateToProps, { addTweet })(TweetTextBox);
