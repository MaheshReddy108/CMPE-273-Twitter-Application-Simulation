import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-responsive-modal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import AddMemberForm from "./AddMemberForm";
import { Link } from "react-router-dom";
import { rooturl } from "../_config/settings";

class OwnedLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      ownerID: "",
      lists: [],
      open: false,
      blockScroll: true,
      memberName: ""
    };
  }
  onOpenModal = () => {
    this.setState({ open: true, blockScroll: false });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    let ownerID = localStorage.getItem("user_id");
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
  }
  componentWillMount() {
    let ownerID = localStorage.getItem("user_id");
    this.setState({
      ownerID: ownerID
    });
  }
  render() {
    const { open, memberName } = this.state;
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
                    <Link
                      to={"/DisplayListDetails/" + list.list_Name}
                      //state: { result: list }
                    >
                      <p style={style1}>{list.list_Name}</p>
                    </Link>

                    <br />

                    <td width="2500">{list.list_Desc}</td>
                    <td width="500">
                      <Button style={style4} onClick={this.onOpenModal}>
                        Add Member
                      </Button>
                      <div className="overflow-auto">
                        <Modal open={open} onClose={this.onCloseModal} center>
                          <h4 className="text-center tex-secondary">
                            Add a member to this list!
                          </h4>
                          <AddMemberForm listName={list.list_Name} />
                        </Modal>
                      </div>
                    </td>
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
