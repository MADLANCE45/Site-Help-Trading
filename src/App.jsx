import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SolanaProvider } from './components/SolanaProvider';
import PrivacyPolicy from './components/PrivacyPolicy'; 
import { Analytics } from '@vercel/analytics/react';
// Layout e Sicurezza
import AppLayout from './components/AppLayout';
import AuthGuard from './components/AuthGuard';
import MaintenanceBanner from './components/MaintenanceBanner';
// Pagine
import LandingPage from './components/LandingPage';
import DashboardOverview from './components/Dashboard'; 
import Radar from './components/Radar';
import Leaderboard from './components/Leaderboard';
import WalletProfile from './components/WalletProfile';
import Pricing from './components/Pricing';
import Docs from './components/Docs';
// 🚨 INTERRUTTORE DI MANUTENZIONE PER LA DASHBOARD
// Lascialo a 'true' finché non risolvi il backend. Mettilo a 'false' per riattivare tutto.
const IS_DASHBOARD_MAINTENANCE = false;

function App() {
  return (
    <SolanaProvider>
      <Router>
        <Routes>
          {/* ========================================== */}
          {/* ROTTE PUBBLICHE (Sempre attive per Landing e SEO) */}
          {/* ========================================== */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/docs" element={<Docs />} />
          {/* ========================================== */}
          {/* ROTTE DELLA DASHBOARD (Con filtro di manutenzione) */}
          {/* ========================================== */}
          <Route 
            path="/dashboard" 
            element={<AppLayout>{IS_DASHBOARD_MAINTENANCE ? <MaintenanceBanner /> : <DashboardOverview />}</AppLayout>} 
          />
          <Route 
            path="/dashboard/radar" 
            element={<AppLayout>{IS_DASHBOARD_MAINTENANCE ? <MaintenanceBanner /> : <Radar />}</AppLayout>} 
          />
          <Route 
            path="/dashboard/leaderboard" 
            element={<AppLayout>{IS_DASHBOARD_MAINTENANCE ? <MaintenanceBanner /> : <Leaderboard />}</AppLayout>} 
          />
          <Route 
            path="/dashboard/wallet" 
            element={<AppLayout>{IS_DASHBOARD_MAINTENANCE ? <MaintenanceBanner /> : <WalletProfile />}</AppLayout>} 
          />
          <Route 
            path="/dashboard/pricing" 
            element={<AppLayout>{IS_DASHBOARD_MAINTENANCE ? <MaintenanceBanner /> : <Pricing />}</AppLayout>} 
          />
          
          {/* ========================================== */}
          {/* 🛑 FALLBACK */}
          {/* ========================================== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Analytics />
    </SolanaProvider>
  );
}

export default App;