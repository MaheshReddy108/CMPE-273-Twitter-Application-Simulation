import React, { Component } from "react";
import { Route } from "react-router-dom";
import SideBarHome from "./Navigation/SideBarHome";
import HomeTimeline from "./Timeline/HomeTimeline";

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <SideBarHome />
      </div>
    );
  }
}

export default WelcomePage;
