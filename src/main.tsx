import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';  // Global styles (if any)
import App from './App'; // Main App component

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
