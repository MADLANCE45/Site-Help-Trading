import React, { useState } from 'react';

// Dati di esempio arricchiti
const mockTrades = [
  { id: '1', pair: 'SOL/USDC', type: 'BUY', price: '$145.20', pnl: '+320%', time: '14:30', status: 'WIN', note: 'Snipe perfetto sul dip.' },
  { id: '2', pair: 'SHIB2/SOL', type: 'SELL', price: '0.0004', pnl: '-45%', time: '11:15', status: 'LOSS', note: 'FOMO tardiva. Rug pull del dev.' },
  { id: '3', pair: 'PEPE/SOL', type: 'BUY', price: '0.012', pnl: '+12%', time: '09:05', status: 'WIN', note: 'Uscita anticipata sicura.' },
];

export const TradingDiary = () => {
  // Stato per controllare l'apertura del popup di condivisione
  const [shareTrade, setShareTrade] = useState(null);

  return (
    <div className="flex-1 overflow-auto p-8 bg-background text-white relative">
      
      {/* Intestazione */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-gray-100">Diario di Trading</h2>
          <p className="text-gray-500 mt-2">Analizza i tuoi trade. Condividi le tue vittorie.</p>
        </div>
      </div>

      {/* Sezione Coach AI */}
      <div className="mb-8 p-6 bg-[#0a0a0a] border border-orange-500/30 rounded-2xl relative overflow-hidden shadow-lg shadow-orange-500/5">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🤖</div>
        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2">
          <span className="animate-pulse h-2 w-2 bg-orange-400 rounded-full shadow-[0_0_8px_#f97316]"></span>
          Autopsia IA del giorno
        </h3>
        <p className="text-gray-300 leading-relaxed text-sm font-medium">
          "Oggi hai generato ottimi profitti, ma hai perso il 45% su SHIB2 entrando in ritardo. 
          <strong className="text-orange-400 font-bold ml-1">Suggerimento:</strong> Attiva il filtro 'Ignora Dev Dump' sul Radar per evitare contratti simili domani."
        </p>
      </div>

      {/* Tabella dei Trade */}
      <div className="bg-[#0a0a0a] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111] border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <th className="p-4">Coppia</th>
              <th className="p-4">PnL</th>
              <th className="p-4">Note / Auto-Tag</th>
              <th className="p-4 text-right">Social</th>
            </tr>
          </thead>
          <tbody className="text-sm font-mono text-gray-300">
            {mockTrades.map((trade) => (
              <tr key={trade.id} className="border-b border-gray-800/50 hover:bg-[#111] transition">
                <td className="p-4 font-bold text-gray-200">{trade.pair}</td>
                <td className={`p-4 font-bold ${trade.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {trade.pnl}
                </td>
                <td className="p-4 text-gray-500 text-xs">{trade.note}</td>
                
                {/* Il bottone Flex appare solo se il trade è in profitto */}
                <td className="p-4 text-right">
                  {trade.status === 'WIN' && (
                    <button 
                      onClick={() => setShareTrade(trade)}
                      className="px-3 py-1.5 bg-gradient-to-r from-orange-600 to-red-600 hover:scale-105 text-white font-sans font-bold text-xs rounded-lg transition shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                    >
                      FLEX 📸
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DI CONDIVISIONE (Appare in sovrimpressione) */}
      {shareTrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-3xl max-w-sm w-full relative flex flex-col items-center text-center shadow-[0_0_50px_rgba(249,115,22,0.15)]">
            
            {/* Tasto chiudi */}
            <button 
              onClick={() => setShareTrade(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              ✕
            </button>

            {/* La "Card" da screenshottare */}
            <div className="w-full bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl p-6 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
              
              <img src="/meme.jpg" alt="Logo" className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-orange-500" />
              <h4 className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-1">Meme Saver Snipe</h4>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
                {shareTrade.pnl}
              </p>
              <p className="text-gray-300 font-mono text-sm bg-gray-800/50 inline-block px-3 py-1 rounded-full">
                {shareTrade.pair}
              </p>
            </div>

            <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              Condividi su X
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default TradingDiary;