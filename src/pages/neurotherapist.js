import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./neurotherapist.css";
import { incrementVisit } from "./visitTracker";
import { logVisitor } from "./visitorLogger";

const Neurotherapist = () => {
  const navigate = useNavigate();
  const [groupedVideos, setGroupedVideos] = useState({});

  useEffect(() => {
    logVisitor("Neurotherapist corner");
    incrementVisit("Neurotherapist corner");

    fetch(
      `https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?nocache=${Date.now()}`
    )
      .then((res) => res.json())
      .then((data) => {
        const techItems = Object.keys(data).filter(
          (key) => data[key].Category === "technical"
        );

        // Group by subCategory if exists, else "Other"
        const groups = {};
        techItems.forEach((item) => {
          const subCat = data[item].subCategory || "Other";
          if (!groups[subCat]) groups[subCat] = [];
          groups[subCat].push(item);
        });

        setGroupedVideos(groups);
      })
      .catch((err) => console.error("Error loading Gist:", err));
  }, []);

  const openDetails = (name) => {
    navigate(`/forneurotherapist/${encodeURIComponent(name)}`);
  };

  return (
    <div className="diseases-container">
      {Object.keys(groupedVideos).map((subCat, idx) => (
        <div key={idx} className="subcategory-section">
          <h1>{subCat}</h1>

          <ul className="diseases-list">
            {groupedVideos[subCat].map((video, index) => (
              <li key={index} onClick={() => openDetails(video)}>
                {video}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Neurotherapist;
