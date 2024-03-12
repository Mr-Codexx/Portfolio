import React from "react";
import { NavLink } from 'react-router-dom';

const NavigationLinks = ({ isFullScreen, handleSwitchToggle, isSachin }) => {
  const navLinks = [
    { path: "/", icon: "home", label: "Home" },
    { path: "/Chat", icon: "message", label: "Chat" },
    { path: "/test", icon: "assessment", label: "Test" },
    { path: "/DEV", icon: "developer_board", label: "DEV" },
    { path: "/AX2", icon: "build", label: "AX2" },
    { path: "/AX3", icon: "extension", label: "AX3" },
    
    { path: "/news", icon: "notifications", label: "Send News" },
    // Add more navigation links as needed
  ];

  return (
    <div className="row">
  <div className="col s12">
    {Array.from({ length: Math.ceil(navLinks.length / 5) }).map((_, rowIndex) => (
      <div className="row" key={rowIndex}>
        {navLinks.slice(rowIndex * 5, (rowIndex + 1) * 5).map((link, colIndex) => (
          <div className="col s6 m4 l3" key={colIndex}>
            <div className="card blue-grey darken-1" style={{ height: "80%" }}>
              <div className="card-content white-text center-align">
                <NavLink
                  exact={link.path === "/"}
                  to={link.path}
                  className="btn nav-link"
                  activeClassName="active"
                >
                  <i className="material-icons">{link.icon}</i>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
</div>

  );
};

export default NavigationLinks;
