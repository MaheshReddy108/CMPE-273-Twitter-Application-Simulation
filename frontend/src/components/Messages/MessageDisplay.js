import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WelcomePage from "../WelcomePage"
import swal from 'sweetalert'

class MessageDisplay extends Component {
    constructor(props) {
      super(props);
      //maintain the state required for this component
      this.state = {
         IncomingMessages : [],
         OutgoingMessages:[],
         messageText:'',
         SenderName:localStorage.getItem("username"),
         Receivername: this.props.match.params.name
      };
//Bind the handlers to this className
this.onChange = this.onChange.bind(this);
this.handleMessage = this.handleMessage.bind(this);
    }


    onChange =e=> {
        this.setState({ messageText: e.target.value });
      }


      handleMessage(text){
          var data_send={
              message: this.state.messageText,
              sender_name: localStorage.getItem("username"),
             receiver_name :this.props.match.params.id

          }

          axios.post('http://localhost:4500/api/message/send_message', data_send)
          .then(response=>{

            if(response.status==200){
                this.setState({loading:"true"})
                swal("Message sent"," You can now see Messages!", "success")
            }

          })
      }

    

      componentDidMount(){
        

       var data_get = {
           sender_name:localStorage.getItem("username"),
           receiver_name :this.props.match.params.name
       }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:4500/api/message/get_messages', data_get)
        .then(response=>{
            this.setState({IncomingMessages:response.data[1],OutgoingMessages:response.data[0]})
        }).catch((err) =>{
            if(err){
                this.setState({
                    errorRedirect: true
                })
            }
             })
      }


      render(){


        let IncomingList = this.state.IncomingMessages.map(function (message, index) {
            return (
                <div className="container  mt-5" key={index}>
                    <Link to={'/message-display/' + message.message_id}>
                        <div className=" row border" style={{ width:"500px"}}>
                            
                            <div className="container py-3 mt-3" >
                                <div >
                                    <h7 style={{ color:"black"}}><strong>{message.sender_name}</strong></h7>
                                    {/* <div>{message.receiver_id}</div> */}
                                    <div><h3>{message.message}</h3></div>
                               </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })   
        let OutgoingList = this.state.OutgoingMessages.map(function (message, index) {
            return (
                <div className="container  mt-5" key={index}>
                    <Link to={'/message-display/' + message.message_id}>
                        <div className=" row border text-right" style={{ width:"500px"}}>
                            
                            <div className="text-right">
                                <div >
                                    <h7 style={{ color:"black"}}><strong>{message.sender_name}</strong></h7>
                                    {/* <div>{message.receiver_id}</div> */}
                                    <div className="text-right"><h3>{message.message}</h3></div>
                               </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })   
        return(
             
           <div>

            <div>
               {IncomingList}
            </div>
            <div>
            {OutgoingList}
            </div>

            <div className="container mt-5">
    <div className="form-group row search-tab container search-tab-display-property">
        <span className="col-lg-4 col-md-12 col-sm-12 col-xs-12 pad-bot-10">
            <input type="search" className="form-control form-control-lg" placeholder="Type your message" value={this.state.messageText} onChange={this.onChange}></input>
        </span>
      
        <span className="col-lg-2 col-md-3 col-sm-12 col-xs-12 pad-bot-10">
            <a  className="btn btn-success btn-lg" style={{ width: "100%" }} onClick={this.handleMessage}>Send </a>
            </span>
            </div>
            </div>

            </div>
        )
      }



    }

    export default MessageDisplay;