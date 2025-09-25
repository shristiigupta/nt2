import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container">
      <div className="card-layout">
        {/* Left: Sticker */}
        <div className="sticker-section">
          <img
            src="/nt_sticker.jpg"
            alt="Sticker"
            className="sticker"
          />
        </div>

        {/* Right: Visiting Cards */}
        <div className="cards-section">
          <img
            src="/visiting_card.jpg"
            alt="Visiting Card English"
            className="visiting-card"
          />
          <img
            src="/visiting_card_hin_2.jpg"
            alt="Visiting Card Hindi"
            className="visiting-card"
          />
        </div>
      </div>
    </div>
  </React.StrictMode>
);

reportWebVitals();
