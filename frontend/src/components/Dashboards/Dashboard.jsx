import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { rooturl } from "../_config/settings";
import LikesChart from "./LikesChart";
import ViewsChart from "./ViewsChart";
import RetweetsChart from "./RetweetsChart";
import TweetsChart from "./TweetsChart";

class Dashboard extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="container">
        <table>
          <tr>
            <td>
              <LikesChart />
            </td>
            <td>
              <ViewsChart />
            </td>
          </tr>
          <tr>
            <td>
              <RetweetsChart />
            </td>
            <td>
              <TweetsChart />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errorState,
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
