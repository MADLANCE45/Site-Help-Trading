import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

// Importa i Provider e le tue pagine
import { SolanaProvider } from './components/SolanaProvider';
import LandingPage from './components/LandingPage';
// Immagino che tu abbia salvato la dashboard di prima in un file separato.
// Se non lo hai fatto, crea un file Dashboard.jsx in src/components/ e incollaci
// il codice della dashboard (quello con la sidebar e le statistiche).
import Dashboard from './components/Dashboard'; 

// Componente Sentinella per le rotte private
const ProtectedRoute = ({ children }) => {
  const { connected } = useWallet();
  
  // Se non è connesso, lo rispedisce alla landing page ('/')
  if (!connected) {
    return <Navigate to="/" replace />;
  }

  // Se è connesso, gli mostra il contenuto (la dashboard)
  return children;
};

function App() {
  return (
    <SolanaProvider>
      <Router>
        <Routes>
          {/* Rotta Pubblica: La tua nuova Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Rotta Privata: La Dashboard da Trading */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </SolanaProvider>
  );
}

export default App;