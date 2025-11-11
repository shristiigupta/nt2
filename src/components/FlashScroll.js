import React from "react";
import "./FlashScroll.css";

export default function FlashScroll() {
  const messages = [
    <>Consultation <span className="blink-text">FREE</span></>,
    "Therapy Fees: Customized Packages available as per condition of patient",
  ];

  return (
    <div className="flash-scroll">
      <div className="scroll-content">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="scroll-item">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
