import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { rooturl } from "../_config/settings";

import { Link } from "react-router-dom";

class OwnedLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  handleSubscribe = e => {
    console.log("Subscribe pressed");
    //console.log("list name  is ", e.target.id);
    let data = {
      user_id: localStorage.getItem("user_id"),
      username: localStorage.getItem("username"),
      list_Name: e.target.id
    };
    console.log(data);
    var url = `http://${rooturl}:4500/api/lists/subscribe`;
    axios
      .post(url, data)
      .then(function(response) {
        console.log("response from unfollow is..", response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    let username = this.props.data;
    axios
      .post(`http://${rooturl}:4500/api/users/get_profile`, {
        username
      })
      .then(response => {
        //console.log("profile fetched is    ", response.data);
        let ownerID = response.data._id;

        axios
          .post(`http://${rooturl}:4500/api/lists/get_user_owned_lists`, {
            ownerID
          })
          .then(response => {
            console.log("reponse of owned lists is..", response.data);
            this.setState({
              lists: this.state.lists.concat(response.data)
            });
          });
      });
  }

  render() {
    const lists = this.state.lists;
    return (
      <div>
        {" "}
        <br />
        <div>
          {lists.map(list => {
            return (
              <div className="card card-body mb-3">
                <div className="row">
                  <div className="col-md-8">
                    <Link to={"/DisplayListDetails/" + list.list_Name}>
                      <p style={style1}>{list.list_Name}</p>
                    </Link>
                    <br />
                    <td width="2500">{list.list_Desc}</td>
                  </div>
                  <div className="col-md-4">
                    <br />

                    <Button
                      id={list.list_Name}
                      style={style4}
                      onClick={this.handleSubscribe}
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const style1 = {
  fontFamily: "Gotham Narrow SSm",
  fontSize: 40
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
