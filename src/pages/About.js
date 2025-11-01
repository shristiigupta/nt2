import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">

        <h1>About Us</h1>

        <div className="highlight-card">
          <img src="/images/santulan.png" alt="Santulan Holistic Solutions" className="highlight-img" />
          <div className="highlight-text">
            <h3>Santulan Holistic Solutions</h3>
            <p>
              Santulan Holistic Solutions is dedicated to helping people regain health and balance through natural, non-invasive neurotherapy treatments. Our centre believes in the body's ability to heal itself when guided with the right techniques.
            </p>
          </div>
        </div>



        <h2>Our Mission</h2>
        <p>
          <h3 className="notranslate" translate="no">
          चलो एक बार फिर से, स्वस्थ हो जाए...
        </h3> 
          The mission of Santulan Holistic Solutions is to provide personalized and ethical care to the patients. The team is fully trained to create a supportive and positive environment. The centre welcomes people of all ages seeking relief from most of the diseases including different types of pains, stomach problems, gynaecological problems, neurological problems, and also for those wishing to enhance their quality of life. Santulan Holistic Solutions stands as a trusted choice for neurotherapy, offering genuine care and reliable treatments to help you restore balance in your life.
        </p>

        <h2>What is Neurotherapy?</h2>
        <p>
          <div className="lajpat-section">
            <img src="/images/lajpatrai.jpg" alt="Dr. Lajpatrai Mehra" className="lajpat-img" />
            <h3>Dr. Lajpatrai Mehra</h3>
            <p>
              Neurotherapy is a scientifically backed holistic healing system developed by Dr. Lajpatrai Mehra in the 20th century.
              This drug-free therapy draws from the ancient science of Nadi Vigyan and focuses on achieving balance among the body’s organs.
              It is founded on the principle that diseases occur due to excessive or reduced functioning of one or more organs, which disrupts the body’s chemical harmony. Neurotherapy restores equilibrium by stimulating or calming the affected organs as needed. <br /><br />
          Rather than treating symptoms, Neurotherapy addresses the root cause of ailments, promoting both physical and mental well-being. It has shown positive results even in cases involving genetic disorders. Many patients with chronic or long-standing conditions have experienced significant improvement through this therapeutic approach.
            </p>
          </div>
        </p>

          

        <h2>How Does Neurotherapy Work?</h2>
        <p>
          Neurotherapy, created by Dr. Lajpatrai Mehra in the 20th century, is a comprehensive, science-based healing approach.
        </p>

        <p>
          This method uniquely integrates non-pharmaceutical techniques with modern scientific diagnostics, utilizing tools such as X-rays, sonography, pathology tests, and its proprietary Neurotherapy assessment. It posits that health issues stem from imbalances in acids, alkalis, hormones, and enzymes within the body. Dr. Mehra’s technique seeks to correct these chemical discrepancies by applying controlled pressure, mostly using the feet and sometimes the hands, on specific body areas for predetermined durations and frequencies to regulate the function of targeted glands and organs.
        </p>

        <p>
          Neurotherapy holds that the immune system already has the capability to combat various infections, bacteria, and viruses without the need for medications that might suppress its function. It asserts that everyone inherits around one hundred thousand genetic codes from their parents, corresponding to protein markers on cell surfaces, which enable the production of antibodies against numerous antigens. Over generations, this natural mechanism has provided humans with built-in immunity against diseases.
        </p>

        <h2>How Treatments Are Given</h2>
        <p>
          The initial consultation includes a comprehensive review of the patient’s medical history. A visual assessment follows, involving observation of the eyes, tongue color, nails, skin, and other indicators.
        </p>
        <p>
          Next, the practitioner conducts abdominal palpation to identify Neurotherapy pain points, which form the basis for creating a personalized treatment plan. Depending on the patient’s age and health condition, treatments are administered through the hands or feet. This therapy stands out for delivering remarkable results without the use of medication.
        </p>

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
            <a
              href="https://youtu.be/QATVp54xZS0?si=R2SlCiI1HeKUY45S"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.youtube.com/vi/QATVp54xZS0/hqdefault.jpg"
                alt="Neurotherapy Treatment Video"
                className="video-thumbnail"
              />
            </a>

          </div>
        </div>



        <h2>About Vishal Gupta</h2>
        <p>
          <div className="highlight-card">
            <img src="/images/vishal.jpg" alt="Vishal Gupta" className="highlight-img" />
            <div className="highlight-text">
              <h3>Vishal Gupta</h3>
              <p>
                is a Government Certified Senior Neurotherapist, who is dedicated and committed to promote health and healing through natural and scientific approaches. With the deep sense of service, he aims to help people restore balance in mind and body, empowering them to lead healthier and happier lives.
              </p>
              <p>
                Moreover, he brings more than 25 years of experience in public service and now has established Santulan Holistic Solutions which aims to offer effective and holistic care for every patient and to serve the community through expert Neurotherapy care.
              </p>
            </div>
          </div>
        </p>




      </div>
    </div>
  );
};

export default About;
