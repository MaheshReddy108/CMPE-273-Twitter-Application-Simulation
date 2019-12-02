import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import { Link } from "react-router-dom";

class OwnedLists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let ownerID = localStorage.getItem("user_id");
    /*axios
      .post("http://localhost:4500/api/lists/get_user_owned_lists", { ownerID })
      .then(response => {
        console.log("reponse of owned lists is..", response.data);
        this.setState({
          lists: this.state.lists.concat(response.data)
        });
      });*/
  }

  render() {
    //const { open, memberName } = this.state;
    //const lists = this.state.lists;
    return (
      <div>
        {" "}
        <br />
        <div>Hii {this.props.data1}</div>
      </div>
    );
  }
}
const style = {
  fontFamily: "Gotham Narrow SSm",
  fontSize: 25
};
/*const style1 = {
  backgroundColor: "#00acee",
  color: "white",
  fontSize: 15,
  fontFamily: "Gotham Narrow SSm",
  paddingLeft: 30,
  paddingRight: 30,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 50
};*/
const style1 = {
  fontFamily: "Gotham Narrow SSm",
  fontSize: 40
};
const style2 = {
  fontFamily: "Gotham Narrow SSm",
  fontSize: 20
};
const style4 = {
  backgroundColor: "#00acee",
  color: "white",
  fontSize: 15,
  fontFamily: "Gotham Narrow SSm",
  paddingLeft: 50,
  paddingRight: 50,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 100
};
export default OwnedLists;
