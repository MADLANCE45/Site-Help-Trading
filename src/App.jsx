import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SolanaProvider } from './components/SolanaProvider';

// Importiamo il nuovo Layout
import AppLayout from './components/AppLayout';

// Importiamo le Pagine
import LandingPage from './components/LandingPage';
import DashboardOverview from './components/Dashboard'; // Questa ora diventerà solo la Panoramica
import Radar from './components/Radar';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <SolanaProvider>
      <Router>
        <Routes>
          {/* Rotta Pubblica */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Rotte Private avvolte nel Guscio "AppLayout" */}
          <Route path="/dashboard" element={<AppLayout><DashboardOverview /></AppLayout>} />
          <Route path="/dashboard/radar" element={<AppLayout><Radar /></AppLayout>} />
          <Route path="/dashboard/leaderboard" element={<AppLayout><Leaderboard /></AppLayout>} />
          
          {/* Fallback di sicurezza: se l'URL non esiste, torna alla Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SolanaProvider>
  );
}

export default App;