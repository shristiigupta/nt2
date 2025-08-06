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
      textAlign: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      
      
      {/* Visiting Card Images Section */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginTop: '40px'
      }}>
        <img
          src="/visiting_card_eng.png"
          alt="Visiting Card 1"
          style={{ width: '600px', height: '400px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
        />
        <img
          src="/visiting_card_hindi.png"
          alt="Visiting Card 2"
          style={{ width: '600px', height: '400px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
        />
      </div>
    </div>
  </React.StrictMode>
);

reportWebVitals();
