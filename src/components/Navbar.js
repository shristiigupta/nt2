import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  useEffect(() => {
    // Check if script already exists
    if (!window.google || !window.google.translate) {
      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }

      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }


      // Only initialize once
      window.googleTranslateElementInit = () => {
        if (!document.getElementById("google_translate_element").innerHTML) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };
    }
  }, []);

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

      {/* Google Translate Dropdown on Right */}
      <div className="translate-dropdown">
        <div id="google_translate_element"></div>
      </div>
    </nav>
  );
}

export default Navbar;
