import React, { Component } from "react";

class Logout extends Component {
  render() {
    //localStorage.removeItem("jwtToken");
    //localStorage.removeItem("username");
    //localStorage.removeItem("user_id");
    return (
      <div>
        {" "}
        <p> User will be logged out </p>{" "}
      </div>
    );
  }
}
export default Logout;
