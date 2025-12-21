import React, { useEffect, useRef, useState } from "react";
import "./HeroCarousel.css";

export default function HeroCarousel({ autoPlay = true, interval = 5000 }) {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const slidesCount = slides.length;

  useEffect(() => {
    // Fetch with cache-buster
    fetch(
      `https://gist.githubusercontent.com/santulanneurotherapy/60cde4cbffbf867715c09009ea1844a8/raw/homeimages.txt?nocache=${Date.now()}`
    )
      .then((res) => res.json())
    .then((data) => setSlides(data))
    .catch((err) => console.error("Failed to load slides from Gist", err));
  }, []); 
  

 


  useEffect(() => {
    if (!autoPlay || slidesCount === 0) return;
    startAutoplay();
    return stopAutoplay;
  }, [index, autoPlay, slidesCount]);

  function startAutoplay() {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slidesCount);
    }, interval);
  }

  function stopAutoplay() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

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
      onMouseLeave={() => autoPlay && startAutoplay()}
    >
      <div
        className="slides"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div className="slide" key={s.id}>
            <a href={s.link}>
              <img src={s.img} alt={`Slide ${i + 1}`} className="slide-img" />
            </a>
          </div>
        ))}
      </div>

      <button className="carousel-arrow left" onClick={prev}>‹</button>
      <button className="carousel-arrow right" onClick={next}>›</button>

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
