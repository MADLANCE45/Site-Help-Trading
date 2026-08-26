import React, { useState } from 'react';

export const Leaderboard = () => {
  // Filtri temporali per la classifica
  const [timeframe, setTimeframe] = useState('24h');

  // Dati simulati dei migliori trader sulla piattaforma
  const topTraders = [
    { rank: 1, address: '7xKX...2mQ9', pnl: '+$48,290.50', roi: '+842%', winRate: '89%', status: 'PRO' },
    { rank: 2, address: 'DezX...3u9P', pnl: '+$29,410.00', roi: '+512%', winRate: '78%', status: 'PRO' },
    { rank: 3, address: '9WzY...8vL1', pnl: '+$18,900.20', roi: '+345%', winRate: '71%', status: 'FREE' },
    { rank: 4, address: '3KjM...4nB2', pnl: '+$12,450.80', roi: '+210%', winRate: '65%', status: 'PRO' },
    { rank: 5, address: 'AcV2...9kR4', pnl: '+$8,120.00', roi: '+155%', winRate: '62%', status: 'FREE' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* HEADER & FILTRI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#222] pb-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Global Leaderboard</h2>
          <p className="text-gray-400 text-sm mt-1">Top performing wallets tracked by Meme Saver AI.</p>
        </div>
        
        {/* Selettore Timeframe */}
        <div className="flex bg-black border border-[#222] p-1 rounded-xl">
          {['24h', '7d', '30d', 'All Time'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                timeframe === tf 
                  ? 'bg-[#222] text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* TABELLA CLASSIFICA */}
      <div className="bg-black border border-[#222] rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a] text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Rank</th>
                <th className="p-5">Wallet Address</th>
                <th className="p-5">Net PnL</th>
                <th className="p-5">ROI</th>
                <th className="p-5">Win Rate</th>
                <th className="p-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111] text-sm font-medium">
              {topTraders.map((trader) => (
                <tr key={trader.rank} className="hover:bg-[#0a0a0a] transition-colors group">
                  <td className="p-5 font-black text-gray-400 group-hover:text-white">
                    {trader.rank === 1 ? '🥇 01' : trader.rank === 2 ? '🥈 02' : trader.rank === 3 ? '🥉 03' : `0${trader.rank}`}
                  </td>
                  <td className="p-5 font-mono text-gray-300 flex items-center gap-2">
                    {trader.address}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${trader.status === 'PRO' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-gray-800 text-gray-400'}`}>
                      {trader.status}
                    </span>
                  </td>
                  <td className="p-5 font-bold text-emerald-400">{trader.pnl}</td>
                  <td className="p-5 font-bold text-white">{trader.roi}</td>
                  <td className="p-5 text-gray-300">{trader.winRate}</td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => alert(`In futuro qui potrai copiare la strategia di ${trader.address} con un click!`)}
                      className="px-4 py-2 bg-[#111] hover:bg-[#222] text-gray-300 border border-[#333] rounded-lg text-xs font-bold transition-all hover:border-blue-500"
                    >
                      Copy Strategy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Leaderboard;