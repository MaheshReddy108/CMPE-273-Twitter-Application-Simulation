import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import WelcomePage from "./components/WelcomePage";
import LandingPage from "./components/Entry/LandingPage";

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <main className="container">
        <div className="content">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route component={WelcomePage} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
    );
  }
}

export default App;
