import React , { useEffect }  from "react";
import { incrementVisit } from "../pages/visitTracker"

function HeroSection() {
  useEffect(() => {
    incrementVisit("Home Page");
  }, []);
  return (
    
    <section className="hero">
      <div className="hero-content">
        <h1>Revitalize Your Health Naturally</h1>
        <p>
          At <strong>Santulan Holistic Solutions</strong>, we help you overcome
          pain and health issues — <em>without medicines, without surgery, without pain</em>.
          Through the proven science of <strong>Neurotherapy</strong>, restore your body’s
          natural balance and empower you to live a pain-free, healthy, and energetic life.
        </p>
        <h2 className="notranslate" translate="no">
          चलो एक बार फिर से, स्वस्थ हो जाए...
        </h2>
      </div>

      <div className="hero-image">
        <img src="/nt_home.png" alt="Neurotherapy Experts" />
      </div>
    </section>
  );
}

export default HeroSection;
