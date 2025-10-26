import React, { useEffect } from "react";
import "./Reviews.css";

const Reviews = () => {

  useEffect(() => {
    function initElfsight() {
      if (window.ElfsightApp) {
        window.ElfsightApp.init(); // force re-init
      }
    }

    // load script only once
    const existing = document.getElementById("elfsight-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "elfsight-script";
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      script.onload = initElfsight;
      document.body.appendChild(script);
    } else {
      initElfsight();
    }
  }, []);

  return (
    <div className="reviews-page">
      <h1>Customer Reviews</h1>

      {/* YOUTUBE VIDEOS */}
      <div className="videos-section">
        <div className="video-card">
          <a
            href="https://www.youtube.com/shorts/PZ35UixVCWk"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.youtube.com/vi/PZ35UixVCWk/maxresdefault.jpg"
              alt="Review 1"
            />
          </a>
          <p>
            Success Story — Treatment of Vision, Hearing, Breathlessness,
            Constipation, Prostrate, Knee Pain
          </p>
        </div>

        <div className="video-card">
          <a
            href="https://www.youtube.com/shorts/k3Jv5xC-pIA"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.youtube.com/vi/k3Jv5xC-pIA/maxresdefault.jpg"
              alt="Review 2"
            />
          </a>
          <p>
            Success Story — Treatment of Cervical Pain, Weakness, Calf Pain,
            Breathing Problems
          </p>
        </div>
      </div>

      {/* GOOGLE REVIEWS SECTION */}
      <div className="google-reviews-wrapper">
        <div
          className="elfsight-app-3c78991c-da6c-4440-9563-33fb19308889"
          data-elfsight-app-lazy
        ></div>
      </div>
    </div>
  );
};

export default Reviews;
