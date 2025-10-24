import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize Google Translate
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,pa,mr,ta,es,fr,de,zh-CN,ar",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );

        // Add "Select Language" placeholder
        const observer = new MutationObserver(() => {
          const select = document.querySelector("#google_translate_element select");
          if (select && !select.dataset.placeholderSet) {
            select.dataset.placeholderSet = "true";

            // Remove the default Google "G" option
            const gOption = select.querySelector("option");
            if (gOption) gOption.remove();

            // Add custom placeholder at top
            const firstOption = document.createElement("option");
            firstOption.text = "Select Language";
            firstOption.value = "";
            firstOption.selected = true;
            firstOption.disabled = true;
            select.prepend(firstOption);
          }
        });

        observer.observe(document.getElementById("google_translate_element"), {
          childList: true,
          subtree: true,
        });
      };
    }

    // Load Google Translate script only once
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

      {/* Hamburger */}
      <div
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
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
              window.open("https://youtube.com/@SantulanHolisticSolutions", "_blank");
              setIsMenuOpen(false);
            }}
          >
            Success Stories
          </button>
        </li>
        <li>
          <NavLink to="/residential" onClick={() => setIsMenuOpen(false)}>
            Residential Arrangements
          </NavLink>
        </li>

        <li>
          <NavLink to="/appointment" onClick={() => setIsMenuOpen(false)}>
            Appointment
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact Us
          </NavLink>
        </li>

      </ul>

      {/* Desktop Translate on Right */}
      <div className="desktop-right">
        <div id="google_translate_element" className="translate-dropdown"></div>
      </div>
    </nav>
  );
}

export default Navbar;
