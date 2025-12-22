import React, { useEffect, useRef, useState, useCallback } from "react";
import "./HeroCarousel.css";

export default function HeroCarousel({ autoPlay = true, interval = 5000 }) {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const slidesCount = slides.length;

  // 🔹 Fetch slides (runs once)
  useEffect(() => {
    fetch(
      `https://gist.githubusercontent.com/santulanneurotherapy/60cde4cbffbf867715c09009ea1844a8/raw/homeimages.txt?nocache=${Date.now()}`
    )
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) =>
        console.error("Failed to load slides from Gist", err)
      );
  }, []);

  // 🔹 Stop autoplay
  const stopAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 🔹 Start autoplay (stable reference)
  const startAutoplay = useCallback(() => {
    if (!autoPlay || slidesCount === 0) return;

    stopAutoplay();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slidesCount);
    }, interval);
  }, [autoPlay, interval, slidesCount, stopAutoplay]);

  // 🔹 Autoplay effect (CI-safe)
  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  function goTo(i) {
    setIndex((i + slidesCount) % slidesCount);
  }

  function prev() {
    goTo(index - 1);
  }

  function next() {
    goTo(index + 1);
  }

  if (slidesCount === 0) return null;

  return (
    <header
      className="hero-carousel"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div
        className="slides"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div className="slide" key={s.id || i}>
            <a
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={s.img}
                alt={`Slide ${i + 1}`}
                className="slide-img"
              />
            </a>
          </div>
        ))}

      </div>

      <button className="carousel-arrow left" onClick={prev}>
        ‹
      </button>
      <button className="carousel-arrow right" onClick={next}>
        ›
      </button>

      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`indicator ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </header>
  );
}
