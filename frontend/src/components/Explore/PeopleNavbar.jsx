import React, { Component } from "react";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import PeopleTweets from "./PeopleTweets";
import PeopleLists from "./PeopleLists";
class PeopleNavbar extends Component {
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
  componentDidMount() {
    var username = this.props.data;
    var display_id = this.props.data1;
    console.log(
      "inside component did mount of profile peoplr card.. hii ",
      username
    );
  }
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
                this.state.activeSection === "pills-lists" ? "active" : ""
              }`}
              id="pills-lists-tab"
              data-toggle="pill"
              href="#pills-lists"
              role="tab"
              aria-controls="lists"
              onClick={() => this.onSectionClick("pills-lists")}
            >
              Lists
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
            <PeopleTweets data={this.props.data} />
          </div>
          <div
            className={`tab-pane fade ${
              this.state.activeSection === "pills-lists" ? "show active" : ""
            }`}
            id="pills-lists"
            role="tabpanel"
            aria-labelledby="pills-tweets-tab"
          >
            <PeopleLists data={this.props.data} />
          </div>
        </div>
      </div>
    );
  }
}
export default PeopleNavbar;
