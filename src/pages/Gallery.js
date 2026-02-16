import React, { useEffect, useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [videos, setVideos] = useState([]);

  /* -------- PAGE TITLE -------- */
  useEffect(() => {
    document.title = "Gallery | Santulan Holistic Solutions";
  }, []);

  /* -------- NORMALIZE YOUTUBE URL SAFELY -------- */
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // Already embed → do not touch
    if (url.includes("/embed/")) {
      return url.includes("autoplay")
        ? url
        : `${url}&autoplay=1&mute=1&playsinline=1`;
    }

    let videoId = null;

    if (url.includes("/shorts/")) {
      videoId = url.split("/shorts/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`;
  };

  /* -------- FETCH GALLERY (INITIAL + AUTO REFRESH) -------- */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          `https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?ts=${Date.now()}`,
          { cache: "no-store" }
        );

        const data = await res.json();
        const collected = [];

        Object.entries(data).forEach(([title, item]) => {
          // Hindi video
          if (item.video_hindi) {
            const src = getEmbedUrl(item.video_hindi);
            if (src) {
              collected.push({ title, src, lang: "Hindi" });
            }
          }

          // English video
          if (item.video_english) {
            const src = getEmbedUrl(item.video_english);
            if (src) {
              collected.push({ title, src, lang: "English" });
            }
          }

          // Customer reviews / pioneers / others
          if (item.video_link) {
            const src = getEmbedUrl(item.video_link);
            if (src) {
              collected.push({
                title,
                src,
                lang: item.Category?.replaceAll("_", " ") || "Video",
              });
            }
          }
        });

        setVideos(collected);
      } catch (err) {
        console.error("Gallery error:", err);
      }
    };

    // initial load
    fetchGallery();

    // auto refresh every 10 minutes
    const timer = setInterval(fetchGallery, 600000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="gallery-page">
      <h1 className="gallery-heading">Gallery</h1>

      <div className="video-grid">
        {videos.map((video, index) => (
          <div className="video-card" key={index}>
            <iframe
              src={video.src}
              title={`${video.title} (${video.lang})`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
