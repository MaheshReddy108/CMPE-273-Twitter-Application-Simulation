import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { rooturl } from "../_config/settings";

class LikesChart extends Component {
  constructor(props) {
    super();
    this.state = {
      like_chartId: "f2558097-8faa-4bb4-b47a-4d61fb947eb7",
      iframeId: "embeddedChart",
      username: "",
      url: ""
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    console.log("the user is ", user.username);
    this.setState({
      username: user.username
    });

    const data = {
      like_chartId: this.state.like_chartId,
      username: user.username
    };

    console.log("the data sent is", data);

    axios
      .post(`http://${rooturl}:4500/api/charts/like_chart/embeddedchart`, data)
      .then(response => {
        console.log("response is", response.data);
        this.setState({
          url: response.data
        });
      })
      .catch(err => console.log("the error is ", err));
  }

  render() {
    const { url } = this.state;
    return (
      <div>
        <div>
          {" "}
          <iframe title="embeddedChart" width="500" height="400" src={url} />
          <p>
            If you're getting an error code instead of a chart,
            <a
              href="https://docs.mongodb.com/charts/saas/embedding-charts/#embedded-charts-error-codes"
              target="_blank"
            >
              click here
            </a>
            to find out what the code means.
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errorState,
  auth: state.auth
});

export default connect(mapStateToProps)(LikesChart);
