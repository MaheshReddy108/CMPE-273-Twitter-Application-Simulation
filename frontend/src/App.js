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
import DisplayListDetails from "./components/Lists/DisplayListDetails";

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
              <Route
                path="/DisplayListDetails/:list_Name"
                component={DisplayListDetails}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
    );
  }
}

export default App;
