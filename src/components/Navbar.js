import React from "react";
import { Link } from "react-router-dom";
//import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-link">
          <img src="/shs_logo.png" alt="Santulan Holistic Solutions" className="logo-img" />
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <button
          className="signin-btn"
          onClick={() => window.open("https://youtube.com/@SantulanHolisticSolutions", "_blank")}
        >
          Success Stories
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
