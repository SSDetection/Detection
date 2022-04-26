import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark presblue">
        <div className="container smalllrmargin nomaxwidth">
          <NavLink className="navbar-brand" to="/archive">
          <img src="logoOU.png" width="40" height = "40"></img>
          rchive
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/archive">
                  Archive
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">

                  Example Artifact

                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/findings">
                  Findings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/submit">
                  Submit
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;