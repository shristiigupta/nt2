import React, { useEffect, useRef } from "react";
import "./Reviews.css";

const Reviews = () => {
  const pioneerCarousel = useRef(null);

  useEffect(() => {
    function initElfsight() {
      if (window.ElfsightApp) {
        window.ElfsightApp.init();
      }
    }

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

  const scrollLeft = () => {
    pioneerCarousel.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    pioneerCarousel.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  // Pioneer video data
  const pioneerVideos = [
    { id: "AdaW0bm45YQ", link: "https://youtu.be/AdaW0bm45YQ?si=MmpdgMWP-std3Vvb" },
    { id: "tn4rSZ-HTi4", link: "https://youtu.be/tn4rSZ-HTi4?si=K_4LJVUpI2Ni6Wk3" },
    { id: "VZIoNIUHCY4", link: "https://www.youtube.com/watch?v=VZIoNIUHCY4" },
    { id: "qnyG2MR539A", link: "https://www.youtube.com/watch?v=qnyG2MR539A" },
    { id: "O9bSWaEDBVo", link: "https://www.youtube.com/shorts/O9bSWaEDBVo" },
  ];

  return (
    <div className="reviews-page">
      {/* CUSTOMER SHORTS SECTION */}
      <section className="reviews-section">
        <h1 className="section-heading">Customer Reviews</h1>

        <div className="shorts-section">
          {[
            "PZ35UixVCWk",
            "k3Jv5xC-pIA",
          ].map((videoId, index) => (
            <div key={index} className="short-card">
              <a
                href={`https://www.youtube.com/shorts/${videoId}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={`Customer Review ${index + 1}`}
                />
                <div className="play-overlay">▶</div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION */}
      <section className="reviews-section">
        
        <div className="google-reviews-wrapper">
          <div
            className="elfsight-app-3c78991c-da6c-4440-9563-33fb19308889"
            data-elfsight-app-lazy
          ></div>
        </div>
      </section>

      {/* PIONEERS SECTION */}
      <section className="reviews-section pioneers-section">
        <h1 className="section-heading">What Pioneers Say About Neurotherapy</h1>

        <div className="carousel-container">
          <button className="scroll-btn left" onClick={scrollLeft}>
            &#10094;
          </button>

          <div className="carousel" ref={pioneerCarousel}>
            {pioneerVideos.map((video, index) => (
              <div key={index} className="pioneer-card">
                <a href={video.link} target="_blank" rel="noreferrer">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={`Pioneer Video ${index + 1}`}
                  />
                  <div className="play-overlay">▶</div>
                </a>
              </div>
            ))}
          </div>

          <button className="scroll-btn right" onClick={scrollRight}>
            &#10095;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
