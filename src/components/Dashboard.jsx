import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#222] pb-6">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">Panoramica Rete</h2>
          <p className="text-gray-400 text-sm mt-1">Dati aggregati in tempo reale dai nodi Solana.</p>
        </div>
        <div className="px-4 py-2 bg-[#111] border border-[#333] rounded-lg flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-gray-200 font-medium text-sm">1,248 Utenti Connessi</span>
        </div>
      </div>

      {/* STATISTICHE ISTITUZIONALI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black p-6 rounded-xl border border-[#222] hover:border-[#444] transition-colors">
          <div className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-widest">Volume Analizzato (24h)</div>
          <div className="text-3xl font-bold text-white">$142.5K</div>
        </div>
        <div className="bg-black p-6 rounded-xl border border-[#222] hover:border-[#444] transition-colors">
          <div className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-widest">Win Rate Globale</div>
          <div className="text-3xl font-bold text-emerald-400">74.2%</div>
        </div>
        <div className="bg-black p-6 rounded-xl border border-[#222] hover:border-[#444] transition-colors">
          <div className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-widest">Contratti Truffa Bloccati</div>
          <div className="text-3xl font-bold text-rose-400">8,432</div>
        </div>
      </div>

      {/* GRAFICO PULITO */}
      <div className="bg-black border border-[#222] rounded-xl p-6">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-semibold text-white">Crescita Utenti</h3>
          <div className="text-sm font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">+34% 7d</div>
        </div>
        
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { name: 'Lun', users: 800 }, { name: 'Mar', users: 950 },
              { name: 'Mer', users: 1100 }, { name: 'Gio', users: 1050 },
              { name: 'Ven', users: 1248 }, { name: 'Sab', users: 1450 },
              { name: 'Oggi', users: 1850 },
            ]}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="users" stroke="#666" strokeWidth={2} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CALL TO ACTION SOBRIA */}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Nuovo nel sistema?</h3>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            Per i principianti consigliamo di non configurare il bot manualmente. Accedi alla Leaderboard pubblica, seleziona un trader con un Win Rate comprovato e applica i suoi parametri al tuo account.
          </p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/leaderboard')}
          className="px-6 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
        >
          Apri Leaderboard
        </button>
      </div>

    </div>
  );
};

export default Dashboard;