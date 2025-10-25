import React from "react";
import "./Dietchart.css";
import jsPDF from "jspdf";

const Dietchart = () => {
    const imageSrc = "/dietchart.jpg";

    // Download as PDF
    const downloadPDF = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            // Maintain aspect ratio
            const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
            const imgWidth = img.width * ratio;
            const imgHeight = img.height * ratio;

            const x = (pageWidth - imgWidth) / 2;
            const y = 40;

            doc.text("Diet Chart", pageWidth / 2, 30, { align: "center" });
            doc.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
            doc.save("dietchart.pdf");
        };
    };

    return (
        <section className="dietchart-section">
            <div className="dietchart-content">
                <h1>Daily Routine</h1>
                <br />
                <ul>
                    <li>Follow the Diet Chart used during Neurotherapy treatment </li>
                    <li>In the diet chart, select and eat only those items that are available to you
                        and that you like, according to your personal needs.</li>
                    <li>Take 20 minutes of sunlight daily. </li>
                    <li>Walking barefoot on grass or on the ground is also very beneficial.
                        If you can do pranayama at the same time, it adds even more benefit</li>
                    <li>Oil massage followed by a bath is very good — use coconut oil in summer and pure sesame oil in winter.</li>
                    <li>Eat only when you feel hungry; do not eat otherwise</li>
                    <li> Replace sugar with jaggery, refined oil with pure oil, and white salt with rock salt.</li>
                    <li> If possible, sit in Chair Pose (Kursi Asan) or Vajrasan for 15 minutes after eating.</li>
                    <li>Patients with kidney stones should avoid taking lime (calcium).</li>


                </ul>
            </div >

            <div className="dietchart-image">
                <img src="/dietchart.jpg" alt="Neurotherapy Experts" />

                {/* Download Buttons below the image */}
                <div className="download-buttons">
                    <button onClick={downloadPDF}>Download Diet Chart</button>
                </div>
            </div>

        </section >
    );
};

export default Dietchart;
