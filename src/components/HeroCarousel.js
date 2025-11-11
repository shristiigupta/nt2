import React, { useEffect, useRef, useState } from "react";
import "./HeroCarousel.css";

/**
 * Usage:
 * - Put image files in public/ (or adjust src paths)
 * - Replace slide contents below as needed.
 */

const slides = [
  {
    id: 1,
    img: "/hero_img1.jpg", // replace with /nt_home.png or other
    title: "Revitalize Your Health Naturally",
    subtitle: "Restore balance with proven Neurotherapy — without medicines or surgery.",
    cta: { text: "Learn More", href: "#about" }
  },
  {
    id: 2,
    img: "/hero_img2.jpg",
    title: "Gentle • Scientific • Effective",
    subtitle: "Personalized sessions that focus on root causes, not just symptoms.",
    cta: { text: "Book Consultation", href: "#contact" }
  },
  {
    id: 3,
    img: "/hero_img3.jpg",
    title: "Trusted Care for All Ages",
    subtitle: "Experienced therapists helping you and your family regain vitality.",
    cta: { text: "Our Treatments", href: "#services" }
  }
];

export default function HeroCarousel({ autoPlay = true, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const slidesCount = slides.length;
  const timerRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoPlay]);

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

  return (
    <header
      className="hero-carousel"
      onMouseEnter={() => stopAutoplay()}
      onMouseLeave={() => autoPlay && startAutoplay()}
      ref={carouselRef}
      aria-roledescription="carousel"
    >
      <div
        className="slides"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            className="slide"
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slidesCount}`}
          >
            <img src={s.img} alt={s.title} className="slide-img" />
            
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-arrow left"
        onClick={prev}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="carousel-arrow right"
        onClick={next}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="carousel-indicators" role="tablist" aria-label="Slides">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`indicator ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === index}
            role="tab"
          />
        ))}
      </div>
    </header>
  );
}
