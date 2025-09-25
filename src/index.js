import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container">
      {/* Sticker */}
      <img
        src="/nt_sticker.jpg"
        alt="Sticker"
        className="sticker-card"
      />

      {/* Visiting Card English */}
      <img
        src="/visiting_card.jpg"
        alt="Visiting Card English"
        className="visiting-card"
      />

      {/* Visiting Card Hindi */}
      <img
        src="/visiting_card_hin_2.jpg"
        alt="Visiting Card Hindi"
        className="visiting-card"
      />
    </div>
  </React.StrictMode>
);

reportWebVitals();
