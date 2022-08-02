import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../../page/Home";
import Profil from "../../page/Profil";
import NavBar from "../NavBar";

const index = () => {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" exact component={Profil} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
