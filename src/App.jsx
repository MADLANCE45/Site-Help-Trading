import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SolanaProvider } from './components/SolanaProvider';
import PrivacyPolicy from './components/PrivacyPolicy'; 
import { inject } from '@vercel/analytics';
// Layout e Sicurezza
import AppLayout from './components/AppLayout';
import AuthGuard from './components/AuthGuard';

// Pagine
import LandingPage from './components/LandingPage';
import DashboardOverview from './components/Dashboard'; 
import Radar from './components/Radar';
import Leaderboard from './components/Leaderboard';
import WalletProfile from './components/WalletProfile';
import Pricing from './components/Pricing';

function App() {
  return (
    <SolanaProvider>
      <Router>
        <Routes>
          {/* ========================================== */}
          {/* ROTTE PUBBLICHE (Accessibili a Google e agli utenti senza wallet) */}
          {/* ========================================== */}
          <Route path="/" element={<LandingPage />} />
          
          {/* ✅ LA TUA NUOVA ROTTA PRIVACY POLICY */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          
          {/* ========================================== */}
          {/* ROTTE PRIVATE DELLA DASHBOARD */}
          {/* ========================================== */}
          <Route path="/dashboard" element={<AppLayout><DashboardOverview /></AppLayout>} />
          <Route path="/dashboard/radar" element={<AppLayout><Radar /></AppLayout>} />
          <Route path="/dashboard/leaderboard" element={<AppLayout><Leaderboard /></AppLayout>} />
          <Route path="/dashboard/wallet" element={<AppLayout><WalletProfile /></AppLayout>} />
          
          {/* ROTTA PRICING CORRETTA: Inserita prima del fallback */}
          <Route path="/dashboard/pricing" element={<AppLayout><Pricing /></AppLayout>} />
          
          
          {/* ========================================== */}
          {/* 🛑 FALLBACK: Rimanda alla home per URL inesistenti. DEVE stare in fondo! */}
          {/* ========================================== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SolanaProvider>
  );
}

export default App;