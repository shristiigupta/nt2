// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Appointment from "./pages/Appointment";
import ResidentialArrangements from "./pages/ResidentialArrangements";
import Diseases from "./pages/Diseases";
import Dietchart from "./pages/Dietchart";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import AppointmentSlots from "./pages/AppointmentSlots";
import MonthlySlotsView from "./pages/MonthlySlotsView";
import StatsPage from "./pages/StatsPage";
import HeroCarousel from "./components/HeroCarousel";
import DiseaseDetails from "./pages/DiseaseDetails";
import Neurotherapist from "./pages/neurotherapist";
import NeuroDetails from "./pages/NeuroDetails";


import "./App.css";
import FlashScroll from "./components/FlashScroll";
import Gallery from "./pages/Gallery";
import RouteTracker from "./RouteTracker";

function App() {
  return (
    <Router>
      <RouteTracker/>
      <Navbar />
      <FlashScroll />
      <Routes>
        
        <Route path="/diseases" element={<Diseases />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment/>} />
        <Route path="/residential" element={<ResidentialArrangements />} />
        <Route path="/dietchart" element={<Dietchart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointmentSlots" element={<AppointmentSlots />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/MonthlySlotsView" element={<MonthlySlotsView />} />
        <Route path="/Statistics" element={<StatsPage />} />
        <Route path="/visitor-log" element={<RouteTracker />} />
        <Route path="/" element={<HeroCarousel />} />
        <Route path="/disease/:name" element={<DiseaseDetails />} />
        <Route path="/forneurotherapist" element={<Neurotherapist />} />
        <Route path="/forneurotherapist/:name" element={<NeuroDetails />} />
        <Route path="/gallery" element={<Gallery />} />

      </Routes>
    </Router>
  );
}

export default App;
