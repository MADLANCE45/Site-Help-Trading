import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-[#050505]/70 backdrop-blur-2xl border-b border-white/5 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img 
              src="/meme.jpg" 
              alt="Meme Saver Logo" 
              className="w-10 h-10 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            />
            <div className="text-2xl font-black tracking-tight text-white">
              Meme<span className="text-gray-500 font-medium">Saver</span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Funzionalità</a>
            <span 
              onClick={() => navigate('/dashboard/pricing')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Piani & Pro
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="hidden sm:block text-sm font-semibold text-gray-400 hover:text-white transition-colors"
            >
              Area Utente
            </button>
            <button className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              Scarica Estensione
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 min-h-[95vh] flex items-center justify-center">
        {/* Glow di sfondo astratto */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* TESTO HERO */}
          <div className="text-left z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-emerald-400 mb-6 uppercase tracking-wider backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live su Pump.fun & Raydium
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-6">
              Il tuo <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Vantaggio</span><br/> On-Chain.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed font-light">
              L'estensione che analizza i contratti, rivela il micro-dumping dei dev e ti fornisce un Trust Score IA direttamente nel tuo browser.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-black font-black text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1">
                Installa Estensione
              </button>
              <button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-lg rounded-xl transition-all backdrop-blur-sm">
                Esplora Dashboard
              </button>
            </div>
          </div>

          {/* VIDEO VETRINA (Design Premium Verticale) */}
          {/* Vetrina a destra (La tua Estensione in Azione) */}
          {/* Vetrina a destra (La tua Estensione in Azione) */}
          {/* Vetrina a destra (La tua Estensione in Azione) */}
          <div className="relative mx-auto w-full max-w-[320px] lg:max-w-[350px]">
            {/* Glow dietro il mockup */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-2xl rounded-3xl transform scale-105"></div>
            
            {/* Contenitore dell'estensione - ALTEZZA FISSA 550px */}
            <div className="relative bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/5 h-[550px]">
              
              {/* Header dell'estensione (ALTEZZA AUMENTATA QUI) */}
              <div className="h-16 bg-[#111] border-b border-white/5 flex items-center px-4 relative z-20 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                <div className="ml-auto text-[10px] font-mono text-gray-500 tracking-widest">MEME SAVER</div>
              </div>

              {/* Video Player - HACK DELLO ZOOM */}
              <div className="relative w-full h-[calc(100%-3rem)] bg-[#050505] flex items-center justify-center overflow-hidden">
                <video 
                  src="/demo4k.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover scale-[1.26] origin-center" 
                />
                {/* Ombra interna rafforzata per nascondere eventuali tagli imprecisi */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,1)] pointer-events-none"></div>
              </div>
            </div>

            {/* Badge fluttuante decorativo - SPOSTATO IN BASSO A DESTRA */}
            <div className="absolute -right-4 md:-right-10 bottom-16 bg-[#0a0a0a]/90 backdrop-blur-xl border border-rose-500/30 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-40 animate-[bounce_4s_infinite]">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </div>
              <div>
                <div className="text-white font-black text-[10px] tracking-wider">SCAM DETECTED</div>
                <div className="text-[9px] text-gray-400 mt-0.5">Micro-Dump Risk: <span className="text-rose-400 font-bold">HIGH</span></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STRISCIA LOGHI */}
      <section className="py-8 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-lg md:text-xl font-black tracking-widest uppercase">Pump.fun</div>
          <div className="text-lg md:text-xl font-black tracking-widest uppercase">DexScreener</div>
          <div className="text-lg md:text-xl font-black tracking-widest uppercase">Raydium</div>
          <div className="text-lg md:text-xl font-black tracking-widest uppercase">Solana</div>
        </div>
      </section>

      {/* SEZIONE FUNZIONALITÀ & VIDEO 2 */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Smetti di fare trading alla cieca.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Guarda come il nostro Radar analizza la supply e scopre le reti Sybil dei Developer prima che tu prema il tasto Buy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* BOX VIDEO SECONDARIO */}
            {/* BOX VIDEO SECONDARIO */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] aspect-video flex items-center justify-center group shadow-2xl ring-1 ring-white/5">
              <video 
                  src="/demo4k.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer group-hover:bg-emerald-500 transition-colors duration-300 border border-white/20">
                <span className="text-3xl translate-x-1 text-white">▶</span>
              </div>
              
              <div className="absolute bottom-6 left-6 text-xs font-bold text-white bg-black/50 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                Meme Saver in Azione (1:24)
              </div>
            </div>

            {/* BULLET POINTS */}
            <div className="space-y-12">
              <div className="flex gap-6 group">
                <div className="w-14 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all">
                  <span className="text-2xl">🕵️‍♂️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Micro-Dumping Detector</h3>
                  <p className="text-gray-400 text-base leading-relaxed font-light">
                    Traccia i movimenti silenti dei wallet collegati al Dev. L'algoritmo rileva quando la liquidità viene frammentata e venduta di nascosto.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all">
                  <span className="text-2xl">⚖️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Trust Score Istantaneo</h3>
                  <p className="text-gray-400 text-base leading-relaxed font-light">
                    Naviga su Pump.fun o DexScreener. Il nostro pannello genera un punteggio da 1 a 100 in tempo reale basato su 12 metriche on-chain.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 group-hover:border-amber-500/50 transition-all">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Bundle Supply Shield</h3>
                  <p className="text-gray-400 text-base leading-relaxed font-light">
                    Scopri se il Dev ha comprato la propria supply nello stesso blocco di lancio usando Jito, preparandosi a svuotare il pool.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER GLOBALE E DISCLAIMER LEGALE */}
      <footer className="border-t border-white/5 bg-[#020202] pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-2 pr-8">
              <div className="flex items-center gap-3 mb-6">
                <img src="/meme.jpg" alt="Logo" className="w-8 h-8 rounded-lg border border-[#333] grayscale opacity-80" />
                <span className="text-xl font-black tracking-tight text-white opacity-90">
                  Meme<span className="text-gray-500 font-medium">Saver</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md font-light">
                L'infrastruttura di analisi on-chain progettata per proteggere i retail trader. Rileviamo schemi Sybil, manipolazione della supply e micro-dumping prima che tu prema buy.
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
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Supporto</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><a href="mailto:HelpTrading@proton.me" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><span className="text-lg">✉️</span> HelpTrading@proton.me</a></li>
                <li><span className="flex items-center gap-3 opacity-50 cursor-not-allowed"><span className="text-lg">💬</span> Discord (Solo PRO)</span></li>
                <li><a href="https://x.com/H3lpTrading" target="_blank" rel="noopener noreferrer" className="hover:text-[#1DA1F2] transition-colors flex items-center gap-3"><span className="text-lg">🐦</span> X / Twitter</a></li>
              </ul>
            </div>

          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-8 text-xs text-gray-500 leading-relaxed text-justify font-light">
            <strong className="text-gray-400 font-bold">DISCLAIMER IMPORTANTE:</strong> Meme Saver è esclusivamente uno strumento di analisi dati e software di monitoraggio on-chain. Nessuna informazione fornita tramite l'estensione, il sito web o le API costituisce consulenza finanziaria, di investimento o di trading. Il trading di criptovalute e memecoin su piattaforme decentralizzate comporta un rischio estremo di perdita totale del capitale. Gli algoritmi di trust score e le simulazioni sono basati su dati storici e pattern probabilistici e non garantiscono protezione da frodi o perdite. L'utente si assume la totale responsabilità delle proprie azioni.
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-gray-600 font-medium">
            <p>© {new Date().getFullYear()} Meme Saver Analytics. All rights reserved.</p>
            <p className="mt-4 md:mt-0 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Sistemi Operativi
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;