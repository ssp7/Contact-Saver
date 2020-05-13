import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Layouts/Navbar";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import ContactState from "./Context/Contact/ContactState";
import AuthState from "./Context/auth/AuthState";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Alert from "./Components/Layouts/Alerts";
import AlertState from "./Context/alert/AlertState";
import setAuthToken from "../src/utils/SetAuthToken";

if(localStorage.token) {
setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
      <Router>
        <Fragment className="App">
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
      </AlertState>
    </ContactState>
    </AuthState>
  );
};

export default App;
