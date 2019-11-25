import React, { Component } from "react";
import HomeTimeline from "../Timeline/HomeTimeline";
import SearchBar from "../Explore/SearchBar";
import ProfileTimeline from "../Profile/ProfileTimeline";
import Logout from "./Logout";

class SideBarHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: "list-home"
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
        {" "}
        <br />
        <div className="row container">
          <div className="col-2">
            <div className="list-group" id="list-tab" role="tablist">
              <div
                className={`list-group-item list-group-item-action list-group-item-primary
                        ${
                          this.state.activeSection === "list-home"
                            ? "active"
                            : ""
                        }`}
                id="list-home-list"
                data-toggle="list"
                href="#list-home"
                role="tab"
                aria-controls="home"
                onClick={() => this.onSectionClick("list-home")}
              >
                Home
              </div>
              <div
                className={`list-group-item list-group-item-action list-group-item-primary
                        ${
                          this.state.activeSection === "list-explore"
                            ? "active"
                            : ""
                        }`}
                id="list-explore-list"
                data-toggle="list"
                href="#list-explore"
                role="tab"
                aria-controls="explore"
                onClick={() => this.onSectionClick("list-explore")}
              >
                Explore
              </div>
              <div
                className={`list-group-item list-group-item-action list-group-item-primary
                        ${
                          this.state.activeSection === "list-messages"
                            ? "active"
                            : ""
                        }`}
                id="list-messages-list"
                data-toggle="list"
                href="#list-messages"
                role="tab"
                aria-controls="messages"
                onClick={() => this.onSectionClick("list-messages")}
              >
                Messages
              </div>
              <div
                className={`list-group-item list-group-item-action list-group-item-primary
                        ${
                          this.state.activeSection === "list-bookmarks"
                            ? "active"
                            : ""
                        }`}
                id="list-bookmarks-list"
                data-toggle="list"
                href="#list-bookmarks"
                role="tab"
                aria-controls="bookmarks"
                onClick={() => this.onSectionClick("list-bookmarks")}
              >
                Bookmarks
              </div>
              <div
                className={`list-group-item list-group-item-action list-group-item-primary
                        ${
                          this.state.activeSection === "list-lists"
                            ? "active"
                            : ""
                        }`}
                id="list-lists-list"
                data-toggle="list"
                href="#list-lists"
                role="tab"
                aria-controls="lists"
                onClick={() => this.onSectionClick("list-lists")}
              >
                Lists
              </div>

              <div
                className={`list-group-item list-group-item-action list-group-item-primary
                        ${
                          this.state.activeSection === "list-profile"
                            ? "active"
                            : ""
                        }`}
                id="list-profile-list"
                data-toggle="list"
                href="#list-profile"
                role="tab"
                aria-controls="profile"
                onClick={() => this.onSectionClick("list-profile")}
              >
                Profile
              </div>
              <div
                className={`list-group-item list-group-item-action list-group-item-primary
                        ${
                          this.state.activeSection === "list-logout"
                            ? "active"
                            : ""
                        }`}
                id="list-logout-list"
                data-toggle="list"
                href="#list-logout"
                role="tab"
                aria-controls="logout"
                onClick={() => this.onSectionClick("list-logout")}
              >
                Logout
              </div>
            </div>
          </div>

          <div className="col-9">
            <div className="tab-content" id="nav-tabContent">
              <div
                className={`tab-pane fade ${
                  this.state.activeSection === "list-home" ? "show active" : ""
                }`}
                id="list-home"
                role="tabpanel"
                aria-labelledby="list-home-list"
              >
                <HomeTimeline />
              </div>
            </div>
            <div className="tab-content" id="nav-tabContent">
              <div
                className={`tab-pane fade ${
                  this.state.activeSection === "list-explore"
                    ? "show active"
                    : ""
                }`}
                id="list-explore"
                role="tabpanel"
                aria-labelledby="list-explore-list"
              >
                <SearchBar />
              </div>
            </div>
            <div className="tab-content" id="nav-tabContent">
              <div
                className={`tab-pane fade ${
                  this.state.activeSection === "list-profile"
                    ? "show active"
                    : ""
                }`}
                id="list-profile"
                role="tabpanel"
                aria-labelledby="list-profile-list"
              >
                <ProfileTimeline />
              </div>
            </div>
            <div className="tab-content" id="nav-tabContent">
              <div
                className={`tab-pane fade ${
                  this.state.activeSection === "list-logout"
                    ? "show active"
                    : ""
                }`}
                id="list-logout"
                role="tabpanel"
                aria-labelledby="list-logout-list"
              >
                <Logout />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBarHome;
