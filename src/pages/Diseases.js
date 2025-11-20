import React, { useEffect, useState } from "react";
import "./Diseases.css";
import { incrementVisit } from "./visitTracker";
import { logVisitor } from "./visitorLogger";
import { useNavigate } from "react-router-dom";

const Diseases = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    logVisitor("Diseases Treated Page");
    incrementVisit("Diseases Treated Page");

    // Fetch diseases from Gist JSON
    fetch(
      `https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?nocache=${Date.now()}`
    )

      .then((res) => res.json())
      .then((data) => {
        // Use only the keys of the JSON (disease names)
        setServices(Object.keys(data));
      })
      .catch((err) => console.error("Error loading Gist:", err));
  }, []);

  const openDiseasePage = (name) => {
    navigate(`/disease/${encodeURIComponent(name)}`);
  };

  return (
    <div className="diseases-container">
      <h1>Diseases Treated</h1>

      <ul className="diseases-list">
        {services.map((service, index) => (
          <li key={index} onClick={() => openDiseasePage(service)}>
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diseases;
