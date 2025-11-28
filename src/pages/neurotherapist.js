import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./neurotherapist.css";

const Neurotherapist = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(
      `https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?nocache=${Date.now()}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Filter technical category
        const techVideos = Object.keys(data)
          .filter((key) => data[key].Category === "technical");
        setVideos(techVideos);
      })
      .catch((err) => console.error("Error loading Gist:", err));
  }, []);

  const openDetails = (name) => {
    navigate(`/forneurotherapist/${encodeURIComponent(name)}`);
  };

  return (
    <div className="diseases-container">
      <h1>For Neurotherapist</h1>

      <ul className="diseases-list">
        {videos.map((video, index) => (
          <li key={index} onClick={() => openDetails(video)}>
            {video}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Neurotherapist;
