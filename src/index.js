import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container">
      {/* Visiting Card Images Section */}
      <div className="card-container">
        <img
          src="/visiting_card_eng.png"
          alt="Visiting Card 1"
          className="visiting-card"
        />
        <img
          src="/visiting_card_hindi.png"
          alt="Visiting Card 2"
          className="visiting-card"
        />
      </div>
    </div>
  </React.StrictMode>
);

reportWebVitals();
