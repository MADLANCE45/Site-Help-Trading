import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const Radar = () => {
  const [liveTokens, setLiveTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('newToken', (tokenData) => {
      setLiveTokens((prev) => [tokenData, ...prev].slice(0, 50));
    });
    return () => socket.disconnect();
  }, []);

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTokenClick = async (token) => {
    setIsScanning(true);
    setSelectedToken({
      ...token, trustScore: 0, status: 'SCANNING...', judgment: 'Interrogazione nodi Helius in corso...',
      supplyIntegrity: 0, devTrust: 0, sybilResistance: 0, microDumpRisk: 0
    });

    try {
      const response = await fetch(`http://localhost:3000/api/scan/${token.address}`);
      const scanResult = await response.json();

      if (response.ok) {
        setSelectedToken({
          ...token, trustScore: scanResult.trustScore, status: scanResult.status,
          judgment: scanResult.judgment, supplyIntegrity: scanResult.supplyIntegrity,
          devTrust: scanResult.devTrust, sybilResistance: scanResult.sybilResistance, microDumpRisk: scanResult.microDumpRisk
        });
      } else {
        // IL FIX: Se Helius va in errore (es. token finto), sblocca l'interfaccia
        setSelectedToken({
          ...token, trustScore: 0, status: 'ERROR',
          judgment: 'Errore API: Impossibile scansionare questo token. Dati on-chain assenti.',
          supplyIntegrity: 0, devTrust: 0, sybilResistance: 0, microDumpRisk: 100
        });
      }
    } catch (err) {
      setSelectedToken({
        ...token, trustScore: 0, status: 'NETWORK ERROR',
        judgment: 'Server offline o errore di connessione.',
        supplyIntegrity: 0, devTrust: 0, sybilResistance: 0, microDumpRisk: 100
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#222] pb-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Radar & Auto-Sniper</h2>
          <p className="text-gray-400 text-sm mt-1">Real-time Solana Memecoin Index monitoring.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* COLONNA SINISTRA */}
        <div className="lg:col-span-1 bg-black border border-[#222] rounded-xl overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-[#222] bg-[#0a0a0a]">
            <h3 className="font-semibold text-white">Live Pairs</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {liveTokens.length === 0 ? (
              <div className="text-center text-gray-500 text-sm mt-10">Ascoltando la rete...</div>
            ) : (
              liveTokens.map((t, i) => (
                <div key={i} onClick={() => handleTokenClick(t)} className="p-4 rounded-lg bg-[#111] border border-[#333] cursor-pointer hover:bg-[#1a1a1a]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white">${t.symbol}</span>
                  </div>
                  <div className="text-xs text-gray-500 font-mono truncate">{t.address}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLONNA DESTRA */}
        <div className="lg:col-span-2 bg-[#050505] border border-[#222] rounded-xl p-8 relative shadow-2xl min-h-[600px] flex flex-col">
          {!selectedToken ? (
            <div className="flex-1 flex flex-col items-center justify-center opacity-50">
              <span className="text-4xl mb-4">📡</span>
              <h3 className="text-xl font-bold text-white">Awaiting Target</h3>
            </div>
          ) : (
            <div className="relative z-10 flex-1">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#111] border border-[#333] flex items-center justify-center">
                    {isScanning ? '⏳' : selectedToken.status === 'ERROR' ? '❌' : '🛡️'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white flex items-center gap-3">
                      ${selectedToken.symbol}
                      {/* TASTO COPY ADDRESS */}
                      <button 
                        onClick={() => handleCopy(selectedToken.address)}
                        className="text-xs px-2 py-1 bg-[#222] hover:bg-[#333] border border-[#444] rounded text-gray-300 transition-all flex items-center gap-1"
                      >
                        {copied ? '✅ Copied' : '📄 Copy'}
                      </button>
                    </h3>
                    <p className="text-gray-500 text-sm font-mono mt-1">{selectedToken.address}</p>
                  </div>
                </div>
                <a href={`https://dexscreener.com/solana/${selectedToken.address}`} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-[#111] text-gray-300 font-bold text-sm rounded-lg border border-[#333]">
                  DexScreener ↗
                </a>
              </div>

              {/* CERCHIO E GIUDIZIO */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12 p-6 bg-black border border-[#222] rounded-2xl">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#222" strokeWidth="8" fill="none" />
                    <circle cx="50" cy="50" r="40" stroke={isScanning ? '#3b82f6' : selectedToken.trustScore > 60 ? '#34d399' : '#f43f5e'} strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * selectedToken.trustScore) / 100} className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-white">{isScanning ? '...' : selectedToken.trustScore}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 tracking-widest mb-3 uppercase">Algorithmic Judgment</div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-3 py-1 border font-bold text-sm rounded-md ${isScanning ? 'text-blue-500 border-blue-500/30' : selectedToken.status === 'SAFE' ? 'text-emerald-500 border-emerald-500/30' : 'text-rose-500 border-rose-500/30'}`}>
                      {selectedToken.status}
                    </span>
                    <span className="text-gray-300 font-medium">{selectedToken.judgment}</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Radar;