import React from "react";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Revitalize Your Health Naturally</h1>
        <p>
          At <strong>Santulan Holistic Solutions</strong>, we help you overcome
          pain and health issues — completely <em>without medicines, surgery, or discomfort</em>.
          Through the proven science of <strong>Neurotherapy</strong>, we restore your body’s
          natural balance and empower you to live a pain-free, healthy, and energetic life.
        </p>

        <div
          className="success-link"
          onClick={() =>
            window.open("https://youtube.com/@SantulanHolisticSolutions", "_blank")
          }
        >
          🎥 View Success Stories
        </div>
        
      </div>

      <div className="hero-image">
        <img src="/nt_home.png" alt="Neurotherapy Experts" />
      </div>
    </section>
  );
}

export default HeroSection;
