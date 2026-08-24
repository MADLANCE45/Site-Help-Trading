import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

// Importiamo le altre pagine della Dashboard
import Radar from './Radar';
import Leaderboard from './Leaderboard';
import TradingDiary from './TradingDiary';
import Settings from './Settings';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    // Gestione della navigazione interna
    if (activeTab === 'radar') return <Radar />;
    if (activeTab === 'leaderboard') return <Leaderboard />;
    if (activeTab === 'diary') return <TradingDiary />;
    if (activeTab === 'settings') return <Settings />;

    // Default: Panoramica (Design Premium & Effetto Wow)
    return (
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background relative">
        {/* Glow di sfondo globale */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          
          {/* HEADER & SOCIAL PROOF */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-4">
            <div>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-tight">
                Panoramica
              </h2>
              <p className="text-gray-400 mt-2 font-medium">L'algoritmo lavora. Tu incassi.</p>
            </div>
            
            <div className="bg-blue-950/30 backdrop-blur-md border border-blue-500/30 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span>
              </div>
              <span className="text-blue-300 font-bold text-sm tracking-wide">1,248 Utenti Attivi</span>
            </div>
          </div>

          {/* STATISTICHE (Glassmorphism) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-gray-400 text-xs font-bold mb-2 tracking-wider uppercase">Volume Generato (24h)</div>
              <div className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors">$142,500</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-green-500/50 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-gray-400 text-xs font-bold mb-2 tracking-wider uppercase">Win Rate Globale</div>
              <div className="text-4xl font-black text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]">74.2%</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-gray-400 text-xs font-bold mb-2 tracking-wider uppercase">Scam Evitati</div>
              <div className="text-4xl font-black text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.2)]">8,432</div>
            </div>
          </div>

          {/* IL GRAFICO DINAMICO */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Adozione del Terminale</h3>
                <p className="text-gray-500 text-sm mt-1">Crescita dei trader algoritmici sulla rete</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-blue-400">+34%</div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Questa Settimana</div>
              </div>
            </div>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { name: 'Lun', users: 800 },
                  { name: 'Mar', users: 950 },
                  { name: 'Mer', users: 1100 },
                  { name: 'Gio', users: 1050 },
                  { name: 'Ven', users: 1248 },
                  { name: 'Sab', users: 1450 },
                  { name: 'Oggi', users: 1850 },
                ]}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(10, 10, 10, 0.9)', borderColor: '#1f2937', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="relative z-10">
              <div className="inline-block bg-blue-500/20 text-blue-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 border border-blue-500/30">
                Guida per Principianti
              </div>
              <h3 className="text-3xl font-black text-white mb-2">Copia chi fa i profitti.</h3>
              <p className="text-gray-300 max-w-xl text-sm md:text-base leading-relaxed">
                Non sai come settare lo slippage? Visita la <strong>Leaderboard</strong>, trova il trader con il Win Rate più alto e clona il suo algoritmo con un clic.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className="relative z-10 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all hover:scale-105 shadow-[0_0_25px_rgba(37,99,235,0.5)] shrink-0"
            >
              Esplora Classifica →
            </button>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background text-white font-sans overflow-hidden">
      
      {/* LA SIDEBAR (Il menu laterale resuscitato) */}
      <div className="w-64 bg-[#050505] border-r border-gray-800 flex flex-col relative z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        
        {/* Logo */}
        <div className="p-6 border-b border-gray-800/50">
          <h1 className="text-3xl font-black text-blue-500 tracking-tighter">MS<span className="text-white">.Term</span></h1>
          <p className="text-xs text-gray-500 font-mono mt-1">Connesso a Solana Mainnet</p>
        </div>
        
        {/* Pulsanti di Navigazione */}
        <nav className="flex-1 px-4 space-y-2 mt-6">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'overview' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:bg-[#111] hover:text-white'}`}
          >
            📊 Panoramica
          </button>
          
          <button 
            onClick={() => setActiveTab('radar')} 
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'radar' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:bg-[#111] hover:text-white'}`}
          >
            📡 Radar Live
          </button>
          
          <button 
            onClick={() => setActiveTab('leaderboard')} 
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'leaderboard' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:bg-[#111] hover:text-white'}`}
          >
            🏆 Leaderboard
          </button>

          <button 
            onClick={() => setActiveTab('diary')} 
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'diary' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:bg-[#111] hover:text-white'}`}
          >
            📓 Trading Diary
          </button>

          <button 
            onClick={() => setActiveTab('settings')} 
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'settings' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:bg-[#111] hover:text-white'}`}
          >
            ⚙️ Impostazioni
          </button>
        </nav>

        {/* Bottone Wallet a fondo colonna */}
        <div className="p-4 border-t border-gray-800">
          <WalletMultiButton className="!w-full !justify-center !bg-[#111] hover:!bg-gray-800 !h-12 !rounded-xl !text-sm transition-all border border-gray-700 hover:border-blue-500" />
        </div>

      </div>

      {/* AREA CENTRALE DINAMICA */}
      {renderContent()}

    </div>
  );
};

export default Dashboard;