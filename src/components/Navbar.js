import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Google Translate setup
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,hi,ta,te,ml,gu,bn,mr,pa,kn,or,ur,es,fr,de,it,ja,ko,zh-CN,ru,ar",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <img src="/shs_logo.png" alt="Santulan Holistic Solutions" />
      </div>

      {/* Hamburger Icon */}
      <div
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Tabs */}
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
            About Us
          </NavLink>
        </li>
        <li>
          <button
            className="success-tab"
            onClick={() => {
              window.open(
                "https://youtube.com/@SantulanHolisticSolutions",
                "_blank"
              );
              setIsMenuOpen(false);
            }}
          >
            Success Stories
          </button>
        </li>
        <li>
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact Us
          </NavLink>
        </li>
        {/* Only show Google Translate in menu on mobile */}
        <li className="translate-mobile">
          <div id="google_translate_element"></div>
        </li>
        
      </ul>

      {/* Keep desktop Google Translate on right */}
      <div className="translate-dropdown desktop-only" id="google_translate_element"></div>

      {/* Hotels Near Me Button (Desktop Only) */}
      <button
        className="hotels-btn desktop-only"
        onClick={() => {
          window.open(
            "https://www.google.com/maps/search/Hotels/@28.6622557,77.3533587,15z/data=!3m1!4b1!4m7!2m6!3m5!2sSantulan+Holistic+Solutions+and+Neurotherapy+Center!3s0x5a0af2e9444593f:0xef13883481b28168!4m2!1d77.358132!2d28.659551?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D"
          );
          setIsMenuOpen(false);
        }}
      >
        Hotels Near Me
      </button>

      <div className="translate-dropdown desktop-only" id="google_translate_element"></div>


    </nav>
  );
}

export default Navbar;
