import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importiamo i provider di Solana (che hai già configurato)
import { SolanaProvider } from './components/SolanaProvider';

// Importiamo le nostre due pagine principali
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <SolanaProvider>
      <Router>
        <Routes>
          {/* La rotta principale (Home) mostra la Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* La rotta privata mostra la Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </SolanaProvider>
  );
}

export default App;