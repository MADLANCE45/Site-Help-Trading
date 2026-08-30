import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Stile dei bottoni di navigazione (più Premium per l'elemento attivo)
  const navItemClass = (path) => `
    w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 text-sm font-bold
    ${isActive(path) 
      ? 'bg-[#1a1a1a] text-white border border-[#333] shadow-[inset_2px_0_0_#00ffcc]' 
      : 'text-gray-500 hover:text-gray-200 hover:bg-[#111] border border-transparent'}
  `;

  // Chiude il menu mobile quando si clicca su un link
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-black text-gray-200 font-sans overflow-hidden">
      
      {/* HEADER MOBILE (Visibile solo su schermi piccoli) */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#0a0a0a] border-b border-[#222] z-50 flex items-center justify-between px-4">
        <button 
          onClick={() => navigate('/')} 
          className="text-xl font-black tracking-tight text-white flex items-center gap-2"
        >
          <img src="/meme.png" alt="Logo" className="w-8 h-8 rounded-lg border border-[#333]" />
          Meme<span className="text-gray-500 font-medium">Saver</span>
        </button>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-400 hover:text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen 
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* OVERLAY SFOCATO PER MOBILE (Scurisce lo sfondo quando il menu è aperto) */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* SIDEBAR PRINCIPALE */}
      <aside className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-[#050505] border-r border-[#222] flex flex-col z-40
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo (Cliccabile: riporta alla Home) */}
        <div className="p-6 border-b border-[#222] hidden md:block cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
          <div className="flex items-center gap-3">
            <img src="/meme.png" alt="Logo" className="w-8 h-8 rounded-lg border border-[#333]" />
            <h1 className="text-2xl font-black tracking-tight text-white">
              Meme<span className="text-gray-500 font-medium">Saver</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-4 pl-1">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Solana Mainnet</p>
          </div>
        </div>
        
        {/* Menu Navigazione (Tutto in Inglese) */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto mt-16 md:mt-0">
          <button onClick={() => handleNavigation('/dashboard')} className={navItemClass('/dashboard')}>
            <span className="text-lg opacity-80">📊</span> Overview
          </button>
          <button onClick={() => handleNavigation('/dashboard/radar')} className={navItemClass('/dashboard/radar')}>
            <span className="text-lg opacity-80">🎯</span> Live Radar
          </button>
          <button onClick={() => handleNavigation('/dashboard/leaderboard')} className={navItemClass('/dashboard/leaderboard')}>
            <span className="text-lg opacity-80">🏆</span> Leaderboard
          </button>
          <button onClick={() => handleNavigation('/dashboard/wallet')} className={navItemClass('/dashboard/wallet')}>
            <span className="text-lg opacity-80">💎</span> Subscription
          </button>
        </nav>

        {/* FOOTER DELLA SIDEBAR */}
        <div className="p-4 border-t border-[#222] bg-[#020202] space-y-4">
          <WalletMultiButton className="!w-full !justify-center !bg-[#111] hover:!bg-[#222] !h-12 !rounded-xl !text-sm !font-bold transition-colors border border-[#333] shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
          
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-white transition-colors py-2"
          >
            <span>←</span> Back to Landing Page
          </button>
        </div>
      </aside>

      {/* AREA CONTENUTI PULITA */}
      <main className="flex-1 overflow-y-auto bg-[#020202] pt-16 md:pt-0">
        <div className="w-full h-full">
          {children}
        </div>
      </main>

    </div>
  );
};

export default AppLayout;