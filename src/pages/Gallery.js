

import React, { useEffect, useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState({});

  const fetchGallery = () => {
    fetch(`https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?nocache=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => setGalleryData(data));
  };

  // ⬇️ Fetch once when page loads
  useEffect(() => {
    fetchGallery();
  }, []);

  // ⬇️ Auto-refresh every 10 minutes (600,000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchGallery();
      console.log("Gallery auto-refreshed");
    }, 600000); // 10 minutes

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="page gallery-page">
      <section className="gallery-section">
        <h1 className="gallery-heading">Gallery</h1>

        <div className="video-grid">
          {Object.entries(galleryData).map(([title, item], index) => (
            <div className="video-card" key={index}>
              <iframe
                src={item.video_hindi}
                title={title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;

