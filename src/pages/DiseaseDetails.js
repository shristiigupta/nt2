import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DiseaseDetails.css";

const DiseaseDetails = () => {
  const { name } = useParams();
  const diseaseName = decodeURIComponent(name);

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

  const details = data[diseaseName];

  if (!details)
    return <p style={{ textAlign: "center" }}>No information available.</p>;

  return (
    <div className="disease-details">
      <h1>{diseaseName}</h1>

      <div className="content-layout">

        {/* HINDI VIDEO */}
        {details.video_hindi && (
          <div className="video-section">
            <iframe
              width="100%"
              height="300"
              src={details.video_hindi}
              title="Hindi Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* ENGLISH VIDEO */}
        {details.video_english && (
          <div className="video-section">
            <iframe
              width="100%"
              height="300"
              src={details.video_english}
              title="English Video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* PDF PREVIEW */}
        {details.pdf && (
          <div className="pdf-section">
            <iframe
              src={details.pdf}
              width="100%"
              height="300"
              title="PDF Preview"
              className="pdf-preview"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetails;
