
import React from "react";
import "./FlashScroll.css";

export default function FlashScroll() {
  const messages = [
    "Therapy Fees: Rs. 500/-",
  ];

  return (
    <div className="flash-scroll">
      <div className="scroll-content">
        {[...messages, ...messages, ...messages, ...messages].map((msg, i) => (
          <div className="scroll-item" key={i}>
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}

