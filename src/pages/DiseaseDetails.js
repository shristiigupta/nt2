import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DiseaseDetails.css";

const DiseaseDetails = () => {
  const { name } = useParams();
  const diseaseName = decodeURIComponent(name);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://gist.githubusercontent.com/shristiigupta/581b8c27346c79306c21d2a397e1e103/raw/diseases.json?nocache=${Date.now()}`)

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

  const details = data[diseaseName];

  return (
  <div className="disease-details">
    <h1>{diseaseName}</h1>

    <p>{details?.description || "No data available for this disease."}</p>

    {details?.image && (
      <img 
        src={details.image} 
        alt={diseaseName} 
        className="disease-image"
      />
    )}
  </div>
);
};

export default DiseaseDetails;
