import React, { useEffect, useState } from "react";
import "./Diseases.css";
import { incrementVisit } from "./visitTracker";
import { logVisitor } from "./visitorLogger";
import { useNavigate } from "react-router-dom";

const Diseases = () => {
  const navigate = useNavigate();
  const [groupedDiseases, setGroupedDiseases] = useState({});

  useEffect(() => {
    logVisitor("Diseases Treated Page");
    incrementVisit("Diseases Treated Page");

    fetch(
      `https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?nocache=${Date.now()}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Filter only items having Category = "diseases"
        const diseaseItems = Object.keys(data).filter(
          (item) => data[item].Category === "diseases"
        );

        // Group items by subCategory
        const groups = {};
        diseaseItems.forEach((item) => {
          const subCat = data[item].subCategory || "Other";
          if (!groups[subCat]) groups[subCat] = [];
          groups[subCat].push(item);
        });

        setGroupedDiseases(groups);
      })
      .catch((err) => console.error("Error loading Gist:", err));
  }, []);

  const openDiseasePage = (name) => {
    navigate(`/disease/${encodeURIComponent(name)}`);
  };

  return (
    <div className="diseases-container">
      {Object.keys(groupedDiseases).map((subCat, idx) => (
        <div key={idx} className="subcategory-section">
          {/* SubCategory heading styled like main diseases heading */}
          <h1>{subCat}</h1>

          <ul className="diseases-list">
            {groupedDiseases[subCat].map((disease, index) => (
              <li key={index} onClick={() => openDiseasePage(disease)}>
                {disease}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Diseases;
