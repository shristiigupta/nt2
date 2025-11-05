import React, {useEffect} from "react";
import "./Diseases.css";
import { incrementVisit } from "./visitTracker";

const services = [
  "Knee Pain",
  "Sciatica",
  "Back Pain",
  "Cervical",
  
];

const Diseases = () => {
  useEffect(() => {
          incrementVisit("Diseases Treated Page");
      }, []);
  return (
    <div className="diseases-container">
      <h1>Diseases Treated</h1>

      <ul className="diseases-list">
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
    </div>
  );
};

export default Diseases;
