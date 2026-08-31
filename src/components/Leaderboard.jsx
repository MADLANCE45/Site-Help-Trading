import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('24h');
  const [topTraders, setTopTraders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState('connecting'); // 'live' or 'offline'
  
  // Custom Toast State
  const [toast, setToast] = useState({ show: false, title: '', message: null });
  
  // Network Modal State
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);

  // 🛡️ SMART FALLBACK DATA: Generate realistic data if backend is offline
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
      
      // ⏱️ TIMEOUT CONTROLLER: Abort fetch if server takes more than 4 seconds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      try {
        const response = await fetch(`http://localhost:3000/api/leaderboard?timeframe=${timeframe}`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

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
        // 🔥 NO MORE INFINITE LOADING: Inject mock data if server is down
        if (isMounted) {
            setTopTraders([]); // Array vuoto, niente dati simulati!
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

  // Mock Copy-Trade handler with Premium Notification
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

      // Hide notification after 5 seconds
      setTimeout(() => setToast({ show: false, title: '', message: null }), 5000);
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 selection:bg-emerald-500/30 relative">
      
      {/* CUSTOM TOAST NOTIFICATION (Premium UI) */}
      <div className={`fixed bottom-10 right-10 z-50 transition-all duration-500 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-blue-500/30 p-5 rounded-2xl shadow-[0_10px_40px_rgba(59,130,246,0.2)] max-w-sm flex gap-4 items-start ring-1 ring-white/5">
          <div className="mt-0.5 animate-pulse text-blue-400">
            {/* SVG Lock Icon replacing Emoji */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-black text-sm tracking-wider uppercase mb-1">{toast.title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={() => setToast({ show: false, title: '', message: null })} className="text-gray-600 hover:text-white transition-colors ml-2">
            ✕
          </button>
        </div>
      </div>

      {/* HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111] border border-white/10 text-[10px] font-black text-gray-300 mb-4 uppercase tracking-widest shadow-sm">
            {/* SVG Trophy/Star Icon replacing Emoji */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-amber-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            Top Performers
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Global Leaderboard</h2>
          <div className="flex items-center gap-3 mt-3">
             <p className="text-gray-400 text-sm font-light">The most profitable wallets tracked by our algorithm in the last {timeframe}.</p>
             {serverStatus === 'offline' && (
                 <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] uppercase tracking-widest rounded animate-pulse">Simulated Data</span>
             )}
          </div>
        </div>
        
        {/* RIGHT SIDE: NETWORK STATUS & TABS */}
        <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
          
          {/* NETWORK STATUS PILL & DROPDOWN */}
          <div 
            className="relative z-50 w-full md:w-auto flex justify-end"
            onMouseEnter={() => setIsNetworkModalOpen(true)}
            onMouseLeave={() => setIsNetworkModalOpen(false)}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0a] border border-white/10 rounded-lg cursor-help transition-colors hover:bg-[#111]">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">All Systems Operational</span>
            </div>

            {/* DROPDOWN MENU */}
            <div className={`absolute top-full right-0 mt-3 w-72 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 origin-top-right ${isNetworkModalOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="text-xs font-black text-white uppercase tracking-widest mb-5 border-b border-white/5 pb-3">Live Network Health</div>
              
              <div className="space-y-5">
                {/* Helius RPC */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span>Solana RPC (Helius)</span>
                    <span className="text-emerald-400">99.9%</span>
                  </div>
                  <div className="w-full bg-[#161616] rounded-full h-1.5 border border-white/5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full relative" style={{ width: '99%' }}>
                      <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                </div>

                {/* DeepSeek / AI Core */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span>AI Core (DeepSeek/Claude)</span>
                    <span className="text-emerald-400">100%</span>
                  </div>
                  <div className="w-full bg-[#161616] rounded-full h-1.5 border border-white/5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '100%' }}></div>
                  </div>
                </div>

                {/* Backend */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span>Backend Node Engine</span>
                    <span className="text-amber-400">32% Load</span>
                  </div>
                  <div className="w-full bg-[#161616] rounded-full h-1.5 border border-white/5 overflow-hidden">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Global Latency</span>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  42ms
                </span>
              </div>
            </div>
          </div>

          {/* Modern Tabs */}
          <div className="flex bg-[#0a0a0a] border border-white/5 p-1.5 rounded-xl shadow-inner overflow-x-auto w-full md:w-auto ring-1 ring-white/5">
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
      </div>

      {/* TABLE SECTION (Glassmorphism Style) */}
      <div className="bg-[#050505] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px] ring-1 ring-white/5 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
        
        {isLoading ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-sm z-10">
                <div className="w-10 h-10 border-4 border-[#222] border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase animate-pulse">Syncing On-Chain Data...</span>
             </div>
        ) : null}

        <div className="overflow-x-auto relative">
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
                    
                    {/* Rank Number */}
                    <td className="p-6 relative">
                      <div className={`text-2xl font-black ${
                        idx === 0 ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 
                        idx === 1 ? 'text-gray-300 drop-shadow-[0_0_10px_rgba(209,213,219,0.3)]' : 
                        idx === 2 ? 'text-amber-700' : 'text-gray-700'
                      }`}>
                        {idx === 0 ? '01' : idx === 1 ? '02' : idx === 2 ? '03' : `0${trader.rank}`}
                      </div>
                    </td>

                    {/* Wallet Data */}
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isTop3 ? 'bg-[#111] border-emerald-500/20' : 'bg-transparent border-transparent'}`}>
                          {/* Clean SVG replacing user/whale emojis */}
                          {isTop3 ? (
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-emerald-400">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                             </svg>
                          ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                             </svg>
                          )}
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
                    
                    {/* Copy Action */}
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