import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";

function About() {
  return (
    <div className="page about-page">
      <img src="/nt_sticker.jpg" alt="Neurotherapy Sticker" className="about-img" />
    </div>
  );
}

function Contact() {
  return (
    <div className="page contact-page">
      <h2>Find Us Here</h2>
      <div className="map-container">
        <iframe
          title="Santulan Holistic Solutions"
          src="https://www.google.com/maps?q=Santulan%20Holistic%20Solutions%2C%202021%2C%20Sector%2016A%2C%20Vasundhara%2C%20Ghaziabad%2C%20Uttar%20Pradesh&output=embed"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "20px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
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
              <HeroSection />
              <ServicesSection />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
