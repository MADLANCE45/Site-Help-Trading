import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020202] text-gray-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* NAVBAR CON IL TUO LOGO */}
      <nav className="fixed top-0 w-full bg-[#020202]/80 backdrop-blur-xl border-b border-[#222] z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo e Titolo */}
          <div className="flex items-center gap-3">
            <img 
              src="/meme.jpg" 
              alt="Meme Saver Logo" 
              className="w-10 h-10 rounded-full border border-[#333] shadow-[0_0_15px_rgba(0,255,204,0.15)]"
            />
            <div className="text-2xl font-black tracking-tight text-white">
              Meme<span className="text-gray-500">Saver</span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            {/* L'ancora #features ora funzionerà perché stiamo per creare la sezione */}
            <a href="#features" className="hover:text-white transition-colors cursor-pointer">Funzionalità</a>
            {/* Navigazione diretta alla pagina dei piani */}
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
              className="text-sm font-bold text-gray-300 hover:text-white transition-colors"
            >
              Area Utente
            </button>
            <button className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Scarica Estensione
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION CON SCREENSHOT DELL'APP */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex items-center">
        {/* Glow di sfondo */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Testo a sinistra */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111] border border-[#333] text-xs font-bold text-emerald-400 mb-6 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Attivo su Pump.fun & Raydium
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
              Il tuo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Vantaggio</span> On-Chain.
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
              L'estensione avanzata che analizza i contratti, rivela il micro-dumping dei dev e ti fornisce un Trust Score IA direttamente nel tuo browser, prima che tu rischi i tuoi fondi.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                Installa Estensione
              </button>
              <button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto px-8 py-4 bg-[#111] hover:bg-[#222] text-white border border-[#333] font-bold text-lg rounded-xl transition-colors">
                Esplora Dashboard
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-5 font-medium">
              Include versione Free limitata e Abbonamento Pro.
            </p>
          </div>

          {/* Screenshot a destra (Il tuo lavoro in mostra) */}
          {/* Screenshot a destra (La tua Estensione in Azione) */}
          <div className="relative w-[320px] md:w-[380px] h-[550px] mx-auto flex items-center justify-center perspective-[1000px]">
            
            {/* Vetrina in Glassmorphism (Guscio dell'estensione) */}
            <div className="absolute inset-0 bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-y-[-12deg] rotate-x-[5deg] overflow-hidden group">
              
              {/* Finta barra del browser Chrome in alto */}
              <div className="w-full h-8 bg-[#111] border-b border-[#333] flex items-center px-4 gap-2 relative z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
              </div>

              {/* CONTENITORE CON AUTO-SCROLL (Il vero trucco magico) */}
              <div className="w-full h-[calc(100%-2rem)] overflow-hidden relative bg-[#1a1a1a]">
                <img 
                  src="/screenshot.png" 
                  alt="Interfaccia Meme Saver" 
                  className="w-full h-auto object-cover animate-pan-image"
                />
              </div>
              
              {/* Overlay: Effetto riflesso sul vetro */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-30"></div>

              {/* Badge finto fluttuante per creare dinamismo */}
              <div className="absolute -left-6 bottom-12 bg-black/90 backdrop-blur-md border border-rose-500/50 p-3 rounded-xl shadow-2xl flex items-center gap-3 z-40 transform translate-z-10 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                <div>
                  <div className="text-white font-bold text-xs tracking-wider">SCAM DETECTED</div>
                  <div className="text-xs text-rose-400">Micro-Dump Risk: 10%</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* STRISCIA LOGHI/PIATTAFORME SUPPORTATE */}
      <section className="py-10 border-y border-[#111] bg-black/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
          {/* Sostituisci in futuro con veri loghi svg */}
          <div className="text-xl font-black tracking-widest uppercase">Pump.fun</div>
          <div className="text-xl font-black tracking-widest uppercase">DexScreener</div>
          <div className="text-xl font-black tracking-widest uppercase">Raydium</div>
          <div className="text-xl font-black tracking-widest uppercase">Solana</div>
          {/* SEZIONE FUNZIONALITÀ & VIDEO (Il vero gancio di vendita) */}
      <section id="features" className="py-32 px-6 bg-[#020202] relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Smetti di fare trading alla cieca.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Guarda come il nostro Radar analizza la supply e scopre le reti Sybil dei Developer prima che tu prema il tasto Buy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* BOX VIDEO */}
            <div className="relative rounded-2xl overflow-hidden border border-[#222] bg-[#0a0a0a] aspect-video flex items-center justify-center group shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              {/* Sfondo sfocato temporaneo (Sostituirai questo div con un <video> o <iframe> di YouTube) */}
              <div className="absolute inset-0 bg-[url('/screenshot.png')] bg-cover bg-top opacity-20 group-hover:opacity-10 transition-opacity"></div>
              
              {/* Tasto Play Grafico */}
              <div className="relative z-10 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                <span className="text-3xl translate-x-1 text-white">▶</span>
              </div>
              
              {/* Etichetta Video */}
              <div className="absolute bottom-4 left-4 text-xs font-bold text-gray-300 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                Meme Saver in Azione (1:24)
              </div>
            </div>

            {/* BULLET POINTS FUNZIONALITÀ */}
            <div className="space-y-10">
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🕵️‍♂️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Micro-Dumping Detector</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Traccia i movimenti silenti dei wallet collegati al Dev. L'algoritmo rileva quando la liquidità viene frammentata e venduta di nascosto per simulare volume organico.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚖️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Trust Score Istanraneo</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Naviga su Pump.fun o DexScreener. Il nostro pannello laterale genera un punteggio da 1 a 100 in tempo reale basato su oltre 12 metriche di sicurezza on-chain.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📦</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Bundle Supply Shield</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Scopri istantaneamente se il Dev ha comprato la propria supply nello stesso blocco di lancio usando Jito, preparandosi a svuotare il pool sui retail.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;