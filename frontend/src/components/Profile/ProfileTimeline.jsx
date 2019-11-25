import React, { Component } from "react";
import ProfileDisplay from "./ProfileDisplay";
import ProfileNavbar from "./ProfileNavbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
class ProfileTimeline extends Component {
  render() {
    return (
      <div className="container">
        <ProfileDisplay />
        <br />
        <ProfileNavbar />
      </div>
    );
  }
}

export default ProfileTimeline;
