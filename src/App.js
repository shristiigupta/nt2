// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import TranslateDropdown from "./components/TranslateDropdown";
import Appointment from "./pages/Appointment";
import ResidentialArrangements from "./pages/ResidentialArrangements";
import Diseases from "./pages/Diseases";
import Dietchart from "./pages/Dietchart";

import "./App.css";

function Contact() {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Lazy load map after mount for faster perceived load
  useEffect(() => {
    const t = setTimeout(() => setMapLoaded(true), 800); // 0.8s delay
    return () => clearTimeout(t);
  }, []);

  const googleMapsHref =
    "https://www.google.com/maps/search/?api=1&query=Santulan+Holistic+Solutions,+2021,+Sector+16A,+Vasundhara,+Ghaziabad,+Uttar+Pradesh";

  return (
    <div className="page contact-page">
      <h2 className="contact-title">Visit Us at Santulan Holistic Solutions</h2>
      <p className="contact-subtitle">

      </p>

      <div className="contact-section">
        {/* LEFT: Map */}
        <div className="map-wrapper">
          <div className="map-card">
            {mapLoaded ? (
              <>
                <iframe
                  title="Santulan Holistic Solutions"
                  // <-- exact-style embed that shows the place name
                  src="https://www.google.com/maps?q=Santulan%20Holistic%20Solutions%2C%202021%2C%20Sector%2016A%2C%20Vasundhara%2C%20Ghaziabad%2C%20Uttar%20Pradesh&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <div className="map-footer">
                  <a
                    href={googleMapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </>
            ) : (
              <div className="map-placeholder">🗺️ Loading Map...</div>
            )}
          </div>
        </div>

        {/* RIGHT: Visiting Card */}
        <div className="visiting-card-section">
          <div className="card">
            <img
              src="/visiting_card.jpg"
              alt="Santulan Holistic Solutions Visiting Card"
              className="visiting-card-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TranslateDropdown /> {/* Styled language selector */}
              <HeroSection />
              <ServicesSection />
            </>
          }
        />
        <Route path="/diseases" element={<Diseases />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment/>} />
        <Route path="/residential" element={<ResidentialArrangements />} />
        <Route path="/dietchart" element={<Dietchart />} />
      </Routes>
    </Router>
  );
}

export default App;
