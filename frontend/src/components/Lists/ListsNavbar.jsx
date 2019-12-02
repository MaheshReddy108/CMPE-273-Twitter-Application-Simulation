import React, { Component } from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import OwnedLists from "./OwnedLists";
import SubscribedLists from "./SubscribedLists";
import MemberLists from "./MemberLists";
class ListsNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: "pills-owned"
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
                this.state.activeSection === "pills-owned" ? "active" : ""
              }`}
              id="pills-owned-tab"
              data-toggle="pill"
              href="#pills-owned"
              role="tab"
              aria-controls="owned"
              onClick={() => this.onSectionClick("pills-owned")}
            >
              Owned
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`flex-sm-fill text-sm-center nav-link ${
                this.state.activeSection === "pills-subscribed" ? "active" : ""
              }`}
              id="pills-subscribed-tab"
              data-toggle="pill"
              href="#pills-subscribed"
              role="tab"
              aria-controls="subscribed"
              onClick={() => this.onSectionClick("pills-subscribed")}
            >
              Subscribed
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`flex-sm-fill text-sm-center nav-link ${
                this.state.activeSection === "pills-member" ? "active" : ""
              }`}
              id="pills-member-tab"
              data-toggle="pill"
              href="#pills-member"
              role="tab"
              aria-controls="member"
              onClick={() => this.onSectionClick("pills-member")}
            >
              Member
            </a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className={`tab-pane fade ${
              this.state.activeSection === "pills-owned" ? "show active" : ""
            }`}
            id="pills-owned"
            role="tabpanel"
            aria-labelledby="pills-owned-tab"
          >
            <OwnedLists />
          </div>
          <div
            className={`tab-pane fade ${
              this.state.activeSection === "pills-subscribed"
                ? "show active"
                : ""
            }`}
            id="pills-subscribed"
            role="tabpanel"
            aria-labelledby="pills-subscribed-tab"
          >
            <SubscribedLists />
          </div>
          <div
            className={`tab-pane fade ${
              this.state.activeSection === "pills-member" ? "show active" : ""
            }`}
            id="pills-member"
            role="tabpanel"
            aria-labelledby="pills-member-tab"
          >
            <MemberLists />
          </div>
        </div>
      </div>
    );
  }
}
export default ListsNavbar;
