import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// --- FIX PER SOLANA E VITE ---
import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;
// -----------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);