import React, { useState, useEffect } from 'react';

export const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('24h');
  const [topTraders, setTopTraders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Custom Toast State per sostituire l'orribile alert()
  const [toast, setToast] = useState({ show: false, title: '', message: null });

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/leaderboard?timeframe=${timeframe}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        
        if (result.success) {
            setTopTraders(result.data);
        } else {
            throw new Error(result.message || 'Failed to fetch data');
        }

      } catch (err) {
        console.error("Failed to load leaderboard:", err);
        setError("Unable to load the leaderboard at this time. Please check your connection or try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeframe]);

  // Gestione del finto Copy-Trade con Notifica Premium
  const handleCopyTradeClick = (address) => {
      setToast({
          show: true,
          title: "Feature in Development",
          message: (
            <span>
              On-Chain Copy-Trading is rolling out soon. You'll be able to auto-clone <strong className="text-white">{address}</strong> flawlessly. <br/><br/>
              <span className="text-amber-400 font-bold">Exclusive to SNIPER & INSTITUTIONAL plans.</span>
            </span>
          )
      });

      // Nasconde la notifica dopo 5 secondi
      setTimeout(() => setToast({ show: false, title: '', message: null }), 5000);
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 selection:bg-[#00ffcc]/30 relative">
      
      {/* CUSTOM TOAST NOTIFICATION (Premium UI) */}
      <div className={`fixed bottom-10 right-10 z-50 transition-all duration-500 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-blue-500/30 p-5 rounded-2xl shadow-[0_10px_40px_rgba(59,130,246,0.2)] max-w-sm flex gap-4 items-start ring-1 ring-white/5">
          <div className="text-2xl mt-0.5 animate-pulse">🔒</div>
          <div>
            <h4 className="text-white font-black text-sm tracking-wider uppercase mb-1">{toast.title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={() => setToast({ show: false, title: '', message: null })} className="text-gray-600 hover:text-white transition-colors ml-2">
            ✕
          </button>
        </div>
      </div>

      {/* HEADER & FILTRI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 mb-3 uppercase tracking-widest">
            🏆 Top Performers
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Global Leaderboard</h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">The most profitable wallets tracked by our algorithm in the last {timeframe}.</p>
        </div>
        
        {/* Modern Tabs */}
        <div className="flex bg-[#0a0a0a] border border-white/5 p-1.5 rounded-xl shadow-inner overflow-x-auto max-w-full">
          {['24h', '7d', '30d', 'All Time'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              disabled={isLoading}
              className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                timeframe === tf 
                  ? 'bg-[#1a1c29] text-[#00ffcc] shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/5' 
                  : 'text-gray-600 hover:text-gray-300 disabled:opacity-50'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* ERROR MESSAGE (Decorato) */}
      {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-6 rounded-2xl text-sm font-medium flex items-center justify-center gap-3">
              <span className="text-xl">⚠️</span> {error}
          </div>
      )}

      {/* TABELLA CLASSIFICA (Stile Glassmorphism) */}
      <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px]">
        {/* Glow di fondo della tabella */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00ffcc]/30 to-transparent"></div>
        
        {isLoading ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-sm z-10">
                <div className="relative flex h-8 w-8 mb-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-[#00ffcc]"></span>
                </div>
                <span className="text-gray-400 font-mono text-sm tracking-widest uppercase animate-pulse">Syncing On-Chain Data...</span>
             </div>
        ) : null}

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
            <tbody className={`divide-y divide-white/5 text-sm font-medium transition-opacity duration-300 ${isLoading ? 'opacity-30' : 'opacity-100'}`}>
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
                          trader.status === 'PREMIUM' || trader.status === 'INSTITUTIONAL' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                          trader.status === 'PRO' || trader.status === 'SNIPER' ? 'bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/20' : 
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
                        onClick={() => handleCopyTradeClick(trader.address)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ml-auto ${
                          isTop3 
                            ? 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-0.5' 
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