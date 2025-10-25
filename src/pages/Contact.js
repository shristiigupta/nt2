// src/pages/Contact.js
import React, { useEffect, useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMapLoaded(true), 800);
        return () => clearTimeout(t);
    }, []);

    const googleMapsHref =
        "https://www.google.com/maps/search/?api=1&query=Santulan+Holistic+Solutions,+2021,+Sector+16A,+Vasundhara,+Ghaziabad,+Uttar+Pradesh";

    return (
        <div className="page contact-page">
            <div className="contact-section">

                {/* LEFT: CONTACT INFO */}
                <div className="contact-info">
                    <h1>Contact Us</h1>
                    <br />

                    <p><strong>Phone No.: </strong>8130608275</p>
                    <p><strong>Email:</strong> santulan.neurotherapy@gmail.com </p>
                    <p><strong>Address:</strong> 2021, Sector 16A, Vasundhara, Ghaziabad, Uttar Pradesh, India - 201012</p>
                    <p><strong>Website:</strong> <a href="https://neurotherapy.netlify.app" target="_blank" rel="noopener noreferrer">
                        neurotherapy.netlify.app  </a></p>
                    <p><strong>Landmark:</strong> Please inquire directly to confirm nearest landmark</p>
                    <p><strong>Open hours:</strong> Please call to confirm the timing</p>

                </div>

                {/* RIGHT: MAP */}
                <div className="map-wrapper">
                    <div className="map-card">
                        {mapLoaded ? (
                            <>
                                <iframe
                                    title="Santulan Holistic Solutions"
                                    src="https://www.google.com/maps?q=Santulan%20Holistic%20Solutions%2C%202021%2C%20Sector%2016A%2C%20Vasundhara%2C%20Ghaziabad%2C%20Uttar%20Pradesh&output=embed"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>

                                <div className="map-footer">
                                    <a
                                        href={googleMapsHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="map-link"
                                    >
                                        Open in Google Maps
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="map-placeholder">🗺️ Loading Map...</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
