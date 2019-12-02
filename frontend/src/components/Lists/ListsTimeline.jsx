import React, { Component } from "react";
import ListsDisplay from "./ListsDisplay";
import ListsNavbar from "./ListsNavbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
class ListsTimeline extends Component {
  render() {
    return (
      <div className="container">
        <ListsDisplay />
        <br />
        <ListsNavbar />
      </div>
    );
  }
}

export default ListsTimeline;
