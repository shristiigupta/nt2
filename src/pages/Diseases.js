import React from "react";
import "./Diseases.css";

const services = [
  "Knee Pain",
  "Sciatica",
  "Back Pain",
  "Cervical",
  "Joint Pain",
  "Migraine",
  "Stress Management",
  "Posture Correction",
  // Add more in future easily
];

const Diseases = () => {
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
