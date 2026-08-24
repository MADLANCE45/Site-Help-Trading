import React from 'react';

// Dati simulati per la classifica (in futuro arriveranno dal tuo DB Supabase)
const topBots = [
  { id: 1, wallet: '8xK9...2aB1', strategy: 'Degen Ape', risk: 'ALTO', pnl: '+452%', winRate: '68%', active: true },
  { id: 2, wallet: '3zM1...9cX8', strategy: 'Sniper AI', risk: 'MEDIO', pnl: '+210%', winRate: '82%', active: true },
  { id: 3, wallet: '7yT4...1mP0', strategy: 'Safe Turtle', risk: 'BASSO', pnl: '+85%', winRate: '94%', active: true },
  { id: 4, wallet: '1aB2...8xK9', strategy: 'Volume Hunter', risk: 'ALTO', pnl: '+64%', winRate: '55%', active: false },
  { id: 5, wallet: '9cX8...3zM1', strategy: 'Dev Tracker', risk: 'MEDIO', pnl: '+42%', winRate: '75%', active: true },
];

export const Leaderboard = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-background text-white">
      
      {/* Intestazione */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-yellow-500 uppercase tracking-tight flex items-center gap-3">
            🏆 Top Algo Snipers
          </h2>
          <p className="text-gray-400 mt-2">
            Classifica globale dei setup migliori. Analizza i PnL e clona le strategie vincenti.
          </p>
        </div>
        <div className="bg-[#111] px-4 py-2 rounded-lg border border-gray-800 text-sm font-mono text-gray-400">
          Stagione Attuale: <span className="text-white font-bold">Agosto 2026</span>
        </div>
      </div>

      {/* Tabella Classifica */}
      <div className="bg-[#0a0a0a] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl relative">
        {/* Glow effect di sfondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-yellow-500/5 blur-[80px] pointer-events-none"></div>

        <table className="w-full text-left border-collapse relative z-10">
          <thead>
            <tr className="bg-[#111]/50 border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-4 w-16 text-center">Rank</th>
              <th className="p-4">Trader / Wallet</th>
              <th className="p-4">Nome Strategia</th>
              <th className="p-4 text-center">Rischio IA</th>
              <th className="p-4 text-right">Win Rate</th>
              <th className="p-4 text-right">Total PnL</th>
              <th className="p-4 text-center">Azione</th>
            </tr>
          </thead>
          <tbody className="text-sm font-mono">
            {topBots.map((bot, index) => (
              <tr 
                key={bot.id} 
                className={`border-b border-gray-800/50 hover:bg-[#111] transition-colors group ${
                  index === 0 ? 'bg-yellow-500/5' : ''
                }`}
              >
                {/* Posizione (Podio colorato) */}
                <td className="p-4 text-center font-black text-lg">
                  {index === 0 && <span className="text-yellow-500">1</span>}
                  {index === 1 && <span className="text-gray-300">2</span>}
                  {index === 2 && <span className="text-amber-600">3</span>}
                  {index > 2 && <span className="text-gray-600">{index + 1}</span>}
                </td>

                {/* Wallet */}
                <td className="p-4 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${bot.active ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-600'}`}></div>
                  <span className="text-gray-300">{bot.wallet}</span>
                </td>

                {/* Strategia */}
                <td className="p-4 font-sans font-bold text-white">
                  {bot.strategy}
                </td>

                {/* Rischio */}
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-bold border ${
                    bot.risk === 'BASSO' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    bot.risk === 'MEDIO' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                    'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    {bot.risk}
                  </span>
                </td>

                {/* Win Rate */}
                <td className="p-4 text-right text-gray-400">
                  {bot.winRate}
                </td>

                {/* PnL */}
                <td className="p-4 text-right font-black text-green-400 text-base tracking-tight">
                  {bot.pnl}
                </td>

                {/* Bottone Clona */}
                <td className="p-4 text-center">
                  <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-[#111] hover:bg-yellow-500 hover:text-black border border-gray-700 hover:border-yellow-500 text-gray-300 font-sans font-bold text-xs rounded-lg transition-all duration-200">
                    CLONA SETUP
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Leaderboard;