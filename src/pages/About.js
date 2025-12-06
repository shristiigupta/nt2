import React, { useEffect, useState } from "react";
import "./About.css";
import { incrementVisit } from "./visitTracker";
import { logVisitor } from "./visitorLogger";

const About = () => {
  const [aboutData, setAboutData] = useState({
    aboutHindi: null,
    aboutEnglish: null,
    demoHindi: null,
    demoEnglish: null,
  });

  useEffect(() => {
    logVisitor("About Page");
    incrementVisit("About Page");

    fetch(
      "https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?raw=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setAboutData({
          aboutHindi: data["About Us"].video_hindi,
          aboutEnglish: data["About Us"].video_english,
          demoHindi: data["Demo"].video_hindi,
          demoEnglish: data["Demo"].video_english,
        });
      })
      .catch((err) => console.error("Error loading gist:", err));
  }, []);

  return (
    <div className="about-page">
      <div className="about-container">

        <h1>About Us</h1>

        <div className="about-section-1-wrapper">
  <div className="about-section-1">
    <div className="video-container">
      {aboutData.aboutHindi && (
  <iframe
    title="About Us Hindi Video"
    src={
      aboutData.aboutHindi +
      (aboutData.aboutHindi.includes("?") ? "&" : "?") +
      "controls=1&modestbranding=1&rel=0&iv_load_policy=3"
    }
    frameBorder="0"
    allowFullScreen
  ></iframe>
)}

    </div>
    <div className="text-content">
      <h3>Santulan Holistic Solutions</h3>
      <p>
        Santulan Holistic Solutions is dedicated to helping people regain
        health and balance through natural, non-invasive neurotherapy
        treatments. Our centre believes in the body's ability to heal itself
        when guided with the right techniques.
      </p>
    </div>
  </div>
</div>


    

        {/* MISSION */}
        <h2>Our Mission</h2>
        <div className="mission-block">
          <h3 className="notranslate" translate="no">
            चलो एक बार फिर से, स्वस्थ हो जाए...
          </h3>
          <p>
            The mission of Santulan Holistic Solutions is to provide personalized
            and ethical care to the patients. The team is fully trained to create
            a supportive and positive environment. The centre welcomes people of
            all ages seeking relief from most of the diseases including different
            types of pains, stomach problems, gynaecological problems,
            neurological problems, and also for those wishing to enhance their
            quality of life. Santulan Holistic Solutions stands as a trusted
            choice for neurotherapy, offering genuine care and reliable
            treatments to help you restore balance in your life.
          </p>
        </div>

        {/* WHAT IS NEUROTHERAPY */}
        <h2>What is Neurotherapy?</h2>
        <div className="lajpat-section">
          <img
            src="/images/lajpatrai.jpg"
            alt="Dr. Lajpatrai Mehra"
            className="lajpat-img"
          />
          <h3>Dr. Lajpatrai Mehra</h3>
          <p>
            Neurotherapy is a scientifically backed holistic healing system
            developed by Dr. Lajpatrai Mehra in the 20th century. This drug-free
            therapy draws from the ancient science of Nadi Vigyan and focuses on
            achieving balance among the body’s organs. It is founded on the
            principle that diseases occur due to excessive or reduced functioning
            of one or more organs, which disrupts the body’s chemical harmony.
            Neurotherapy restores equilibrium by stimulating or calming the
            affected organs as needed. <br />
            <br />
            Rather than treating symptoms, Neurotherapy addresses the root cause
            of ailments, promoting both physical and mental well-being. It has
            shown positive results even in cases involving genetic disorders. Many
            patients with chronic or long-standing conditions have experienced
            significant improvement through this therapeutic approach.
          </p>
        </div>

        {/* HOW DOES IT WORK */}
        <h2>How Does Neurotherapy Work?</h2>
        <p>
          Neurotherapy, created by Dr. Lajpatrai Mehra in the 20th century, is a
          comprehensive, science-based healing approach.
        </p>

        <p>
          This method uniquely integrates non-pharmaceutical techniques with
          modern scientific diagnostics, utilizing tools such as X-rays,
          sonography, pathology tests, and its proprietary Neurotherapy
          assessment. It posits that health issues stem from imbalances in acids,
          alkalis, hormones, and enzymes within the body. Dr. Mehra’s technique
          seeks to correct these chemical discrepancies by applying controlled
          pressure, mostly using the feet and sometimes the hands, on specific
          body areas for predetermined durations and frequencies to regulate the
          function of targeted glands and organs.
        </p>

        <p>
          Neurotherapy holds that the immune system already has the capability to
          combat various infections, bacteria, and viruses without the need for
          medications that might suppress its function. It asserts that everyone
          inherits around one hundred thousand genetic codes from their parents,
          corresponding to protein markers on cell surfaces, which enable the
          production of antibodies against numerous antigens. Over generations,
          this natural mechanism has provided humans with built-in immunity
          against diseases.
        </p>

        <h2>How Treatments Are Given</h2>
        <p>
          The initial consultation includes a comprehensive review of the patient’s
          medical history. A visual assessment follows, involving observation of
          the eyes, tongue color, nails, skin, and other indicators.
        </p>

        <p>
          Next, the practitioner conducts abdominal palpation to identify
          Neurotherapy pain points, which form the basis for creating a
          personalized treatment plan. Depending on the patient’s age and health
          condition, treatments are administered through the hands or feet. This
          therapy stands out for delivering remarkable results without the use of
          medication.
        </p>

        {/* TREATMENT LIST + VIDEOS */}
        <div className="treatment-list-video">
          <div className="list-section">
            <p>Health issues effectively managed by this approach include:</p>
            <ul>
              <li>Cervical and lumbar spondylosis</li>
              <li>Rheumatoid arthritis (AR+)</li>
              <li>Hormonal imbalances</li>
              <li>PCOD</li>
              <li>Scoliosis</li>
              <li>Psoriasis</li>
              <li>Genetic disorders such as Down Syndrome</li>
              <li>Autism</li>
              <li>Cerebral palsy</li>
              <li>Delayed developmental milestones</li>
              <li>Infertility</li>
              <li>Angina</li>
              <li>Asthma</li>
              <li>Migraine</li>
              <li>Allergies</li>
              <li>Muscle cramps</li>
              <li>Post-surgical complications</li>
              <li>Digestive issues like indigestion, gas, and acidity</li>
            </ul>
          </div>

          <div className="video-section">
            {aboutData.demoHindi && (
              <iframe
                className="treatment-video"
                src={
                  aboutData.demoHindi +
                  "&modestbranding=1&controls=0&showinfo=0"
                }
                allowFullScreen
              ></iframe>
            )}

            {aboutData.demoEnglish && (
              <iframe
                className="treatment-video"
                src={
                  aboutData.demoEnglish +
                  "&modestbranding=1&controls=0&showinfo=0"
                }
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>

        {/* VISHAL GUPTA */}
        <h2>About Vishal Gupta</h2>
        <div className="highlight-card">
          <img
            src="/images/vishal.jpg"
            alt="Vishal Gupta"
            className="highlight-img"
          />
          <div className="highlight-text">
            <h3>Vishal Gupta</h3>
            <p>
              is a Government Certified Senior Neurotherapist, who is dedicated
              and committed to promote health and healing through natural and
              scientific approaches. With the deep sense of service, he aims to
              help people restore balance in mind and body, empowering them to
              lead healthier and happier lives.
            </p>
            <p>
              Moreover, he brings more than 25 years of experience in public
              service and now has established Santulan Holistic Solutions which
              aims to offer effective and holistic care for every patient and to
              serve the community through expert Neurotherapy care.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
