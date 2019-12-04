import React, { Component } from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./index.css";
import UserTweets from "./UserTweets";
import UserReTweets from "./UserReTweets";
import UserLikedTweets from "./UserLikedTweets";
import UserFollowing from "./UserFollowing";
import UserFollowers from "./UserFollowers";

import { Container, Row, Col } from "react-bootstrap";
class ProfileNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: "pills-tweets"
    };
  }

  onSectionClick = sectionName => {
    if (this.state.activeSection !== sectionName) {
      this.setState({
        activeSection: sectionName
      });
    }
  };
  render() {
    return (
      <div>
        <ul
          className="nav nav-pills nav-justified"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className={`flex-sm-fill text-sm-center nav-link ${
                this.state.activeSection === "pills-tweets" ? "active" : ""
              }`}
              id="pills-tweets-tab"
              data-toggle="pill"
              href="#pills-tweets"
              role="tab"
              aria-controls="tweets"
              onClick={() => this.onSectionClick("pills-tweets")}
            >
              Tweets
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`flex-sm-fill text-sm-center nav-link ${
                this.state.activeSection === "pills-retweets" ? "active" : ""
              }`}
              id="pills-retweets-tab"
              data-toggle="pill"
              href="#pills-retweets"
              role="tab"
              aria-controls="retweets"
              onClick={() => this.onSectionClick("pills-retweets")}
            >
              Re-Tweets
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`flex-sm-fill text-sm-center nav-link ${
                this.state.activeSection === "pills-likedtweets" ? "active" : ""
              }`}
              id="pills-likedtweets-tab"
              data-toggle="pill"
              href="#pills-likedtweets"
              role="tab"
              aria-controls="likedtweets"
              onClick={() => this.onSectionClick("pills-likedtweets")}
            >
              Liked Tweets
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`flex-sm-fill text-sm-center nav-link ${
                this.state.activeSection === "pills-followers" ? "active" : ""
              }`}
              id="pills-followers-tab"
              data-toggle="pill"
              href="#pills-followers"
              role="tab"
              aria-controls="followers"
              onClick={() => this.onSectionClick("pills-followers")}
            >
              Followers
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`flex-sm-fill text-sm-center nav-link ${
                this.state.activeSection === "pills-following" ? "active" : ""
              }`}
              id="pills-following-tab"
              data-toggle="pill"
              href="#pills-following"
              role="tab"
              aria-controls="following"
              onClick={() => this.onSectionClick("pills-following")}
            >
              Following
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className={`tab-pane fade ${
              this.state.activeSection === "pills-tweets" ? "show active" : ""
            }`}
            id="pills-tweets"
            role="tabpanel"
            aria-labelledby="pills-tweets-tab"
          >
            <UserTweets />
          </div>
          <div
            className={`tab-pane fade ${
              this.state.activeSection === "pills-retweets" ? "show active" : ""
            }`}
            id="pills-retweets"
            role="tabpanel"
            aria-labelledby="pills-retweets-tab"
          >
            <UserReTweets />
          </div>
          <div
            className={`tab-pane fade ${
              this.state.activeSection === "pills-likedtweets"
                ? "show active"
                : ""
            }`}
            id="pills-likedtweets"
            role="tabpanel"
            aria-labelledby="pills-likedtweets-tab"
          >
            <UserLikedTweets />
          </div>
          <div
            className={`tab-pane fade ${
              this.state.activeSection === "pills-followers"
                ? "show active"
                : ""
            }`}
            id="pills-followers"
            role="tabpanel"
            aria-labelledby="pills-followers-tab"
          >
            <UserFollowers />
          </div>
          <div
            className={`tab-pane fade ${
              this.state.activeSection === "pills-following"
                ? "show active"
                : ""
            }`}
            id="pills-following"
            role="tabpanel"
            aria-labelledby="pills-following-tab"
          >
            <UserFollowing />
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileNavbar;
