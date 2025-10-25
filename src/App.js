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
import Contact from "./pages/Contact";
import About from "./pages/About";

import "./App.css";

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}

export default App;
