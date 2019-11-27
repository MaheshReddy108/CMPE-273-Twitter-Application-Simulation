import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import PropTypes from "prop-types";
import { logoutUser } from "../_actions/authActions";

class NavBarHome extends Component {
  logout = e => {
    //this.props.logoutUser();
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    const username = localStorage.getItem("username");
    return (
      <div className="container">
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand className="active" href="#">
            Twitter<span className="sr-only active">(current)</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown
                title={`Hi ${username}`}
                id="collasible-nav-dropdown"
                alignright="true"
              >
                <NavDropdown.Divider />

                <NavDropdown.Item href="#" onClick={this.logout}>
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div></div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

NavBarHome.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { logoutUser })(NavBarHome);
