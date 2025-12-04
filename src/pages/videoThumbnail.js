import React, { useState } from "react";
import "./About.css"; // reuse your CSS

const VideoThumbnail = ({ videoUrl }) => {
  const [play, setPlay] = useState(false);

  // Extract YouTube ID from URL
  const videoId = videoUrl.split("v=")[1]?.split("&")[0];

  return (
    <div className="video-thumbnail-wrapper">
      {!play ? (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="Video thumbnail"
          className="mini-thumb"
          onClick={() => setPlay(true)}
        />
      ) : (
        <iframe
          src={`${videoUrl}?autoplay=1&modestbranding=1&rel=0&controls=1`}
          allow="autoplay; fullscreen"
          className="mini-thumb"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoThumbnail;
