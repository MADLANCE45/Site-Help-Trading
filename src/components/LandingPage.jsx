import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- COMPONENTE GRAFICO: Le barre verticali stile Solana Status ---
const StatusBars = ({ healthPercentage }) => {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[...Array(24)].map((_, i) => {
        const isAnomaly = Math.random() * 100 > healthPercentage;
        return (
          <div 
            key={i} 
            className={`w-1 rounded-sm transition-all duration-500 ${
              isAnomaly ? 'h-2 bg-amber-500' : 'h-4 bg-emerald-500'
            }`}
          ></div>
        );
      })}
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const videoRef = useRef(null);
  
  // --- STATO REALE DELLA RETE ---
  const [networkPing, setNetworkPing] = useState('--');
  const [systemHealth, setSystemHealth] = useState({
    status: 'connecting',
    services: { radar: 100, deepseek: 100, gpt4o: 100, claude: 100 }
  });

  // --- EFFETTO PING: Controlla il Backend ogni 10 secondi ---
  useEffect(() => {
    let isMounted = true;
    const checkNetwork = async () => {
      const startTime = Date.now();
      const API_URL = import.meta.env.VITE_API_URL || 'https://help-trading-production.up.railway.app';
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch(`${API_URL}/api/health`, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!res.ok) throw new Error("Backend error");
        
        const data = await res.json();
        const latency = Date.now() - startTime;
        
        if (isMounted) {
          setNetworkPing(latency);
          setSystemHealth({
            status: latency > 800 ? 'degraded' : 'operational',
            services: data.services
          });
        }
      } catch (err) {
        if (isMounted) {
          setNetworkPing('ERR');
          setSystemHealth({
            status: 'offline',
            services: { radar: 0, deepseek: 0, gpt4o: 0, claude: 0 }
          });
        }
      }
    };

    checkNetwork(); 
    const interval = setInterval(checkNetwork, 10000); 
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  // Gestione Video Autoplay
  useEffect(() => {
    if (videoRef.current) {
        if(isPlaying){
            videoRef.current.play().catch(error => {
                setIsPlaying(false);
                console.log("Autoplay prevented:", error);
            });
        } else {
            videoRef.current.pause();
        }
    }
  }, [isPlaying]);

  // Gestione Scroll Modale
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">
      
      {/* GLOBAL TOP BANNER */}
      <div className="w-full bg-emerald-500/10 border-b border-emerald-500/20 py-2 text-center z-50 relative flex items-center justify-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
          DeepSeek AI Core Active • Deep On-Chain Scan (~15s)
        </span>
      </div>

      {/* ENHANCED NAVBAR */}
      <nav className="sticky top-0 w-full bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* LOGO - FIX MOBILE: shrink-0 e whitespace-nowrap */}
          <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => window.scrollTo(0,0)}>
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-xl group-hover:bg-emerald-500/40 transition-colors"></div>
              <img 
                src="/meme.png" 
                alt="Meme Saver Logo" 
                className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl border border-white/10 shadow-lg shrink-0 object-cover"
              />
            </div>
            <div className="text-xl md:text-2xl font-black tracking-tight text-white whitespace-nowrap">
              Meme<span className="text-gray-500 font-medium">Saver</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-gray-400">
            <a href="#features" className="hover:text-white transition-colors tracking-wide">Features</a>
            <span 
              onClick={() => navigate('/dashboard/pricing')} 
              className="hover:text-white transition-colors cursor-pointer tracking-wide flex items-center gap-2"
            >
              Pricing <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-bold">Pro</span>
            </span>
            <span className="hover:text-white transition-colors cursor-pointer tracking-wide opacity-50">Docs API</span>
          </div>
          
          {/* Action Buttons & Network Status */}
          <div className="flex items-center gap-4">
            
            {/* NETWORK STATUS PILL & DROPDOWN */}
            <div 
              className="relative hidden lg:block"
              onMouseEnter={() => setIsNetworkModalOpen(true)}
              onMouseLeave={() => setIsNetworkModalOpen(false)}
            >
              {/* PILL DINAMICA */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg cursor-help backdrop-blur-md transition-colors hover:bg-white/10">
                <div className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${systemHealth.status === 'offline' ? 'bg-rose-500' : systemHealth.status === 'degraded' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${systemHealth.status === 'offline' ? 'bg-rose-500' : systemHealth.status === 'degraded' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${systemHealth.status === 'offline' ? 'text-rose-400' : systemHealth.status === 'degraded' ? 'text-amber-400' : 'text-gray-300'}`}>
                   {systemHealth.status === 'offline' ? 'Terminal Offline' : systemHealth.status === 'degraded' ? 'High Latency' : 'All Systems Operational'}
                </span>
              </div>

              {/* DROPDOWN MENU - BARRRE REALI STILE SOLANA */}
              <div className={`absolute top-full right-0 mt-3 w-72 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 origin-top-right ${isNetworkModalOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="flex justify-between items-end border-b border-white/5 pb-3 mb-4">
                  <div className="text-xs font-black text-white uppercase tracking-widest">Network Health</div>
                  <div className="text-[10px] font-mono text-gray-400">{networkPing === '--' || networkPing === 'ERR' ? 'Offline' : `${networkPing}ms`}</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      <span>Live Radar Stream</span>
                      <span className="text-emerald-400 font-mono">{systemHealth.services.radar.toFixed(1)}%</span>
                    </div>
                    <StatusBars healthPercentage={systemHealth.services.radar} />
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      <span>DeepSeek API (Base)</span>
                      <span className="text-emerald-400 font-mono">{systemHealth.services.deepseek.toFixed(1)}%</span>
                    </div>
                    <StatusBars healthPercentage={systemHealth.services.deepseek} />
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      <span>OpenAI GPT-4o (Inst.)</span>
                      <span className="text-emerald-400 font-mono">{systemHealth.services.gpt4o.toFixed(1)}%</span>
                    </div>
                    <StatusBars healthPercentage={systemHealth.services.gpt4o} />
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      <span>Claude 3.5 Sonnet (Inst.)</span>
                      <span className="text-emerald-400 font-mono">{systemHealth.services.claude.toFixed(1)}%</span>
                    </div>
                    <StatusBars healthPercentage={systemHealth.services.claude} />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/dashboard')}
              className="hidden sm:block text-sm font-bold text-gray-400 hover:text-white transition-colors ml-2 whitespace-nowrap"
            >
              Dashboard
            </button>
            
            <button className="px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-emerald-400 to-cyan-500 text-black text-xs sm:text-sm font-black rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] whitespace-nowrap shrink-0">
              Join Private Beta
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 px-6 min-h-[90vh] flex items-center justify-center">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-600/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          <div className="text-left z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-emerald-400 mb-6 uppercase tracking-wider backdrop-blur-sm shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live on Pump.fun & Raydium
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-6">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Unfair</span><br/> Advantage.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed font-light">
              The only extension that analyzes smart contracts, exposes developer micro-dumping, and delivers a real-time AI Trust Score directly inside your browser.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black text-lg rounded-xl transition-all hover:bg-gray-200 hover:-translate-y-1 shadow-[0_10px_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                Install Extension
              </button>
              <button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-lg rounded-xl transition-all backdrop-blur-sm">
                Open Dashboard
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[360px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-3xl rounded-[2rem] transform scale-105"></div>
            
            <div className="relative bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,1)] overflow-hidden flex flex-col aspect-[10/16] ring-1 ring-white/5">
              <div className="h-10 bg-[#161616] border-b border-white/5 flex items-center px-4 relative z-20 shrink-0">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-black/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-black/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-black/20"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bg-[#050505] px-3 py-1 rounded-md border border-white/5 flex items-center gap-2">
                  <img src="/meme.png" alt="icon" className="w-3 h-3 rounded-sm grayscale" />
                  <span className="text-[9px] font-mono text-gray-400 tracking-widest">MEME SAVER</span>
                </div>
              </div>

              <div className="relative w-full flex-1 bg-[#050505] flex items-center justify-center">
                <video 
                  src="/demo4k.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover object-center" 
                />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.95)] pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM LOGOS */}
      <section className="py-10 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-lg md:text-xl font-black tracking-widest uppercase">Pump.fun</div>
          <div className="text-lg md:text-xl font-black tracking-widest uppercase">DexScreener</div>
          <div className="text-lg md:text-xl font-black tracking-widest uppercase">Raydium</div>
          <div className="text-lg md:text-xl font-black tracking-widest uppercase">Solana</div>
        </div>
      </section>

      {/* FEATURES & SECONDARY VIDEO */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Stop trading blind.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Watch our Radar analyze token supply and uncover Developer Sybil networks before you hit the Buy button.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div 
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] aspect-video flex items-center justify-center group shadow-2xl ring-1 ring-white/5 cursor-pointer transform hover:scale-[1.02] transition-all duration-500"
              onClick={() => setIsModalOpen(true)}
            >
              <video 
                  src="/Video.mp4" 
                  autoPlay
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-contain opacity-60 group-hover:opacity-80 transition-opacity duration-700 blur-[2px] group-hover:blur-0" 
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
              
              <div className="relative z-10 w-20 h-20 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all duration-500 border border-white/10 group-hover:border-emerald-500/50">
                <svg className="w-8 h-8 text-white translate-x-0.5 opacity-90 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              
              <div className="absolute bottom-6 left-6 text-xs font-bold text-gray-300 bg-[#050505]/80 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                Watch Full Demo <span className="text-emerald-400 ml-1">0:50</span>
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-100 tracking-tight mb-1.5 group-hover:text-emerald-400 transition-colors">Micro-Dumping Detector</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Tracks silent movements of Dev-linked wallets. The algorithm detects when liquidity is fragmented and secretly dumped on retail.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-100 tracking-tight mb-1.5 group-hover:text-emerald-400 transition-colors">Instant Trust Score</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Browse Pump.fun or DexScreener naturally. Our panel generates a real-time score from 1 to 100 based on 12 complex on-chain metrics.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-100 tracking-tight mb-1.5 group-hover:text-emerald-400 transition-colors">Bundle Supply Shield</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Instantly discover if the Dev bought their own supply in the exact same launch block using Jito, preparing to drain the liquidity pool.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section id="roadmap" className="py-32 px-6 relative border-t border-white/5 bg-gradient-to-b from-[#050505] to-[#020202]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              The Masterplan
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Evolving the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Edge.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              We are not just building an extension. We are building the ultimate on-chain execution terminal for Solana.
            </p>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-16 pb-8">
            
            {/* PHASE 1: CURRENT */}
            <div className="relative pl-10 md:pl-16 group">
              <div className="absolute -left-[17px] top-1 w-8 h-8 bg-[#050505] border border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-2">Phase 1 • Live Now</div>
              <h3 className="text-2xl font-black text-white mb-4">Web Terminal & Extension</h3>
              <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-xl group-hover:border-emerald-500/30 transition-colors">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-400"><span className="text-emerald-500">✓</span> Real-time AI Trust Score</li>
                  <li className="flex items-center gap-3 text-sm text-gray-400"><span className="text-emerald-500">✓</span> Micro-Dumping Radar</li>
                  <li className="flex items-center gap-3 text-sm text-gray-400"><span className="text-emerald-500">✓</span> Phantom Web3 Integration</li>
                </ul>
              </div>
            </div>

            {/* PHASE 2 */}
            <div className="relative pl-10 md:pl-16 group">
              <div className="absolute -left-[17px] top-1 w-8 h-8 bg-[#050505] border border-cyan-500 rounded-full flex items-center justify-center z-10 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-shadow">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              </div>
              <div className="text-cyan-400 font-bold text-sm tracking-widest uppercase mb-2">Phase 2 • Target: Oct 15, 2026</div>
              <h3 className="text-2xl font-black text-white mb-4">Mobile Telegram Ecosystem</h3>
              <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-xl group-hover:border-cyan-500/30 transition-colors">
                <p className="text-sm text-gray-400 mb-5 font-light leading-relaxed">
                  Expanding our architecture to rule the mobile market and slashing latency to absolute zero.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-300"><span className="text-cyan-500 font-black">→</span> <b>Telegram Sniper Bot:</b> Analyze tokens directly from your phone chat.</li>
                  <li className="flex items-start gap-3 text-sm text-gray-300"><span className="text-cyan-500 font-black">→</span> <b>Alpha Broadcast Channel:</b> Instant automated alerts for tokens hitting 90+ Trust Score.</li>
                  <li className="flex items-start gap-3 text-sm text-gray-300"><span className="text-cyan-500 font-black">→</span> <b>Sub-10s Execution:</b> Engine optimized to deliver complex AI scans in under 10 seconds.</li>
                </ul>
              </div>
            </div>

            {/* PHASE 3 */}
            <div className="relative pl-10 md:pl-16 group">
              <div className="absolute -left-[17px] top-1 w-8 h-8 bg-[#050505] border border-purple-500 rounded-full flex items-center justify-center z-10 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
              <div className="text-purple-400 font-bold text-sm tracking-widest uppercase mb-2">Phase 3 • Terminal Webhooks</div>
              <h3 className="text-2xl font-black text-white mb-4">The Alpha Notification Protocol</h3>
              <div className="bg-gradient-to-br from-[#1a1025] to-[#0a0a0a] border border-purple-500/20 p-6 rounded-2xl shadow-xl group-hover:border-purple-500/50 transition-colors relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 blur-2xl"></div>
                <p className="text-sm text-gray-300 mb-2 font-light leading-relaxed relative z-10">
                  Instead of staring at charts, connect Meme Saver to your private Discord or Telegram. Receive instant priority alerts the moment our AI assigns a Trust Score &gt; 90 to a new launch.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/20 border border-purple-500/30 text-[10px] font-black text-purple-300 uppercase tracking-widest relative z-10">
                  Priority API Access included in Premium
                </div>
              </div>
            </div>

            {/* PHASE 4 */}
            <div className="relative pl-10 md:pl-16 group">
              <div className="absolute -left-[17px] top-1 w-8 h-8 bg-[#050505] border border-amber-500 rounded-full flex items-center justify-center z-10 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-shadow">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              </div>
              <div className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-2">Phase 4 • The Endgame</div>
              <h3 className="text-2xl font-black text-white mb-4">Native Investment Platform</h3>
              <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-xl group-hover:border-amber-500/30 transition-colors">
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">
                  Why leave the dashboard to buy? We will integrate custom DEX routing directly into Meme Saver. You'll be able to analyze, manage risk, and execute trades in one single interface.
                </p>
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50 rounded"></div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* FOOTER & LEGAL DISCLAIMER */}
      <footer className="border-t border-white/5 bg-[#020202] pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-2 pr-8">
              <div className="flex items-center gap-3 mb-6">
                <img src="/meme.png" alt="Logo" className="w-8 h-8 rounded-lg border border-white/10 shadow-[0_0_10px_rgba(16,185,129,0.2)] object-cover" />
                <span className="text-xl font-black tracking-tight text-white">
                  Meme<span className="text-gray-400 font-medium">Saver</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md font-light">
                The on-chain analysis infrastructure designed to protect retail traders. We detect Sybil schemes, supply manipulation, and micro-dumping before you press buy.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal & Policy</h4>
              <ul className="space-y-4 text-sm text-gray-400 font-medium">
  <li>
     <span onClick={() => window.open('/terms.pdf', '_blank')} className="hover:text-emerald-400 transition-colors cursor-pointer">Terms of Service</span> 
  </li>
  <li>
    {/* ECCO IL LINK ALLA TUA NUOVA PAGINA REACT! */}
    <span onClick={() => navigate('/privacy-policy')} className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</span>
  </li>
  <li>
    <span onClick={() => window.open('/cookie.pdf', '_blank')} className="hover:text-emerald-400 transition-colors cursor-pointer">Cookie Policy</span>   
  </li>
  <li>
    <span onClick={() => window.open('/risk.pdf', '_blank')} className="hover:text-emerald-400 transition-colors cursor-pointer">Risk Disclosure</span>
  </li>
</ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 text-sm text-gray-400 font-medium">
                <li>
                  <a href="mailto:HelpTrading@proton.me" className="hover:text-emerald-400 transition-colors flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    HelpTrading@proton.me
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-3 opacity-50 cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    Discord (PRO Only)
                  </span>
                </li>
                <li>
                  <a href="https://x.com/H3lpTrading" target="_blank" rel="noopener noreferrer" className="hover:text-[#1DA1F2] transition-colors flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 ml-0.5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X / Twitter
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-8 text-xs text-gray-500 leading-relaxed text-justify font-light">
            <strong className="text-gray-400 font-bold">IMPORTANT DISCLAIMER:</strong> Meme Saver is exclusively a data analysis tool and on-chain monitoring software. No information provided via the extension, website, or APIs constitutes financial, investment, or trading advice. Trading cryptocurrencies and memecoins on decentralized platforms carries an extreme risk of total capital loss. Trust score algorithms and simulations are based on historical data and probabilistic patterns and do not guarantee protection against fraud or losses. The user assumes full responsibility for their actions.
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-gray-600 font-medium">
            <p>© {new Date().getFullYear()} Meme Saver Analytics. All rights reserved.</p>
            <p className="mt-4 md:mt-0 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${systemHealth.status === 'offline' ? 'bg-rose-500' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${systemHealth.status === 'offline' ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
              </span>
              {systemHealth.status === 'offline' ? 'Terminal Offline' : 'All Systems Operational'}
            </p>
          </div>
        </div>
      </footer>

      {/* FULLSCREEN VIDEO MODAL */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-emerald-500 text-white transition-colors duration-300 backdrop-blur-md"
            onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)] border border-white/10 bg-black scale-in-center"
            onClick={(e) => e.stopPropagation()} 
          >
            <video 
              src="/Video.mp4" 
              autoPlay 
              controls 
              className="w-full h-full object-contain"
            ></video>
          </div>
        </div>
      )}

    </div>
  );
};

export default LandingPage;