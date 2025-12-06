import React, { useEffect, useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);

  const fetchGallery = () => {
    fetch(
      `https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?nocache=${Date.now()}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Convert object into array of videos
        const allVideos = [];
        Object.entries(data).forEach(([title, item]) => {
          if (item.video_hindi) {
            allVideos.push({ title, src: item.video_hindi, lang: "Hindi" });
          }
          if (item.video_english) {
            allVideos.push({ title, src: item.video_english, lang: "English" });
          }
        });
        setGalleryData(allVideos);
      });
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchGallery();
      console.log("Gallery auto-refreshed");
    }, 600000); // 10 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page gallery-page">
      <section className="gallery-section">
        <h1 className="gallery-heading">Gallery</h1>

        <div className="video-grid">
          {galleryData.map((video, index) => (
            <div className="video-card" key={index}>
              <iframe
                src={video.src}
                title={`${video.title} (${video.lang})`}
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
