import React from "react";
import { Sparkles } from "lucide-react"; // small icon for visual interest
import "./FlashScroll.css";

export default function FlashScroll() {
  const messages = [
    " Free Consultation Available",
    " Therapy Cost: Customized Package after Evaluation of Patient’s Condition"
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
