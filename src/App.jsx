import React from 'react';
import { SolanaProvider } from './components/SolanaProvider';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// --- COMPONENTI UI INTERNI ---

// 1. La Sidebar di Navigazione
const Sidebar = () => (
  <div className="w-64 bg-gray-900 border-r border-gray-800 hidden md:flex flex-col">
    <div className="p-6">
      <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">
        CYBORG.bot
      </h2>
      <p className="text-xs text-gray-500 mt-1">Automated Solana Trading</p>
    </div>
    
    <nav className="flex-1 px-4 space-y-2 mt-4">
      <a href="#" className="block px-4 py-3 bg-gray-800 text-green-400 rounded-lg border border-gray-700 font-medium">
        ⎈ Dashboard
      </a>
      <a href="#" className="block px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition">
        ⚙️ Configurazione
      </a>
      <a href="#" className="block px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition">
        📊 Log Transazioni
      </a>
    </nav>

    {/* Zona Meme/Mascotte Cyborg in basso alla sidebar */}
    <div className="p-4 m-4 bg-gray-800 rounded-lg border border-gray-700 text-center">
      <div className="text-4xl mb-2">🤖</div>
      <p className="text-xs text-gray-400 font-mono">"I never sleep. I only snipe."</p>
    </div>
  </div>
);

// 2. Le Card per le Metriche
const StatCard = ({ title, value, isPositive }) => (
  <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
    <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
    <div className="flex items-baseline space-x-2">
      <span className="text-3xl font-bold text-white">{value}</span>
      {isPositive !== undefined && (
        <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '↑' : '↓'}
        </span>
      )}
    </div>
  </div>
);

// 3. Il Layout Principale della Dashboard
const Dashboard = () => {
  // L'HOOK MAGICO: Estrae i dati dal provider di Solana
  const { publicKey, connected } = useWallet();

  // Tronca la chiave pubblica per non occupare tutto lo schermo (es. 5A3b...9xYz)
  const shortAddress = publicKey 
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : '';

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-white font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-gray-900/50 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-bold text-gray-200">System Overview</h1>
            <div className="flex items-center space-x-2 mt-1">
              {/* Pallino di stato (verde se connesso, grigio se disconnesso) */}
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-600'}`}></div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                {connected ? 'Network: Devnet (Active)' : 'System Standby'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Se connesso, mostra l'indirizzo troncato e il wallet button standard per poter disconnettere */}
            {connected && (
              <div className="hidden sm:block px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-sm font-mono text-purple-300">
                {shortAddress}
              </div>
            )}
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !h-10 !rounded-lg" />
          </div>
        </header>

        {/* Area Contenuto */}
        <div className="flex-1 overflow-auto p-8">
          {/* Mostra le metriche solo se il wallet è connesso */}
          {!connected ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <div className="text-6xl mb-4">🔌</div>
              <h2 className="text-2xl font-bold text-gray-300">Inizializzazione Richiesta</h2>
              <p className="text-gray-500 max-w-md mt-2">
                Connetti il tuo modulo Phantom per accedere ai parametri del bot e avviare l'automazione.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Griglia Metriche */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total PnL (24h)" value="+12.4 SOL" isPositive={true} />
                <StatCard title="Win Rate" value="68.5%" isPositive={true} />
                <StatCard title="Active Snipes" value="3" />
              </div>

              {/* Spazio per futuri grafici o log */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-64 flex items-center justify-center relative overflow-hidden">
                 {/* Un piccolo tocco "matrix/cyborg" per riempire lo spazio */}
                 <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                 <p className="text-gray-600 font-mono z-10">Waiting for real-time token events...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Componente Root
function App() {
  return (
    <SolanaProvider>
      <Dashboard />
    </SolanaProvider>
  );
}

export default App;