import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);

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
          Helius Turbo Nodes fully integrated • Sub-millisecond latency active
        </span>
      </div>

      {/* ENHANCED NAVBAR */}
      <nav className="sticky top-0 w-full bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-xl group-hover:bg-emerald-500/40 transition-colors"></div>
              <img 
                src="/meme.png" 
                alt="Meme Saver Logo" 
                className="relative w-10 h-10 rounded-xl border border-white/10 shadow-lg"
              />
            </div>
            <div className="text-2xl font-black tracking-tight text-white">
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
          
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate('/dashboard')}
              className="hidden sm:block text-sm font-bold text-gray-400 hover:text-white transition-colors"
            >
              Dashboard
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-400 to-cyan-500 text-black text-sm font-black rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              Add to Browser
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
            
            {/* SECONDARY VIDEO BOX (THUMBNAIL FOR LIGHTBOX) */}
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
              
              {/* Elegant Play Button */}
              <div className="relative z-10 w-20 h-20 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all duration-500 border border-white/10 group-hover:border-emerald-500/50">
                <svg className="w-8 h-8 text-white translate-x-0.5 opacity-90 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              
              {/* Adjusted Label */}
              <div className="absolute bottom-6 left-6 text-xs font-bold text-gray-300 bg-[#050505]/80 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                Watch Full Demo <span className="text-emerald-400 ml-1">0:50</span>
              </div>
            </div>

            {/* REFINED BULLET POINTS */}
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

      {/* FOOTER & LEGAL DISCLAIMER */}
      <footer className="border-t border-white/5 bg-[#020202] pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-2 pr-8">
              <div className="flex items-center gap-3 mb-6">
                <img src="/meme.png" alt="Logo" className="w-8 h-8 rounded-lg border border-[#333] grayscale opacity-80" />
                <span className="text-xl font-black tracking-tight text-white opacity-90">
                  Meme<span className="text-gray-500 font-medium">Saver</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md font-light">
                The on-chain analysis infrastructure designed to protect retail traders. We detect Sybil schemes, supply manipulation, and micro-dumping before you press buy.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal & Policy</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><a href="/terms.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/privacy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/cookie.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="/risk.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Risk Disclosure</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><a href="mailto:HelpTrading@proton.me" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><span className="text-lg">✉️</span> HelpTrading@proton.me</a></li>
                <li><span className="flex items-center gap-3 opacity-50 cursor-not-allowed"><span className="text-lg">💬</span> Discord (PRO Only)</span></li>
                <li><a href="https://x.com/H3lpTrading" target="_blank" rel="noopener noreferrer" className="hover:text-[#1DA1F2] transition-colors flex items-center gap-3"><span className="text-lg">🐦</span> X / Twitter</a></li>
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All Systems Operational
            </p>
          </div>
        </div>
      </footer>

      {/* FULLSCREEN VIDEO MODAL (LIGHTBOX) */}
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