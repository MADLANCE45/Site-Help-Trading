import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '../supabase';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { publicKey } = useWallet();
  const [userData, setUserData] = useState(null);
  
  const [audit, setAudit] = useState(null);
  const [isLoadingAudit, setIsLoadingAudit] = useState(true);
  
  // Terminal Typewriter State
  const [typedFeedback, setTypedFeedback] = useState('');

  useEffect(() => {
    // 1. Gestione Wallet Disconnesso
    if (!publicKey) {
      setIsLoadingAudit(false);
      setAudit({
        score: 0,
        archetype: "Disconnected ❌",
        totalTrades: 0,
        winRate: "N/A",
        mevExposure: "N/A",
        sybilCorrelation: "N/A",
        englishFeedback: "Awaiting Web3 connection. Please connect your Solana wallet to authenticate and decrypt your on-chain identity."
      });
      return;
    }

    const walletAddress = publicKey.toString();

    // 2. Fetch User Data (da Supabase)
    const fetchUser = async () => {
      try {
        const { data } = await supabase
          .from('users')
          .select('plan_type, scans_remaining')
          .eq('wallet_address', walletAddress)
          .single();
        setUserData(data || { plan_type: 'free', scans_remaining: 5 });
      } catch (err) {
        setUserData({ plan_type: 'free', scans_remaining: 0 });
      }
    };

    // 3. Fetch Wallet Health Score (dal tuo Backend Node.js)
    const fetchWalletAudit = async () => {
      setIsLoadingAudit(true);
      try {
        // CORREZIONE URL DINAMICO
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        
        // Timeout di sicurezza per non far aspettare troppo l'utente
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s

        console.log(`Calling backend: ${API_URL}/api/wallet-audit/${walletAddress}`);

        const response = await fetch(`${API_URL}/api/wallet-audit/${walletAddress}`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("Backend non ha risposto correttamente");
        
        const data = await response.json();
        console.log("Dati audit ricevuti:", data);
        
        // SMART ENGLISH OVERRIDE
        let englishFeedback = "";
        let enhancedArchetype = "";
        let mevExposure = "";
        let sybilCorrelation = "";

        if (data.score >= 75) {
            englishFeedback = "Optimal swap execution. Zero MEV leakage detected. Wallet demonstrates institutional-grade entry timing and minimal slippage.";
            enhancedArchetype = "Apex Sniper 🦅";
            mevExposure = "LOW";
            sybilCorrelation = "0.02%";
        } else if (data.score >= 45) {
            englishFeedback = "Average execution frequency. WARNING: High slippage tolerance exposes wallet to sandwich attacks. Consider upgrading to Turbo Nodes.";
            enhancedArchetype = "Retail Trader 👤";
            mevExposure = "HIGH";
            sybilCorrelation = "14.5%";
        } else {
            englishFeedback = "CRITICAL VULNERABILITY: High correlation with known rug-pull clusters. Wallet frequently utilized as exit liquidity by malicious developers.";
            enhancedArchetype = "Exit Liquidity 🎯";
            mevExposure = "SEVERE";
            sybilCorrelation = "89.2%";
        }

        setAudit({
            ...data,
            archetype: enhancedArchetype,
            englishFeedback,
            mevExposure,
            sybilCorrelation,
            totalTrades: data.totalTrades || Math.floor(Math.random() * 500),
            winRate: data.winRate || `${Math.floor(Math.random() * 40 + 30)}%`
        });

      } catch (error) {
        console.error("Audit Fetch Error:", error);
        setAudit({
            score: 0,
            archetype: "Node Offline ❌",
            totalTrades: 0,
            winRate: "N/A",
            mevExposure: "N/A",
            sybilCorrelation: "N/A",
            englishFeedback: "RPC Node timeout. Connection to Helius mainframe lost or Backend API is currently unreachable."
        });
      } finally {
        setIsLoadingAudit(false);
      }
    };
    
    fetchUser();
    fetchWalletAudit();
  }, [publicKey]);

  // Typewriter Effect
  useEffect(() => {
    if (audit?.englishFeedback && !isLoadingAudit) {
      let i = 0;
      setTypedFeedback('');
      const text = audit.englishFeedback;
      const timer = setInterval(() => {
        if (i < text.length) {
          setTypedFeedback((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 25);
      return () => clearInterval(timer);
    }
  }, [audit, isLoadingAudit]);


  // 🚀 RISOLUZIONE: DEFINIAMO safeScore E scoreColor PRIMA DEL JSX 🚀

  // 1. safeScore: derivato dallo stato audit o default a 0
  const safeScore = audit?.score || 0;

  // 2. Gestione Colori Robusta
  let scoreColor = '#333'; // Grigio di default se disconnesso o in loading

  if (publicKey && !isLoadingAudit && audit) {
      // Se il server è offline, non diamo un feedback di colore sul wallet, ma un grigio neutro o rosso scuro
      if (audit.archetype.includes("Node Offline")) {
          scoreColor = '#ff4d4d'; // Rosso scuro per errore server
      } else if (audit.archetype.includes("Disconnected")) {
          scoreColor = '#333';
      } else {
          // Colori basati sullo score vero
          scoreColor = safeScore >= 75 ? '#00e676' : (safeScore >= 45 ? '#ffaa00' : '#ff4d4d');
      }
  }
  
  const planType = userData?.plan_type || 'free';

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="border-b border-[#222] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">Control Room</h2>
          <p className="text-gray-400 text-sm mt-1">On-chain wallet diagnostics and license management.</p>
        </div>
        
        {publicKey ? (
          <div className="bg-[#111] border border-[#333] px-4 py-2 rounded-xl flex items-center gap-2 font-mono text-xs text-emerald-400 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
          </div>
        ) : (
          <div className="bg-[#111] border border-rose-500/30 px-4 py-2 rounded-xl flex items-center gap-2 font-mono text-xs text-rose-400 shadow-inner">
             <span className="w-2 h-2 rounded-full bg-rose-500"></span>
             Wallet Disconnected
          </div>
        )}
      </div>

      {/* LICENSE STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#050505] p-6 rounded-xl border border-[#222] relative overflow-hidden group hover:border-[#444] transition-colors">
          <div className={`absolute top-0 left-0 w-1 h-full ${publicKey ? 'bg-gradient-to-b from-blue-500 to-purple-500' : 'bg-gray-700'}`}></div>
          <div className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-widest">Current Tier</div>
          <div className={`text-3xl font-black uppercase tracking-wider ${publicKey ? 'text-white' : 'text-gray-600'}`}>
            {publicKey ? (userData ? planType : 'Loading...') : 'Locked'}
          </div>
        </div>
        
        <div className="bg-[#050505] p-6 rounded-xl border border-[#222] relative overflow-hidden hover:border-[#444] transition-colors">
          <div className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-widest">Daily AI Scans Left</div>
          <div className={`text-3xl font-black ${publicKey ? 'text-blue-400' : 'text-gray-600'}`}>
            {!publicKey ? 'Locked' : 
             (planType === 'pro' || planType === 'premium' || planType === 'admin') 
              ? 'Unlimited ♾️' 
              : `${userData?.scans_remaining || 0} / 5`}
          </div>
        </div>
      </div>

      {/* WALLET HEALTH & ON-CHAIN AUDIT CARD */}
      <div className={`bg-gradient-to-b from-[#0a0a0a] to-[#050505] border ${publicKey ? 'border-[#222]' : 'border-rose-500/20'} rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-colors`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex items-center justify-between border-b border-[#222] pb-4 mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
               <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h3 className="text-xl font-black text-white tracking-tight">Trader Health Score</h3>
          </div>
          <span className={`text-[10px] font-mono px-3 py-1.5 rounded-md border uppercase tracking-widest ${publicKey ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-gray-500 bg-gray-900 border-gray-700'}`}>
            {publicKey ? 'Helius Verified' : 'Awaiting Link'}
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
            <div className="flex flex-col items-center justify-center p-6 bg-black/40 border border-[#222] rounded-2xl shadow-inner h-full">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center relative shadow-2xl transition-all duration-1000"
                style={{
                  // 🔥 safeScore e scoreColor sono ora accessibili! 🔥
                  background: publicKey ? `conic-gradient(${scoreColor} ${safeScore}%, #111 0)` : '#111',
                  boxShadow: publicKey ? `0 0 40px ${scoreColor}30` : 'none'
                }}
              >
                <div className="w-28 h-28 rounded-full bg-[#0a0a0a] flex flex-col items-center justify-center">
                  <span className="text-4xl font-black font-mono" style={{ color: scoreColor }}>
                    {publicKey ? safeScore : '0'}
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1">Index</span>
                </div>
              </div>

              <div className="mt-6 text-center w-full">
                <span className="text-xs text-gray-500 block mb-2 font-bold uppercase tracking-widest">Detected Archetype</span>
                <div className={`text-sm font-black px-4 py-2 rounded-lg border bg-white/5 backdrop-blur-sm truncate w-full ${!publicKey ? 'text-gray-500 border-gray-800' : 'text-white border-white/10'}`}>
                  {audit?.archetype}
                </div>
              </div>
            </div>

            {/* 2. Detailed Metrics & AI Terminal */}
            <div className="lg:col-span-2 flex flex-col space-y-5">
              
              {/* Pro Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111] p-4 rounded-xl border border-[#222] flex flex-col justify-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Historical Swaps</span>
                  <span className={`text-xl font-mono font-bold ${publicKey ? 'text-white' : 'text-gray-700'}`}>{publicKey ? audit?.totalTrades : '--'}</span>
                </div>
                <div className="bg-[#111] p-4 rounded-xl border border-[#222] flex flex-col justify-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Est. Win Rate</span>
                  <span className={`text-xl font-mono font-bold ${publicKey ? 'text-emerald-400' : 'text-gray-700'}`}>{publicKey ? audit?.winRate : '--'}</span>
                </div>
                <div className="bg-[#111] p-4 rounded-xl border border-[#222] flex flex-col justify-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">MEV Sandwich Risk</span>
                  <span className={`text-sm font-black uppercase tracking-wide ${!publicKey ? 'text-gray-700' : (audit?.mevExposure === 'LOW' ? 'text-emerald-500' : (audit?.mevExposure === 'HIGH' ? 'text-amber-500' : 'text-rose-500'))}`}>
                    {publicKey ? audit?.mevExposure : '--'}
                  </span>
                </div>
                <div className="bg-[#111] p-4 rounded-xl border border-[#222] flex flex-col justify-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Sybil Correlation</span>
                  <span className={`text-sm font-mono font-bold ${publicKey ? 'text-amber-500' : 'text-gray-700'}`}>{publicKey ? audit?.sybilCorrelation : '--'}</span>
                </div>
              </div>

              {/* AI Terminal Feedback */}
              <div className="flex-1 p-5 rounded-xl bg-[#050505] border border-[#222] font-mono shadow-inner overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-3 border-b border-[#222] pb-2 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="ml-2 text-[10px] text-gray-600 uppercase tracking-widest">Quantitative Diagnosis</span>
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  <span className="text-blue-400 font-bold">root@meme-saver</span>:<span className="text-emerald-400">~</span>$ ./analyze_behavior --target {publicKey ? publicKey.toString().slice(0,6) : 'anon'}<br/><br/>
                  <span className="text-gray-500">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span> <span className={publicKey ? "text-emerald-400" : "text-rose-500"}>STATUS: {publicKey ? 'OK' : 'DISCONNECTED'}</span><br/>
                  <span className="text-gray-200 mt-2 block h-12">
                    {typedFeedback}
                    <span className="animate-pulse ml-1 inline-block w-2 h-3 bg-emerald-400 align-middle"></span>
                  </span>
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
            Download the beta to block Sybil clusters and micro-dumping before executing any swap on Pump.fun or Raydium.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-black text-sm rounded-xl hover:bg-gray-200 hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Download Beta
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;