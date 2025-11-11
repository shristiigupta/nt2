import React from "react";
import "./FlashScroll.css";

export default function FlashScroll() {
  const messages = [
    " Consultation FREE",
    " Therapy Fees: Customized Packages are available as per the condition of patient "
  ];

  return (
    <div className="flash-scroll">
      <div className="scroll-content">
        {messages.map((msg, i) => (
          <span key={i} className="scroll-item">
           
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
