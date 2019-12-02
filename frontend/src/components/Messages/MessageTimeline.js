import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";


class MessageTimeline extends Component {
    constructor(props) {
      super(props);
      //maintain the state required for this component
      this.state = {
         followersResult : []    
      };

    }
      componentDidMount(){
        

       var data = {
           username :localStorage.getItem("username")
       }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:4500/api/users/get_followers', data)
        .then(response=>{
            this.setState({followersResult:response.data})
        }).catch((err) =>{
            if(err){
                this.setState({
                    errorRedirect: true
                })
            }
             })
      }

     render() {

        let redrirectVar = null;
    
        if (this.state.errorRedirect === true) {
            redrirectVar = "some error in obtaining followers" 
        }
        
        let followerList = this.state.followersResult.map(function (follower, index) {
            return (
                <div className="container display-properties-container" key={index}>
                    <Link to={'/MessageDisplay/' + follower.follower_name}>
                        <div className="follower-content row border">
                            
                            <div className="follower-content-desc col-9 hidden-xs">
                                <div>
                                    <h2><strong>{follower.follower_name}</strong></h2>
                                    <div>{follower.follower_id}</div>
                               </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })   

       return(
      <div className="cotainer">
           <div className="property-listing-content">
               {followerList}
            </div>
        </div>
       )

     }


    }


    export default MessageTimeline;