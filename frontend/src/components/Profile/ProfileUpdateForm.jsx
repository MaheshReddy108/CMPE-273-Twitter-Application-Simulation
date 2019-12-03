import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class ProfileUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "False",
      msg: "",
      value:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.setState({
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      description: this.props.description,
      city: this.props.city,
      state: this.props.state,
      zipcode: this.props.zipcode
    });
  }
  handleChange(e) {
    
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      username: localStorage.getItem("username"),
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      description: this.state.description,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode
    };
    //console.log("data is............", data);
    axios
      .post("http://localhost:4500/api/users/update_profile", data)
      .then(response => {
        console.log("response of update is....", response.data);
        this.setState = {
          auth: "True",
          msg: "Successfully Updated!"
        };
      })
      .catch(function(error) {
        this.setState = {
          auth: "False",
          msg: "Something went Wrong. Try again later!"
        };
        console.log(error);
      });
  };
  render() {
    const {
      first_name,
      last_name,
      description,
      city,
      state,
      zipcode
    } = this.state;
    return (
      <form
        className="needs-validation container novalidate content-form-padding"
        onSubmit={this.handleSubmit}
      >
        <div>
          <div className="form-row"></div>
          <div className="form-row form-group">
            <div className="col-md-6 ">
              <label htmlFor="inputFirstname">First name</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="first_name"
                className="form-control"
                id="inputFirstname"
                placeholder="First name"
                defaultValue={first_name}
                required
              />
              <div className="invalid-feedback">First Name is Required.</div>
            </div>
            <div className="col-md-6 ">
              <label htmlFor="inputLastname">Last name</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="last_name"
                className="form-control"
                id="inputLastname"
                placeholder="Last name"
                defaultValue={last_name}
                required
              />
              <div className="invalid-feedback">Last Name is Required.</div>
            </div>
            <br />
            <br />
            <div className="col-md-12 ">
              <label htmlFor="inputDescription">Description</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="description"
                className="form-control"
                id="inputDescription"
                placeholder="Description"
                defaultValue={description}
                required
              />
              <div className="invalid-feedback">Description is Required.</div>
            </div>
            <br />
            <br />
            <div className="col-md-4">
              <label htmlFor="inputCity">City</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="city"
                className="form-control"
                id="inputCity"
                placeholder="City"
                defaultValue={city}
                required
              />
              <div className="invalid-feedback">City is Required.</div>
            </div>
            <div className="col-md-4 ">
              <label htmlFor="inputState">State</label>
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="Alabama-AL">Alabama -AL</option>
                <option value="Alaska-Ak">Alaska -AK</option>
                <option value="Arkansas - AR">Arkansas -AR</option>
                <option value="California - CA">California - CA</option>
                <option value="Colorado - CO">Colorado - CO</option>
                <option value="Connecticut - CT">Connecticut - CT</option>
                <option value="Delaware - DE">Delaware - DE</option>
                <option value="Florida - FL">Florida - FL</option>
                <option value="Georgia - GA">Georgia - GA</option>
                <option value="Hawaii - HI">Hawaii - HI</option>
                <option value="Idaho - ID">Idaho - ID</option>
                <option value="Illinois - IL">Illinois - IL</option>
                <option value="Indiana - IN">Indiana - IN</option>
                <option value="Iowa - IA">Iowa - IA</option>
                <option value="Kansas - KS">Kansas - KS</option>
                <option value="Kentucky - KY">Kentucky - KY</option>
                <option value="Louisiana - LA">Louisiana - LA</option>
                <option value="Maine - ME">Maine - ME</option>
                <option value="Maryland - MD">Maryland - MD</option>
                <option value="Massachusetts - MA">Massachusetts - MA</option>
                <option value="Michigan - MI">Michigan - MI</option>
                <option value="Minnesota - MN">Minnesota - MN</option>
                <option value="Mississippi - MS">Mississippi - MS</option>
                <option value="Missouri - MO">Missouri - MO</option>
                <option value="Montana - MT">Montana - MT</option>
                <option value="Nebraska - NE">Nebraska - NE</option>
                <option value="Nevada - NV">Nevada - NV</option>
                <option value="New Hampshire - NH">New Hampshire - NH</option>
                <option value="New Jersey - NJ">New Jersey - NJ</option>
                <option value="New Mexico - NM">New Mexico - NM</option>
                <option value="New York - NY">New York - NY</option>
                <option value="North Carolina - NC">North Carolina - NC</option>
                <option value="North Dakota - ND">North Dakota - ND</option>
                <option value="Ohio - OH">Ohio - OH</option>
                <option value="Oklahoma - OK">Oklahoma - OK</option>
                <option value="Oregon - OR">Oregon - OR</option>
                <option value="Pennsylvania - PA">Pennsylvania - PA</option>
                <option value="Rhode Island - RI">Rhode Island - RI</option>
                <option value="South Carolina - SC">South Carolina - SC</option>
                <option value="South Dakota - SD">South Dakota - SD</option>
                <option value="Tennessee - TN">Tennessee - TN</option>
                <option value="Texas - TX">Texas - TX</option>
                <option value="TUtah - UT">TUtah - UT</option>
                <option value="Vermont - VT">Vermont - VT</option>
                <option value="Virginia - VA">Virginia - VA</option>
                <option value="Washington - WA">Washington - WA</option>
                <option value="West Virginia - WV">West Virginia - WV</option>

                

              </select>
              <input
                onChange={this.handleChange}
                type="text"
                name="state"
                className="form-control"
                id="inputState"
                placeholder="State"
                defaultValue={state}
                required
              />
              <div className="invalid-feedback">State is Required.</div>
            </div>
            <div className="col-md-4">
              <label htmlFor="inputZipCode">ZipCode</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="zipcode"
                className="form-control"
                id="inputZipCode"
                placeholder="ZipCode"
                required pattern='/^[0-9{5}(?:-[0-9]{4})?$/'
                defaultValue={zipcode}
                required
              />
              <div className="invalid-feedback" hidden={}>ZipCode is Required.</div>
            </div>
          </div>

          <div className="form-row">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <div> {this.state.msg} </div>
          </div>
        </div>
      </form>
    );
  }
}
export default ProfileUpdateForm;
