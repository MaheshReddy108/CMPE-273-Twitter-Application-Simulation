import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { rooturl } from "../_config/settings";

class RetweetsChart extends Component {
  constructor(props) {
    super();
    this.state = {
      retweet_chartId: "2dbc44af-8a6c-41f1-a6c5-38d11007186e",
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
      retweet_chartId: this.state.retweet_chartId,
      username: user.username
    };

    console.log("the data sent is", data);

    axios
      .post(
        `http://${rooturl}:4500/api/charts/retweet_chart/embeddedchart`,
        data
      )
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

export default connect(mapStateToProps)(RetweetsChart);
