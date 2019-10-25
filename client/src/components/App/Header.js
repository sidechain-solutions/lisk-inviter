import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <NavLink to="/" className="navbar-brand">
      <h3>
        <FontAwesomeIcon icon="user-plus" /> LISK INVITER
      </h3>
    </NavLink>

    <div className="navbar pt-2" id="navbarsExampleDefault">
      <NavLink to="/events" className="nav-link text-light">
        Events
      </NavLink>

      <NavLink to="/account" className="nav-link text-light">
        Account
      </NavLink>

      <NavLink to="/create-event" className="nav-link text-light">
        Create Event
      </NavLink>
    </div>
  </nav>
);

export default Header;
