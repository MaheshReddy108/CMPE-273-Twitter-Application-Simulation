import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { logoutUser } from "../actions/authActions";

class LandingPage extends Component {
  render() {
    console.log("at landing page");
    // const { isAuthenticated } = this.props.auth;
    // let redirectVar = null;
    // if (isAuthenticated) {
    //   redirectVar = <Redirect to="/home" />;
    // }
    return (
      <div>
        {/*     redirectVar */}
        <table>
          <tr>
            <td>
              <img alt="img" src={require("./twitter.png")} width={770} />
            </td>{" "}
            <td width="10%"></td>
            <td>
              <tr>
                <td>
                  <img alt="img1" src={require("./bird.png")} width={80} />
                </td>
              </tr>
              <tr>
                <div style={style}>
                  See what’s happening in <br />
                  the world right now{" "}
                </div>
              </tr>
              <tr>
                <div style={style1}>Join Twitter today.</div>
                <br />
                <div>
                  <a href="/login">
                    <button style={style2}>Login</button>
                  </a>
                  <br />
                  <br />
                  <br />

                  <a href="/signup">
                    <button style={style3}>Sign Up</button>
                  </a>
                </div>
              </tr>
            </td>
            <br />
          </tr>
        </table>
      </div>
    );
  }
}
//export default LandingPage;

var button = {
  textAlign: "center"
};
var style = {
  fontWeight: "bold",
  fontSize: 35,

  fontFamily: "Gotham Narrow SSm",
  padding: 10,

  margin: 10,
  display: "inline-block"
};
var style1 = {
  fontWeight: "bold",
  fontSize: 25,
  textAlign: "center",
  fontFamily: "Gotham Narrow SSm",
  padding: 10,

  margin: 10,
  display: "inline-block"
};
const style2 = {
  backgroundColor: "#00acee",
  color: "white",
  fontSize: 20,
  fontFamily: "Gotham Narrow SSm",
  paddingLeft: 170,
  paddingRight: 170,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 100
};
const style3 = {
  backgroundColor: "#00acee",
  color: "white",
  fontSize: 20,
  fontFamily: "Gotham Narrow SSm",
  paddingLeft: 160,
  paddingRight: 160,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 100
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(LandingPage);
