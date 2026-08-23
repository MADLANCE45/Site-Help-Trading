import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const Radar = () => {
  const [tokens, setTokens] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  const [socketStatus, setSocketStatus] = useState('Disconnesso');

  useEffect(() => {
    if (!isScanning) return;

    // 1. Connettiti al tuo server (Modifica l'URL se usi ngrok o un'altra porta)
    const socket = io('http://localhost:3000'); 

    socket.on('connect', () => {
      setSocketStatus('Connesso e in ascolto...');
    });

    // 2. Ascolta l'evento che il tuo dumpRadar.js o index.js emette
    // (Assicurati che il nome dell'evento 'new_pump_token' corrisponda a quello del tuo backend)
    socket.on('new_pump_token', (realTokenData) => {
      setTokens(prev => [realTokenData, ...prev].slice(0, 15)); // Tiene gli ultimi 15
    });

    socket.on('disconnect', () => {
      setSocketStatus('Connessione persa col server');
    });

    return () => socket.disconnect();
  }, [isScanning]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-8 bg-background text-white">
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-100 flex items-center gap-3">
            📡 Live Radar 
            <button 
              onClick={() => setIsScanning(!isScanning)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${
                isScanning 
                  ? 'bg-green-500/10 text-green-500 border-green-500/30' 
                  : 'bg-red-500/10 text-red-500 border-red-500/30'
              }`}
            >
              {isScanning ? '● SCANNING ON' : '■ PAUSED'}
            </button>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Stato: {socketStatus}</p>
        </div>
      </div>

      <div className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-xl overflow-hidden flex flex-col shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111] border-b border-gray-800 text-xs font-mono text-gray-400 uppercase tracking-wider">
              <th className="p-4">Token (Symbol)</th>
              <th className="p-4">Indirizzo Contratto</th>
              <th className="p-4 text-right">Azione</th>
            </tr>
          </thead>
          <tbody className="text-sm font-mono text-gray-300">
            {tokens.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-600">
                  In attesa dei dati dal backend...
                </td>
              </tr>
            ) : (
              tokens.map((token, index) => (
                <tr key={index} className="border-b border-gray-800/50 hover:bg-[#111]">
                  <td className="p-4 font-bold text-gray-200">
                    {token.name} <span className="text-gray-500 ml-2">{token.symbol}</span>
                  </td>
                  <td className="p-4 text-orange-400 text-xs">{token.address}</td>
                  <td className="p-4 text-right">
                    <button className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-sans font-bold text-xs rounded transition">
                      SNIPE AUTO
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Radar;