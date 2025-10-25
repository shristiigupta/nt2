import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_mobile"
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      setTimeout(() => {
        window.googleTranslateElementInit();
      }, 500); // delay to ensure menu div exists
    }
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <img src="/shs_logo.png" alt="Santulan Holistic Solutions" />
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
        </li>
        <li>
          <NavLink to="/Diseases" onClick={() => setIsMenuOpen(false)}>Diseases <br/>Treated</NavLink>
        </li>

        <li>
          <NavLink to="/dietchart" onClick={() => setIsMenuOpen(false)}>Diet Chart</NavLink>
        </li>
        
        <li>
          <button
            className="success-tab"
            onClick={() => {
              window.open("https://youtube.com/@SantulanHolisticSolutions", "_blank");
              setIsMenuOpen(false);
            }}
          >
            Success <br/>Stories
          </button>
        </li>
        <li>
          <NavLink to="/residential" onClick={() => setIsMenuOpen(false)}>Residential <br/> Arrangements</NavLink>
        </li>
        <li>
          <NavLink to="/appointment" onClick={() => setIsMenuOpen(false)}>Appointment</NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
        </li>

        {/* Google Translate Mobile */}
        <li className="translate-mobile">
          <div id="google_translate_mobile"></div>
        </li>
      </ul>

      {/* Desktop Google Translate */}
      <div className="desktop-right">
        <div id="google_translate_element" className="translate-dropdown"></div>
      </div>
    </nav>
  );
}

export default Navbar;
