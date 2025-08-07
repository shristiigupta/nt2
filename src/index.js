import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // We will handle styles here
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container">
      <img
        src="/logo.png"
        alt="Santulan Neurotherapy"
        className="main-logo"
      />
    </div>
  </React.StrictMode>
);

reportWebVitals();
