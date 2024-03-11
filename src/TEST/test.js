import React from "react";
import { NavLink } from 'react-router-dom';

const NavigationLinks = ({ isFullScreen, handleSwitchToggle, isSachin }) => {
  const navLinks = [
    { path: "/", icon: "home", label: "Home" },
    { path: "/Chat", icon: "chat", label: "Chat" },
    { path: "/test", icon: "chat", label: "Test" },
    { path: "/DEV", icon: "chat", label: "DEV" },
    { path: "/AX2", icon: "chat", label: "AX2" },
    { path: "/AX3", icon: "chat", label: "AX3" },
    // Add more navigation links as needed
  ];

  return (
    <div className="row">
      <div className="col s12">
        <div className="row">
          <div className="col s6 m4 l3">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text center-align">
                {navLinks.map((link, index) => (
                  <NavLink key={index} exact={link.path === "/"} to={link.path} className="btn nav-link" activeClassName="active">
                    <i className="material-icons">{link.icon}</i>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationLinks;