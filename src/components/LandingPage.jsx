import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const LandingPage = () => {
  const [browser, setBrowser] = useState('Chrome');
  const { connected } = useWallet();
  const navigate = useNavigate();

  // 1. Redirect intelligente: se l'utente connette il wallet, va alla dashboard
  useEffect(() => {
    if (connected) {
      navigate('/dashboard');
    }
  }, [connected, navigate]);

  // 2. Rilevamento del browser per UX personalizzata
  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/firefox|fxios/i)) setBrowser('Firefox');
    else if (userAgent.match(/opr\//i)) setBrowser('Opera');
    else if (userAgent.match(/edg/i)) setBrowser('Edge');
    else if (userAgent.match(/brave/i)) setBrowser('Brave');
    else if (userAgent.match(/chrome|chromium|crios/i)) setBrowser('Chrome');
    else if (userAgent.match(/safari/i)) setBrowser('Safari');
  }, []);

  return (
    <div className="min-h-screen bg-background text-white flex flex-col font-sans overflow-hidden">
      
      {/* HEADER: Solo navigazione e Login */}
      <header className="flex justify-end items-center p-6 absolute top-0 w-full z-50">
        <div className="flex items-center gap-4 bg-gray-900/80 p-2 rounded-2xl backdrop-blur-sm border border-gray-800">
          <span className="text-sm text-gray-400 font-medium hidden sm:block">Già utente?</span>
          <WalletMultiButton className="!bg-[#6366f1] hover:!bg-[#4f46e5] !rounded-xl !h-10 transition-all" />
        </div>
      </header>

      {/* MAIN CONTENT: Layout Diviso (Split Screen) */}
      <main className="flex-1 flex flex-col lg:flex-row relative pt-24">
        
        {/* COLONNA SINISTRA: La proposta di valore */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-20 z-10">
          <div className="flex items-center mb-8">
            <img 
              src="/meme.jpg" 
              alt="Meme Saver Logo" 
              className="w-20 h-20 rounded-full mr-4 border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)] object-cover"
            />
            <div className="flex flex-col">
              <h1 className="text-3xl font-black tracking-tight text-white leading-none">
                MEME SAVER
              </h1>
              <span className="text-orange-400 font-bold tracking-wide mt-1 text-sm uppercase">
                Your Trading Helper
              </span>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Proteggi i tuoi trade. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Evita i Rug Pulls.
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-10 max-w-lg">
            Lo strumento definitivo per cecchinare i token on-chain. Analizza, entra prima degli altri e monitora la liquidità direttamente dal tuo browser.
          </p>

          <div>
            <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] cursor-pointer">
              <svg className="w-6 h-6 mr-3 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-lg">Aggiungi a {browser} - Gratis</span>
            </button>
            <p className="mt-4 text-sm text-gray-500 font-mono">
               +10,000 installazioni attive su {browser}
            </p>
          </div>
        </div>

        {/* COLONNA DESTRA: La Social Proof (Grafici/Leaderboard) */}
        <div className="flex-1 relative flex items-center justify-center p-8 lg:p-20">
          {/* Effetto sfondo luminoso per la colonna destra */}
          <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/20 to-transparent"></div>
          
          {/* Card contenitore per le classifiche future */}
          <div className="relative w-full max-w-md aspect-[4/5] bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col p-6">
            
            <div className="border-b border-gray-800 pb-4 mb-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-200">🚀 Live Top Snipes</h3>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>

            {/* Elemento finto della classifica per dare l'idea */}
            <div className="flex-1 flex flex-col gap-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between border border-gray-700/50 hover:bg-gray-800 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold">
                      T{item}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-200">Trader_0x{item}a...b9</p>
                      <p className="text-xs text-gray-400">Su token $SHIB2</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">+{120 * item}%</p>
                    <p className="text-xs text-gray-500">12 min fa</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sfumatura in basso per far sembrare che la lista continui */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default LandingPage;