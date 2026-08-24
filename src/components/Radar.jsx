import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Connessione diretta al tuo Server Radar Node.js
const socket = io('http://localhost:3000');

export const Radar = () => {
  const [liveTokens, setLiveTokens] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Gestione della connessione
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    // Ascolto del flusso dati dal tuo dumpRadar.js
    // Assumiamo che il tuo backend emetta un evento chiamato 'newToken'
    socket.on('newToken', (tokenData) => {
      setLiveTokens((prevTokens) => {
        // Aggiungiamo il nuovo token in cima e teniamo solo gli ultimi 50 per non appesantire il browser
        const updated = [tokenData, ...prevTokens];
        return updated.slice(0, 50);
      });
    });

    // Pulizia quando si cambia pagina
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('newToken');
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Header del Radar */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              📡 Live On-Chain Radar
            </h2>
            <p className="text-gray-400 mt-1">Intercettazione token in tempo reale dalla mempool di Solana.</p>
          </div>
          
          {/* Badge di Connessione */}
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 border ${isConnected ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className={`text-sm font-bold ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {isConnected ? 'Server Radar Connesso' : 'Server Disconnesso'}
            </span>
          </div>
        </div>

        {/* Tabella Dati Live */}
        <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a0a0a] border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="p-4">Time</th>
                  <th className="p-4">Token</th>
                  <th className="p-4">Liquidità Iniziale</th>
                  <th className="p-4 text-center">Trust Score (IA)</th>
                  <th className="p-4 text-right">Azione</th>
                </tr>
              </thead>
              <tbody className="text-sm font-mono divide-y divide-gray-800/50">
                {liveTokens.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 italic">
                      In attesa di nuovi contratti dalla blockchain...
                    </td>
                  </tr>
                ) : (
                  liveTokens.map((token, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors animate-fade-in">
                      <td className="p-4 text-gray-400">{new Date(token.timestamp).toLocaleTimeString()}</td>
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        {token.symbol}
                        <span className="text-xs text-gray-600 font-normal">{token.address.substring(0,6)}...</span>
                      </td>
                      <td className="p-4 text-blue-400 font-bold">{token.liquidity} SOL</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${
                          token.trustScore > 70 ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                          token.trustScore > 40 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                          'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {token.trustScore}/100
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors">
                          SNIPE
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Radar;