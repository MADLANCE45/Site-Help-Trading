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
            <a href="#features" className="hover:text-white transition-colors">Funzionalità</a>
            <a href="#pricing" className="hover:text-white transition-colors">Piani & Pro</a>
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
        </div>
      </section>

    </div>
  );
};

export default LandingPage;