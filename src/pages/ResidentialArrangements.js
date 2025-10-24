import React from "react";
import "./ResidentialArrangements.css";

function ResidentialArrangements() {
  return (
    <div className="residential-page">
      <h1>Residential Arrangements for Patients</h1>

      <p>
        Patients coming from far locations for regular therapy sessions at
        Santulan Holistic Solutions may require short-term stay nearby.
        Below are nearby options for accommodation and support services.
      </p>

      <h2>1. Nearby Hotels & Lodges</h2>
      <p>
        Click the button below to view nearby hotels on Google Maps along with
        the clinic location.
      </p>
      <button
        onClick={() => {
          window.open(
            "https://www.google.com/maps/search/Hotels/@28.659551,77.3555571,17z/data=!3m1!4b1!4m7!2m6!3m5!2sSantulan+Holistic+Solutions+and+Neurotherapy+Center!3s0x5a0af2e9444593f:0xef13883481b28168!4m2!1d77.358132!2d28.659551?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D",
            "_blank"
          );
        }}
      >
        View Hotels on Map
      </button>

      <h2>2. Tiffin / Food Services</h2>
      <p>
        Affordable home-cooked food delivery services are available nearby.
        Click below to view tiffin providers near the clinic.
      </p>
      <button
        onClick={() => {
          window.open(
            "https://www.google.com/maps/search/Tiffin+Services+near+Santulan+Holistic+Solutions+Ghaziabad/",
            "_blank"
          );
        }}
      >
        View Tiffin Services on Map
      </button>

      <h2>3. Transport / Commute Assistance</h2>
      <p>
        Auto, taxi and metro connectivity is available from the clinic. You can
        also search “Taxi near Santulan Holistic Solutions” on Maps:
      </p>
      <button
        onClick={() => {
          window.open(
            "https://www.google.com/maps/search/Taxi+near+Santulan+Holistic+Solutions+Ghaziabad/",
            "_blank"
          );
        }}
      >
        View Transport Options
      </button>

      <p className="note">
        Note: These services are external and not managed by Santulan Holistic
        Solutions. Patients may choose as per their preference and budget.
      </p>
    </div>
  );
}

export default ResidentialArrangements;
