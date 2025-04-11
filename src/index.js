import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <img
        src="/sn_logo_6.png"
        alt="Santulan Neurotherapy"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <h1 style={{ marginTop: '20px', fontSize: '2.5rem' }}>
        Coming Soon...
      </h1>
    </div>
  </React.StrictMode>
);

reportWebVitals();
