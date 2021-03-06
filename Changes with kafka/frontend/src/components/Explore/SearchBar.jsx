import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchUser } from "../_actions/userActions";
import { searchTopic } from "../_actions/tweetAction";
import Pagination from "react-js-pagination";
import Button from "react-bootstrap/Button";
// import Pagination from "./Pagination";
// import "bootstrap/less/bootstrap-less";
import "bootstrap/dist/css/bootstrap.min.css";
// require("bootstrap/less/bootstrap.less");

// import Pagination from 'react-bootstrap/Pagination'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    //maintain the state required for this component
    this.state = {
      topicsResult: [],
      peopleResult: [],
      searchTopic: "",
      searchText: "",
      activePage: "1",
      resultsPerPage: "3"
    };

    //Bind the handlers to this className
    this.onChange = this.onChange.bind(this);
    this.handlePeople = this.handlePeople.bind(this);
    this.handleTopic = this.handleTopic.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  onChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handlePeople = e => {
    e.preventDefault();
    var data = {
      searchText: this.state.searchText
    };
    console.log(data);
    this.setState({ topicResult: [] });
    this.props.searchUser(data);
  };

  handleTopic = e => {
    e.preventDefault();
    var data_topic = {
      searchText: this.state.searchText
    };
    console.log(data_topic);
    this.setState({ peopleResult: [] });
    this.props.searchTopic(data_topic);
  };

  handlePageChange(pageNumber) {
    console.log(`current page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    const { peopleResult } = this.props.userState;
    var length = peopleResult.length;
    console.log("length", length);
    console.log("peopleresult", peopleResult);

    let message = this.props.errors.error;
    console.log("Error Message", message);

    // const {activePage,resultsPerPage}=this.State
    const activePage = this.state.activePage;
    const resultsPerPage = this.state.resultsPerPage;

    const indexOfLastTodo = activePage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
    const currentTodos = peopleResult.slice(indexOfFirstTodo, indexOfLastTodo);

    let peopleList = currentTodos.map(function(people, index) {
      return (
        <div className="container display-properties-container" key={index}>
          {/*<Link to={"/profile/" + people.username}>*/}

          <Link
            to={{
              pathname: "/profile/" + people.username,
              state: {
                display_id: people._id
              }
            }}
          >
            <div className="people-content row border">
              {/* <div className="people-content-image col-3">
                          <img className="people-image" src={people.Photos} alt="people-image" />
                      </div> */}
              <div className="people-content-desc col-9 hidden-xs">
                <div style={style1}>
                  {people.first_name} {people.last_name}
                  <br />@{people.username}
                </div>

                <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10"></span>
              </div>
            </div>
            <br />
          </Link>
        </div>
      );
    });

    const { topicResult } = this.props.tweetState;

    let topicList = topicResult.map(function(topic, index) {
      return (
        <div className="container display-properties-container" key={index}>
          <Link to={"/tweet-display/" + topic.tweetId}>
            <div className="people-content row border">
              {/* <div className="people-content-image col-3">
                                <img className="people-image" src={people.Photos} alt="people-image" />
                            </div> */}
              <div className="people-content-desc col-9 hidden-xs">
                <div>
                  <h2>
                    <strong>{topic.tweet_content}</strong>
                  </h2>
                  <div>UserName : {topic.username}</div>
                  <div>
                    Hashtags :
                    <strong>
                      {" "}
                      <h2>#{topic.hashtags[0]}</h2>
                    </strong>
                  </div>
                  <div>Date : {topic.tweeted_date}</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div>
        <div className="container mt-5">
          <div className="form-group row search-tab container search-tab-display-property">
            <span className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pad-bot-10">
              <input
                type="search"
                className="form-control form-control-lg"
                placeholder="Search"
                value={this.state.searchText}
                onChange={this.onChange}
              ></input>
            </span>

            <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
              {/*<a
                className="btn btn-primary btn-lg"
                style={{ width: "100%" }}
                onClick={this.handlePeople}
              >
                People
              </a>*/}
              <Button style={style4} onClick={this.handlePeople}>
                People
              </Button>
            </span>

            <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
              {/*} <a
                className="btn btn-primary btn-lg"
                style={{ width: "100%" }}
                onClick={this.handleTopic}
              >
                Topics
              </a>*/}
              <Button style={style4} onClick={this.handleTopic}>
                Topics
              </Button>
            </span>
          </div>
          <div className="property-listing-content">{peopleList}</div>
          <div className="property-listing-content">{topicList}</div>
          <div>
            <h1 style={{ color: "red" }}>
              <strong>{message}</strong>
            </h1>
          </div>
        </div>
        <div class="button" width="1000px">
          <Pagination
            style={{ width: "1000px" }}
            activePage={this.state.activePage}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
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
const mapStateToProps = state => ({
  userState: state.userState,
  errors: state.errorState,
  tweetState: state.tweetState
});
const style1 = {
  fontFamily: "Gotham Narrow SSm",
  fontSize: 25
};
export default connect(mapStateToProps, { searchTopic, searchUser })(SearchBar);

// export default SearchBar;
