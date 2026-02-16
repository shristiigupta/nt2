import React, { useEffect, useRef, useState } from "react";
import "./Reviews.css";
import { incrementVisit } from "./visitTracker";
import { logVisitor } from "./visitorLogger";

const Reviews = () => {
  const pioneerCarousel = useRef(null);
  const customerCarousel = useRef(null);

  const [customerReviews, setCustomerReviews] = useState([]);
  const [pioneerVideos, setPioneerVideos] = useState([]);

  /* ---- PAGE TITLE ---- */
  useEffect(() => {
    document.title = "Customer Reviews | Santulan Holistic Solutions";
  }, []);

  /* ---- VISITOR LOGGING ---- */
  useEffect(() => {
    logVisitor("Customer Reviews Page");
    incrementVisit("Customer Reviews Page");
  }, []);

  /* ---- FETCH DATA FROM GIST (CACHE-BUSTED) ---- */
  useEffect(() => {
    const url = `https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?ts=${Date.now()}`;

    fetch(url, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        const values = Object.values(data);

        const customer = values.filter(
          (item) => item.Category === "customer_reviews"
        );

        const pioneers = values.filter(
          (item) => item.Category === "pioneer_reviews"
        );

        setCustomerReviews(customer);
        setPioneerVideos(pioneers);
      })
      .catch((err) => {
        console.error("❌ Error loading reviews data:", err);
      });
  }, []);

  /* ---- ELFSIGHT GOOGLE REVIEWS ---- */
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

  /* ---- SCROLL HANDLERS ---- */
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  /* ---- NORMALIZE YOUTUBE URL ---- */
  const getWatchUrl = (video) =>
    `https://www.youtube.com/watch?v=${video.youtube_id}`;

  return (
    <div className="reviews-page">
      {/* ================= CUSTOMER REVIEWS ================= */}
      <section className="reviews-section">
        <h1 className="section-heading">Customer Reviews</h1>

        <div className="carousel-container">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft(customerCarousel)}
          >
            &#10094;
          </button>

          <div className="carousel customer-carousel" ref={customerCarousel}>
            {customerReviews.map((video, index) => (
              <div key={index} className="pioneer-card">
                <a
                  href={getWatchUrl(video)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                    alt={`Customer Review ${index + 1}`}
                  />
                  <div className="play-overlay">▶</div>
                </a>
              </div>
            ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scrollRight(customerCarousel)}
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* ================= GOOGLE REVIEWS ================= */}
      <section className="reviews-section">
        <div className="google-reviews-wrapper">
          <div
            className="elfsight-app-3c78991c-da6c-4440-9563-33fb19308889"
            data-elfsight-app-lazy
          ></div>
        </div>
      </section>

      {/* ================= PIONEERS ================= */}
      <section className="reviews-section pioneers-section">
        <h1 className="section-heading">
          What Pioneers Say About Neurotherapy
        </h1>

        <div className="carousel-container">
          <button
            className="scroll-btn left"
            onClick={() => scrollLeft(pioneerCarousel)}
          >
            &#10094;
          </button>

          <div className="carousel" ref={pioneerCarousel}>
            {pioneerVideos.map((video, index) => (
              <div key={index} className="pioneer-card">
                <a
                  href={getWatchUrl(video)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                    alt={`Pioneer Video ${index + 1}`}
                  />
                  <div className="play-overlay">▶</div>
                </a>
              </div>
            ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scrollRight(pioneerCarousel)}
          >
            &#10095;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
