import React from 'react';

export const MaintenanceBanner = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
        
        {/* Glow di sfondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        {/* Icona di stato */}
        <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </div>

        <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2">
          System Maintenance
        </h1>
        
        <p className="text-sm text-gray-400 font-light mb-6 leading-relaxed">
          Stiamo aggiornando il nodo e l'infrastruttura di scansione on-chain. Torneremo operativi entro oggi.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Estimated ETA: Today
        </div>

      </div>
    </div>
  );
};

export default MaintenanceBanner;