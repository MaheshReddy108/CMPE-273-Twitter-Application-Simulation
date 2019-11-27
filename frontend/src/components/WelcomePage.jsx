import React, { Component } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import SideBarHome from "./Navigation/SideBarHome";
import Tweet from "./Feed/Tweet";
import NavBarHome from "./Navigation/NavBarHome";

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <NavBarHome />
        <SideBarHome />
        <div className="container"></div>
      </div>
    );
  }
}

export default WelcomePage;
