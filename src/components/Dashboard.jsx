import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '../supabase';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { publicKey } = useWallet();
  const [userData, setUserData] = useState(null);
  
  // Wallet Audit Data
  const [audit, setAudit] = useState(null);
  const [isLoadingAudit, setIsLoadingAudit] = useState(true);

  useEffect(() => {
    if (!publicKey) return;
    const walletAddress = publicKey.toString();

    // 1. Fetch User Data (Supabase)
    const fetchUser = async () => {
      const { data } = await supabase
        .from('users')
        .select('plan_type, scans_remaining')
        .eq('wallet_address', walletAddress)
        .single();
      setUserData(data);
    };

    // 2. Fetch Wallet Health Score On-Chain (Backend -> Helius RPC)
    const fetchWalletAudit = async () => {
      setIsLoadingAudit(true);
      try {
        const response = await fetch(`http://localhost:3000/api/wallet-audit/${walletAddress}`);
        const data = await response.json();
        setAudit(data);
      } catch (error) {
        console.error("Wallet audit fetch error:", error);
        // Fallback in case backend is offline
        setAudit({
            score: 0,
            archetype: "Connection Failed ❌",
            archetypeColor: "#ff4d4d",
            totalTrades: 0,
            winRate: "N/A",
            rugVulnerability: "Unknown",
            feedback: "RPC Node timeout. Unable to parse historical transactions at this moment."
        });
      } finally {
        setIsLoadingAudit(false);
      }
    };
    
    fetchUser();
    fetchWalletAudit();
  }, [publicKey]);

  const scoreColor = audit?.score >= 75 ? '#00e676' : (audit?.score >= 45 ? '#ffaa00' : '#ff4d4d');

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="border-b border-[#222] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">Control Room</h2>
          <p className="text-gray-400 text-sm mt-1">On-chain wallet diagnostics and license management.</p>
        </div>
        
        {publicKey && (
          <div className="bg-[#111] border border-[#333] px-4 py-2 rounded-xl flex items-center gap-2 font-mono text-xs text-gray-400 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
          </div>
        )}
      </div>

      {/* LICENSE STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#050505] p-6 rounded-xl border border-[#222] relative overflow-hidden group hover:border-[#444] transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
          <div className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-widest">Current Tier</div>
          <div className="text-3xl font-black text-white uppercase tracking-wider">
            {userData ? userData.plan_type : 'Loading...'}
          </div>
        </div>
        
        <div className="bg-[#050505] p-6 rounded-xl border border-[#222] relative overflow-hidden hover:border-[#444] transition-colors">
          <div className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-widest">Daily AI Scans Left</div>
          <div className="text-3xl font-black text-blue-400">
            {userData?.plan_type === 'pro' || userData?.plan_type === 'premium' 
              ? 'Unlimited ♾️' 
              : `${userData?.scans_remaining || 0} / 5`}
          </div>
        </div>
      </div>

      {/* WALLET HEALTH & ON-CHAIN AUDIT CARD */}
      <div className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-[#222] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Abstract Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex items-center justify-between border-b border-[#222] pb-4 mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🩺</span>
            <h3 className="text-xl font-black text-white tracking-tight">Trader Health Score</h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20 uppercase tracking-widest">
            Helius Verified
          </span>
        </div>

        {isLoadingAudit ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-4">
             <div className="w-12 h-12 border-4 border-[#222] border-t-blue-500 rounded-full animate-spin"></div>
             <div className="text-center font-mono text-sm text-gray-500">
                <p className="animate-pulse text-blue-400">Decrypting on-chain signatures...</p>
                <p className="opacity-50 mt-1">Analyzing historical swap flow</p>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            
            {/* 1. Score Circle */}
            <div className="flex flex-col items-center justify-center p-6 bg-black/40 border border-[#222] rounded-2xl shadow-inner">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center relative shadow-2xl transition-all duration-1000"
                style={{
                  background: `conic-gradient(${scoreColor} ${audit?.score || 0}%, #111 0)`,
                  boxShadow: `0 0 40px ${scoreColor}30`
                }}
              >
                <div className="w-28 h-28 rounded-full bg-[#0a0a0a] flex flex-col items-center justify-center">
                  <span className="text-4xl font-black font-mono" style={{ color: scoreColor }}>
                    {audit?.score || 0}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">Index</span>
                </div>
              </div>

              <div className="mt-6 text-center w-full">
                <span className="text-xs text-gray-500 block mb-2 font-bold uppercase tracking-widest">Detected Archetype</span>
                <div 
                    className="text-sm font-black px-4 py-2 rounded-lg border bg-white/5 backdrop-blur-sm truncate w-full" 
                    style={{ color: audit?.archetypeColor, borderColor: `${audit?.archetypeColor}40` }}
                >
                  {audit?.archetype}
                </div>
              </div>
            </div>

            {/* 2. Detailed Metrics & AI Terminal */}
            <div className="lg:col-span-2 space-y-5">
              
              {/* Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Recent Swaps</span>
                  <span className="text-xl font-mono font-bold text-white">{audit?.totalTrades || 0}</span>
                </div>
                <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Est. Win Rate</span>
                  <span className="text-xl font-mono font-bold text-emerald-400">{audit?.winRate || 'N/A'}</span>
                </div>
                <div className="bg-[#111] p-4 rounded-xl border border-[#222] col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Rug Exposure</span>
                  <span className={`text-sm font-black uppercase ${audit?.score < 50 ? 'text-rose-500' : (audit?.score < 75 ? 'text-amber-500' : 'text-emerald-500')}`}>
                    {audit?.rugVulnerability || 'Unknown'}
                  </span>
                  {/* Visual Risk Bar */}
                  <div className="w-full bg-[#222] h-1.5 rounded-full mt-2 overflow-hidden">
                     <div 
                        className={`h-full rounded-full ${audit?.score < 50 ? 'bg-rose-500 w-[85%]' : (audit?.score < 75 ? 'bg-amber-500 w-[50%]' : 'bg-emerald-500 w-[15%]')}`}
                     ></div>
                  </div>
                </div>
              </div>

              {/* AI Terminal Feedback */}
              <div className="p-5 rounded-xl bg-[#050505] border border-[#222] font-mono shadow-inner overflow-hidden">
                <div className="flex items-center gap-2 mb-3 border-b border-[#222] pb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="ml-2 text-[10px] text-gray-600 uppercase tracking-widest">Quantitative Diagnosis</span>
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  {/* FIX CRITICO A QUESTA RIGA: Uso di publicKey in modo sicuro */}
                  <span className="text-blue-400">root@meme-saver</span>:<span className="text-emerald-400">~</span>$ ./analyze_flow --target {publicKey ? publicKey.toString().slice(0,6) : 'anon'}<br/>
                  <span className="text-gray-500">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span> <span className="text-gray-200">{audit?.feedback}</span>
                  <span className="animate-pulse ml-1 inline-block w-2 h-3 bg-white"></span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-gradient-to-r from-[#0a0a0a] to-[#111] border border-[#222] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-xl font-black text-white mb-2">Elevate Your Trading Edge</h3>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed font-light">
            Install the Meme Saver extension to block Sybil clusters and micro-dumping before executing any swap on Pump.fun or Raydium.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {userData?.plan_type === 'free' && (
            <button 
              onClick={() => navigate('/dashboard/pricing')}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-500/10 text-amber-500 border border-amber-500/30 font-bold text-sm rounded-xl hover:bg-amber-500/20 transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)]"
            >
              Upgrade PRO
            </button>
          )}
          <button className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-black text-sm rounded-xl hover:bg-gray-200 hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Download Extension
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;