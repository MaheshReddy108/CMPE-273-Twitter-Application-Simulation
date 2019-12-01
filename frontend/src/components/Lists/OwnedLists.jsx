import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

class OwnedLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      ownerID: "",
      lists: []
    };
  }

  componentDidMount() {
    let ownerID = localStorage.getItem("user_id");
    axios
      .post("http://localhost:4500/api/lists/get_user_owned_lists", { ownerID })
      .then(response => {
        console.log("reponse of owned lists is..", response.data);
        this.setState({
          lists: this.state.lists.concat(response.data)
        });
      });
  }
  componentWillMount() {
    let ownerID = localStorage.getItem("user_id");
    this.setState({
      ownerID: ownerID
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
                    <p style={style1}>{list.list_Name}</p>
                    <br />
                    <p style={style2}>{list.list_Desc}</p>
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
