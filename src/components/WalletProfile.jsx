import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export const WalletProfile = () => {
  const { publicKey } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated data (Will be fetched from your Supabase backend)
  const userData = {
    isPro: false,
    scansRemaining: 5,
    totalPnl: "+$3,450.20",
    winRate: "68%",
    scamsAvoided: 14,
    bestTrade: "+420%",
  };

  // Simulated Web3 payment transaction
  const handleUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Phantom Wallet will open here to process the $25 equivalent in SOL.");
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* USER HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#222] pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            {userData.isPro ? '👑' : '👤'}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Trader Profile</h2>
            <p className="text-gray-400 font-mono text-sm mt-1">
              {publicKey ? publicKey.toString() : 'Connect your wallet for live data'}
            </p>
          </div>
        </div>
        <div className={`px-4 py-2 border rounded-lg font-bold text-sm tracking-widest uppercase ${userData.isPro ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-[#111] border-[#333] text-gray-400'}`}>
          {userData.isPro ? 'PRO MEMBER' : 'FREE TIER'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Trading Stats & AI Insights */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black border border-[#222] p-5 rounded-xl">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Net PnL</div>
              <div className="text-2xl font-black text-emerald-400">{userData.totalPnl}</div>
            </div>
            <div className="bg-black border border-[#222] p-5 rounded-xl">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Win Rate</div>
              <div className="text-2xl font-black text-white">{userData.winRate}</div>
            </div>
            <div className="bg-black border border-[#222] p-5 rounded-xl">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Best Trade</div>
              <div className="text-2xl font-black text-emerald-400">{userData.bestTrade}</div>
            </div>
            <div className="bg-black border border-[#222] p-5 rounded-xl">
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Scams Avoided</div>
              <div className="text-2xl font-black text-rose-400">{userData.scamsAvoided}</div>
            </div>
          </div>

          {/* AI Trading Analysis */}
          <div className="bg-[#050505] border border-[#222] rounded-xl overflow-hidden">
            <div className="p-5 border-b border-[#222] bg-[#0a0a0a] flex items-center gap-3">
              <span className="animate-pulse">🧠</span>
              <h3 className="font-bold text-white">AI Trading Analysis</h3>
            </div>
            <div className="p-6 space-y-6">
              
              {/* Strengths */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-emerald-500 text-sm">✓</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Strengths</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Excellent take-profit timing. In 70% of your winning trades, you exited before the major -50% dump. Your initial token filtering relies on solid liquidity metrics.
                  </p>
                </div>
              </div>

              {/* Weaknesses */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-rose-500 text-sm">!</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Areas of Improvement</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Late FOMO entries: You tend to buy tokens that have already pumped +200% in the last 5 minutes. This drastically reduces your upside potential and makes you exit liquidity for whales.
                  </p>
                  <div className="bg-[#111] border border-[#333] p-3 rounded-lg">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">💡 Algorithm Suggestion</span>
                    <p className="text-gray-300 text-sm mt-1">Upgrade to PRO to access the <strong>Insider Token Radar</strong>. Catch smart-money movements at the very first seconds of launch, avoiding late manual entries.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Subscription & Paywall */}
        <div className="lg:col-span-1">
          <div className="bg-black border border-[#222] p-8 rounded-2xl relative overflow-hidden shadow-2xl h-full flex flex-col">
            
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-6">Extension Status</h3>
            
            {!userData.isPro ? (
              // FREE TIER VIEW
              <>
                <div className="flex items-end gap-3 mb-6">
                  <span className="text-6xl font-black text-white">{userData.scansRemaining}</span>
                  <span className="text-gray-400 font-medium pb-2 leading-tight">Daily Free<br/>Scans Left</span>
                </div>

                <div className="w-full h-px bg-[#222] my-4"></div>

                <div className="flex-1 mt-4">
                  <div className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest mb-4">
                    Upgrade Recommended
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-1">Meme Saver PRO</h4>
                  <div className="text-3xl font-black text-white mb-6">$25 <span className="text-sm text-gray-500 font-medium">/ month (in SOL)</span></div>
                  
                  {/* FEATURES COMPARISON */}
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="text-emerald-500 mt-0.5">✓</span> 
                      <div>
                        <span className="font-bold text-white">Guaranteed Unlimited AI Scans</span>
                        <p className="text-xs text-gray-500 mt-0.5">Bypass the 5-scan daily limit forever.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="text-emerald-500 mt-0.5">✓</span> 
                      <div>
                        <span className="font-bold text-white">Insider Token Radar</span>
                        <p className="text-xs text-gray-500 mt-0.5">Real-time alerts on developer accumulation.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-300 opacity-70">
                      <span className="text-blue-400 mt-0.5 animate-pulse">⚙️</span> 
                      <div>
                        <span className="font-bold text-white flex items-center gap-2">
                          Auto-Trade Sniper 
                          <span className="text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider">Building</span>
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">Zero-latency cloud wallet execution. Coming soon.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                  className="w-full py-4 bg-white text-black font-black text-lg rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex justify-center items-center"
                >
                  {isProcessing ? (
                    <span className="animate-pulse">Connecting to Phantom...</span>
                  ) : (
                    "Upgrade for $25 in SOL"
                  )}
                </button>
                <p className="text-center text-xs text-gray-600 mt-4 font-mono">Secure transaction via Helius RPC</p>
              </>
            ) : (
              // PRO TIER VIEW
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-amber-500/10 rounded-full border border-amber-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  <span className="text-4xl">👑</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Active Subscription</h4>
                <p className="text-gray-400 text-sm mb-8">
                  You have unlimited access to all Extension and Terminal features.
                </p>
                <div className="bg-[#111] border border-[#333] w-full p-4 rounded-xl text-left">
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Next Auto-Renewal</div>
                  <div className="text-white font-mono">September 14, 2026</div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WalletProfile;