import React from "react";
import { NavLink } from "react-router-dom";

//COMPONENT DE LA NAV BAR LATERALE
const LeftNavBar = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <NavLink exact to="/" activeClassName="active-nav">
          <img src="/img/home.png" alt="home" />
        </NavLink>
        <br />
        <NavLink exact to="/profil" activeClassName="active-nav">
          <img src="/img/user.png" alt="user" />
        </NavLink>
      </div>
    </div>
  );
};

export default LeftNavBar;
