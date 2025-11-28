import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DiseaseDetails.css"; // reuse same styles

const NeuroDetails = () => {
  const { name } = useParams();
  const videoName = decodeURIComponent(name);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?nocache=${Date.now()}`
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading Gist:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const details = data[videoName];

  if (!details)
    return <p style={{ textAlign: "center" }}>No information available.</p>;

  // Collect all available sections dynamically
  const sections = [];
  if (details.video_hindi) sections.push({ type: "Hindi Video", src: details.video_hindi });
  if (details.video_english) sections.push({ type: "English Video", src: details.video_english });
  if (details.pdf) sections.push({ type: "PDF", src: details.pdf });

  return (
    <div className="disease-details">
      <h1>{videoName}</h1>

      <div className="content-layout" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {sections.map((section, index) => (
          <div
            key={index}
            style={{ flex: 1, minWidth: "280px", textAlign: section.type === "PDF" ? "center" : "left" }}
          >
            {section.type === "PDF" ? (
              <iframe
                src={section.src}
                width="100%"
                height="300"
                title="PDF Preview"
                className="pdf-preview"
                style={{ borderRadius: "10px", border: "1px solid #ccc" }}
              ></iframe>
            ) : (
              <iframe
                width="100%"
                height="300"
                src={section.src}
                title={section.type}
                frameBorder="0"
                allowFullScreen
                style={{ borderRadius: "10px" }}
              ></iframe>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeuroDetails;
