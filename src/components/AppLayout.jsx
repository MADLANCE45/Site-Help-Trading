import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) => `
    w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-150 flex items-center gap-3 text-sm font-medium
    ${isActive(path) 
      ? 'bg-[#1a1a1a] text-white border border-[#333]' 
      : 'text-gray-400 hover:text-white hover:bg-[#111] border border-transparent'}
  `;

  return (
    <div className="flex h-screen bg-black text-gray-200 font-sans overflow-hidden">
      
      {/* SIDEBAR MINIMALISTA */}
      <aside className="w-64 bg-black border-r border-[#222] flex flex-col z-20">
        <div className="p-6 border-b border-[#222]">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Meme<span className="text-gray-500">Saver</span>
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Solana Mainnet</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <button onClick={() => navigate('/dashboard')} className={navItemClass('/dashboard')}>
            <span className="text-lg">📊</span> Panoramica
          </button>
          <button onClick={() => navigate('/dashboard/radar')} className={navItemClass('/dashboard/radar')}>
            <span className="text-lg">🎯</span> Radar Live
          </button>
          <button onClick={() => navigate('/dashboard/leaderboard')} className={navItemClass('/dashboard/leaderboard')}>
            <span className="text-lg">🏆</span> Leaderboard
          </button>
        </nav>

        <div className="p-4 border-t border-[#222]">
          <WalletMultiButton className="!w-full !justify-center !bg-[#111] hover:!bg-[#222] !h-10 !rounded-lg !text-sm !font-semibold transition-colors border border-[#333]" />
        </div>
      </aside>

      {/* AREA CONTENUTI PULITA */}
      <main className="flex-1 overflow-y-auto bg-[#050505]">
        <div className="w-full h-full">
          {children}
        </div>
      </main>

    </div>
  );
};

export default AppLayout;