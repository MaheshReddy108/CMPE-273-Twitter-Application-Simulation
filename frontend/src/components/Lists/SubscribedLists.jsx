import React, { Component } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";

class SubscribedLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    let username = localStorage.getItem("username");
    axios
      .post("http://localhost:4500/api/lists/get_subscribed_lists", {
        username
      })
      .then(response => {
        console.log("reponse of owned lists is..", response.data);
        this.setState({
          lists: this.state.lists.concat(response.data)
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

export default SubscribedLists;
