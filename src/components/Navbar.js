import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <img src="/shs_logo.png" alt="Santulan Holistic Solutions" />
      </div>

      {/* Navigation Tabs */}
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li>
          <button
            className="success-tab"
            onClick={() =>
              window.open(
                "https://youtube.com/@SantulanHolisticSolutions",
                "_blank"
              )
            }
          >
            Success Stories
          </button>
        </li>
        <li>
          <NavLink to="/contact">Contact Us</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
