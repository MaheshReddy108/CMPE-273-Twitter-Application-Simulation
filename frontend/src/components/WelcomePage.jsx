import React, { Component } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Tweet from "./Feed/Tweet";
import NavBarHome from "./Navigation/NavBarHome";
import SidePanel from "./Navigation/SidePanel";

class WelcomePage extends Component {
  render() {
    return (
      <div>
        <NavBarHome />
        <SidePanel />
      </div>
    );
  }
}

export default WelcomePage;
