import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Redirect } from "react-router-dom";
import CreateListForm from "./CreateListForm";
import Modal from "react-responsive-modal";
import axios from "axios";

class ListsDisplay extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      open: false,
      blockScroll: true,
      l_Name: "",
      l_Desc: "",
      ownerID: ""
    };
  }
  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  componentWillMount() {
    let username = localStorage.getItem("username");
    let ownerID = localStorage.getItem("user_id");
    this.setState({
      username: username,
      ownerID: ownerID
    });
  }
  render() {
    let redirectVar = null;
    if (localStorage.getItem("jwtToken") == null) {
      redirectVar = <Redirect to="/" />;
    }
    const { username, ownerID, l_Desc, l_Name, open } = this.state;
    return (
      <div>
        {redirectVar}

        <div className="card text-white bg-secondary  col-12" style={style1}>
          <div className="card-header">
            Lists
            <br /> <p style={style2}>@ {username}</p>
          </div>
          <table>
            <tr>
              <td>
                <Button style={style4} onClick={this.onOpenModal}>
                  Create List
                </Button>
                <div className="overflow-auto">
                  <Modal open={open} onClose={this.onCloseModal} center>
                    <h4 className="text-center tex-secondary">
                      Create a new List.
                    </h4>
                    <CreateListForm
                      l_Name={l_Name}
                      l_Desc={l_Desc}
                      ownerID={ownerID}
                    />
                  </Modal>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
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
export default ListsDisplay;
