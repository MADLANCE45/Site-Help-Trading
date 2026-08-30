import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('24h');
  const [topTraders, setTopTraders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState('connecting'); // 'live' or 'offline'
  
  // Custom Toast State
  const [toast, setToast] = useState({ show: false, title: '', message: null });

  // 🛡️ SMART FALLBACK DATA: Genera dati realistici se il backend è offline
  const getMockData = (tf) => {
    let multiplier = tf === '7d' ? 3.5 : tf === '30d' ? 12 : tf === 'All Time' ? 45 : 1;
    return [
      { rank: 1, address: '7xKX...2mQ9', pnl: `+$${(48290.50 * multiplier).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, roi: `+${Math.round(842 * (multiplier * 0.8))}%`, winRate: '89%', status: 'INSTITUTIONAL' },
      { rank: 2, address: 'DezX...3u9P', pnl: `+$${(29410.00 * multiplier).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, roi: `+${Math.round(512 * (multiplier * 0.8))}%`, winRate: '78%', status: 'SNIPER' },
      { rank: 3, address: '9WzY...8vL1', pnl: `+$${(18900.20 * multiplier).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, roi: `+${Math.round(345 * (multiplier * 0.8))}%`, winRate: '71%', status: 'FREE' },
      { rank: 4, address: '3KjM...4nB2', pnl: `+$${(12450.80 * multiplier).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, roi: `+${Math.round(210 * (multiplier * 0.8))}%`, winRate: '65%', status: 'SNIPER' },
      { rank: 5, address: 'AcV2...9kR4', pnl: `+$${(8120.00 * multiplier).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, roi: `+${Math.round(155 * (multiplier * 0.8))}%`, winRate: '62%', status: 'FREE' },
    ];
  };

  useEffect(() => {
    let isMounted = true;

    const fetchLeaderboard = async () => {
      setIsLoading(true);
      
      // ⏱️ TIMEOUT CONTROLLER: Ferma la fetch se il server ci mette più di 4 secondi
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      try {
        const response = await fetch(`http://localhost:3000/api/leaderboard?timeframe=${timeframe}`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId); // Cancella il timeout se il server ha risposto in tempo

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        
        if (isMounted) {
            if (result.success) {
                setTopTraders(result.data);
                setServerStatus('live');
            } else {
                throw new Error(result.message || 'Data format invalid');
            }
        }
      } catch (err) {
        console.warn("Backend unavailable or timed out. Injecting simulated data for UI testing.", err.message);
        // 🔥 NIENTE PIÙ SCHERMO DI CARICAMENTO INFINITO: Inietta i dati finti se il server è spento
        if (isMounted) {
            setTopTraders(getMockData(timeframe));
            setServerStatus('offline');
        }
      } finally {
        if (isMounted) {
            setIsLoading(false);
        }
      }
    };

    fetchLeaderboard();

    return () => {
        isMounted = false; // Cleanup function to avoid memory leaks
    };
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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 selection:bg-emerald-500/30 relative">
      
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111] border border-white/10 text-[10px] font-black text-gray-300 mb-4 uppercase tracking-widest shadow-sm">
            🏆 Top Performers
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Global Leaderboard</h2>
          <div className="flex items-center gap-3 mt-3">
             <p className="text-gray-400 text-sm font-light">The most profitable wallets tracked by our algorithm in the last {timeframe}.</p>
             {serverStatus === 'offline' && (
                 <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] uppercase tracking-widest rounded animate-pulse">Simulated Data</span>
             )}
          </div>
        </div>
        
        {/* Modern Tabs */}
        <div className="flex bg-[#0a0a0a] border border-white/5 p-1.5 rounded-xl shadow-inner overflow-x-auto max-w-full ring-1 ring-white/5">
          {['24h', '7d', '30d', 'All Time'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              disabled={isLoading}
              className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                timeframe === tf 
                  ? 'bg-[#1a1c29] text-emerald-400 shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/5' 
                  : 'text-gray-500 hover:text-gray-300 disabled:opacity-50'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* TABELLA CLASSIFICA (Stile Glassmorphism) */}
      <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px] ring-1 ring-white/5">
        {/* Glow di fondo della tabella */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
        
        {isLoading ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-sm z-10">
                <div className="w-10 h-10 border-4 border-[#222] border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase animate-pulse">Syncing On-Chain Data...</span>
             </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#0a0c10] text-gray-500 text-[10px] font-black uppercase tracking-widest">
                <th className="p-6 whitespace-nowrap">Rank</th>
                <th className="p-6 whitespace-nowrap">Trader Identity</th>
                <th className="p-6 whitespace-nowrap">Net PnL</th>
                <th className="p-6 whitespace-nowrap">ROI</th>
                <th className="p-6 whitespace-nowrap">Win Rate</th>
                <th className="p-6 text-right whitespace-nowrap">Alpha</th>
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
                        <span className={`text-[8px] px-2 py-1 rounded-md font-black uppercase tracking-widest hidden sm:inline-block ${
                          trader.status === 'PREMIUM' || trader.status === 'INSTITUTIONAL' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                          trader.status === 'PRO' || trader.status === 'SNIPER' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          'bg-white/5 text-gray-500'
                        }`}>
                          {trader.status}
                        </span>
                      </div>
                    </td>

                    <td className="p-6 font-black text-emerald-400 text-lg whitespace-nowrap">{trader.pnl}</td>
                    <td className="p-6 font-bold text-white whitespace-nowrap">{trader.roi}</td>
                    <td className="p-6 font-bold text-gray-400 whitespace-nowrap">{trader.winRate}</td>
                    
                    {/* Azione Copy */}
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => handleCopyTradeClick(trader.address)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ml-auto whitespace-nowrap ${
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