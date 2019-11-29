import React, { Component } from "react";
import HomeTimeline from "../Timeline/HomeTimeline";
import SearchBar from "../Explore/SearchBar";
import ProfileTimeline from "../Profile/ProfileTimeline";

class SidePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: "v-pills-home"
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
    const { activeSection } = this.state;
    return (
      <div>
        <br />
        <br />
        <div className="row">
          <div className="col-2">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                className={`nav-link ${
                  activeSection === "v-pills-home" ? "active" : ""
                } `}
                id="v-pills-home-tab"
                data-toggle="pill"
                href="#v-pills-home"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                onClick={() => this.onSectionClick("v-pills-home")}
              >
                Home
              </a>

              <a
                className={`nav-link ${
                  activeSection === "v-pills-explore" ? "active" : ""
                } `}
                id="v-pills-explore-tab"
                data-toggle="pill"
                href="#v-pills-explore"
                role="tab"
                aria-controls="v-pills-explore"
                aria-selected="false"
                onClick={() => this.onSectionClick("v-pills-explore")}
              >
                Explore
              </a>
              <a
                className={`nav-link ${
                  activeSection === "v-pills-messages" ? "active" : ""
                } `}
                id="v-pills-messages-tab"
                data-toggle="pill"
                href="#v-pills-messages"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
                onClick={() => this.onSectionClick("v-pills-messages")}
              >
                Messages
              </a>
              <a
                className={`nav-link ${
                  activeSection === "v-pills-bookmarks" ? "active" : ""
                } `}
                id="v-pills-bookmarks-tab"
                data-toggle="pill"
                href="#v-pills-bookmarks"
                role="tab"
                aria-controls="v-pills-bookmarks"
                aria-selected="false"
                onClick={() => this.onSectionClick("v-pills-bookmarks")}
              >
                Bookmarks
              </a>
              <a
                className={`nav-link ${
                  activeSection === "v-pills-lists" ? "active" : ""
                } `}
                id="v-pills-lists-tab"
                data-toggle="pill"
                href="#v-pills-lists"
                role="tab"
                aria-controls="v-pills-lists"
                aria-selected="false"
                onClick={() => this.onSectionClick("v-pills-lists")}
              >
                Lists
              </a>
              <a
                className={`nav-link ${
                  activeSection === "v-pills-profile" ? "active" : ""
                } `}
                id="v-pills-profile-tab"
                data-toggle="pill"
                href="#v-pills-profile"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
                onClick={() => this.onSectionClick("v-pills-profile")}
              >
                Profile
              </a>
            </div>
          </div>
          <div className="col-9">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className={`tab-pane fade  ${
                  activeSection === "v-pills-home" ? " show active" : ""
                }`}
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <HomeTimeline />
              </div>
              <div
                className={`tab-pane fade  ${
                  activeSection === "v-pills-explore" ? " show active" : ""
                }`}
                id="v-pills-explore"
                role="tabpanel"
                aria-labelledby="v-pills-explore-tab"
              >
                <SearchBar />
              </div>
              <div
                className={`tab-pane fade  ${
                  activeSection === "v-pills-messages" ? " show active" : ""
                }`}
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
              >
                ...
              </div>
              <div
                className={`tab-pane fade  ${
                  activeSection === "v-pills-bookmarks" ? " show active" : ""
                }`}
                id="v-pills-bookmarks"
                role="tabpanel"
                aria-labelledby="v-pills-bookmarks-tab"
              >
                ...
              </div>
              <div
                className={`tab-pane fade  ${
                  activeSection === "v-pills-lists" ? " show active" : ""
                }`}
                id="v-pills-lists"
                role="tabpanel"
                aria-labelledby="v-pills-lists-tab"
              >
                ...
              </div>
              <div
                className={`tab-pane fade  ${
                  activeSection === "v-pills-profile" ? " show active" : ""
                }`}
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <ProfileTimeline />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SidePanel;
