import React, { useState } from 'react';

export const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('24h');

  const topTraders = [
    { rank: 1, address: '7xKX...2mQ9', pnl: '+$48,290.50', roi: '+842%', winRate: '89%', status: 'PREMIUM' },
    { rank: 2, address: 'DezX...3u9P', pnl: '+$29,410.00', roi: '+512%', winRate: '78%', status: 'PRO' },
    { rank: 3, address: '9WzY...8vL1', pnl: '+$18,900.20', roi: '+345%', winRate: '71%', status: 'FREE' },
    { rank: 4, address: '3KjM...4nB2', pnl: '+$12,450.80', roi: '+210%', winRate: '65%', status: 'PRO' },
    { rank: 5, address: 'AcV2...9kR4', pnl: '+$8,120.00', roi: '+155%', winRate: '62%', status: 'FREE' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 selection:bg-[#00ffcc]/30">
      
      {/* HEADER & FILTRI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 mb-3 uppercase tracking-widest">
            🏆 Top Performers
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Global Leaderboard</h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">I wallet più profittevoli tracciati dall'algoritmo nelle ultime {timeframe}.</p>
        </div>
        
        {/* Modern Tabs */}
        <div className="flex bg-[#0a0a0a] border border-white/5 p-1.5 rounded-xl shadow-inner">
          {['24h', '7d', '30d', 'All Time'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                timeframe === tf 
                  ? 'bg-[#1a1c29] text-[#00ffcc] shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/5' 
                  : 'text-gray-600 hover:text-gray-300'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* TABELLA CLASSIFICA (Stile Glassmorphism) */}
      <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Glow di fondo della tabella */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00ffcc]/30 to-transparent"></div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#0a0c10] text-gray-500 text-[10px] font-black uppercase tracking-widest">
                <th className="p-6">Rank</th>
                <th className="p-6">Trader Identity</th>
                <th className="p-6">Net PnL</th>
                <th className="p-6">ROI</th>
                <th className="p-6">Win Rate</th>
                <th className="p-6 text-right">Alpha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-medium">
              {topTraders.map((trader, idx) => {
                const isTop3 = idx < 3;
                return (
                  <tr key={trader.rank} className="hover:bg-white/[0.02] transition-colors duration-300 group relative">
                    
                    {/* Numero Posizione */}
                    <td className="p-6 relative">
                      <div className={`text-2xl font-black ${
                        idx === 0 ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 
                        idx === 1 ? 'text-gray-300 drop-shadow-[0_0_10px_rgba(209,213,219,0.3)]' : 
                        idx === 2 ? 'text-amber-700' : 'text-gray-700'
                      }`}>
                        {idx === 0 ? '01' : idx === 1 ? '02' : idx === 2 ? '03' : `0${trader.rank}`}
                      </div>
                    </td>

                    {/* Dati Wallet */}
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isTop3 ? 'bg-[#111] border-white/10' : 'bg-transparent border-transparent'}`}>
                          {isTop3 ? '🐋' : '👤'}
                        </div>
                        <div className="font-mono text-gray-200 font-bold">{trader.address}</div>
                        <span className={`text-[8px] px-2 py-1 rounded-md font-black uppercase tracking-widest ${
                          trader.status === 'PREMIUM' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                          trader.status === 'PRO' ? 'bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/20' : 
                          'bg-white/5 text-gray-500'
                        }`}>
                          {trader.status}
                        </span>
                      </div>
                    </td>

                    <td className="p-6 font-black text-emerald-400 text-lg">{trader.pnl}</td>
                    <td className="p-6 font-bold text-white">{trader.roi}</td>
                    <td className="p-6 font-bold text-gray-400">{trader.winRate}</td>
                    
                    {/* Azione Copy */}
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => alert(`Stiamo sviluppando il Copy-Trading On-Chain. Presto potrai clonare ${trader.address}!`)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ml-auto ${
                          isTop3 
                            ? 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                            : 'bg-[#111] text-gray-400 border border-white/10 hover:bg-[#222] hover:text-white'
                        }`}
                      >
                        Copy Trade
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Leaderboard;