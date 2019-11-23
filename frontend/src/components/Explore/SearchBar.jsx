import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from 'react-router';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    //maintain the state required for this component
    this.state = {
       topicsResult : [],
       peopleResult:[],
       searchTopic:'',
       searchPeople:'Kanika'   
    };
  
    //Bind the handlers to this className
    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // Get people Data
    // this.props.searchPeople(data);

    if(this.state.searchPeople){
       axios.defaults.withCredentials = true;
       axios.post('http://localhost:4500/api/users/search_people', )
        .then(response => {
            console.log(response.data);
            this.setState({
                peopleResult: response.data
            });
          })
        }
  }
   

  onChange =e=> {
    this.setState({ searchPeople: e });
  }

  // onSubmit = e => {
  //   e.preventDefault();

  //   console.log("Search data");
  //   const data = {
  //     Search: this.state.Search,
  //     Cuisine: this.state.Cuisine
  //   };
  //   console.log("search people string is" + JSON.stringify(data.searchPeople));

  //   // this.props.searchItem(data.searchPeople, this.props.history);
  // };

   





  render() {


    let peopleList = this.state.peopleResult.map(function (people, index) {
      return (
          <div className="container display-properties-container" key={index}>
              <Link to={'/people-display/' + people.peopleId}>
                  <div className="people-content row border">
                      {/* <div className="people-content-image col-3">
                          <img className="people-image" src={people.Photos} alt="people-image" />
                      </div> */}
                      <div className="people-content-desc col-9 hidden-xs">
                          <div>
                              <h2><strong>{people.username}</strong></h2>
                              <div>FirstName : {people.first_name}</div>
                              <div>LaststName : {people.last_name}</div>
                              <div>Email : {people.email}</div>

                          </div>
                          
                      </div>

                  </div>
              </Link>
          </div>
      )
  })



  return (
      

    <div>
    <div className="cotainer">
    <div className="form-group row search-tab container search-tab-display-property">
        <span className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pad-bot-10">
            <input type="search" className="form-control form-control-lg" placeholder="Search" value={this.state.searchPeople} onChange={this.onChange}></input>
        </span>
      
        <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
            <a href="/search" className="btn btn-primary btn-lg" style={{ width: "100%" }}>Search</a>
        </span>
    </div>
    <div className="property-listing-content">
        {peopleList}
    </div>                    
    
</div>
</div>
    )
  }
}







export default SearchBar;
