import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import WelcomePage from "./components/WelcomePage";
import LandingPage from "./components/Entry/LandingPage";
import Login from "./components/Entry/Login";
import Register from "./components/Entry/Register";
import Tweet from "./components/Feed/Tweet";
import Dashboard from "./components/Dashboards/Dashboard";
import DisplayListDetails from "./components/Lists/DisplayListDetails";
import SearchBar from "./components/Explore/SearchBar";
import MessageDisplay from "./components/Messages/MessageDisplay";
import PeopleDisplay from "./components/Explore/PeopleDisplay";

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <main>
        <div className="content">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/welcomePage" component={WelcomePage} />
              <Route path="/tweet/:id" component={Tweet} />
              <Route path="/dashboard" component={Dashboard} />
              <Route
                path="/DisplayListDetails/:list_Name"
                component={DisplayListDetails}
              />
              <Route path="/search" component={SearchBar} />
              <Route path="/MessageDisplay/:name" component={MessageDisplay} />
              <Route path="/profile/:username" component={PeopleDisplay} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
    );
  }
}

export default App;
