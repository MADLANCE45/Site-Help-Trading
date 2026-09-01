import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020202] text-gray-200 py-24 px-6 relative overflow-x-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Unfair Advantage</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed font-light">
            Stop trading blind. Avoid one single rug-pull and the subscription pays for itself. 
            All payments are processed securely on-chain via Phantom.
          </p>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* 1. FREE TIER (The Hook) */}
          <div className="bg-[#050505] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col hover:border-white/10 transition-colors shadow-2xl ring-1 ring-white/5">
            <h3 className="text-2xl font-black text-white mb-2">Scout</h3>
            <p className="text-sm text-gray-500 mb-8 font-light">Test the waters. Perfect for casual traders.</p>
            
            <div className="mb-8">
              <div className="text-5xl font-black text-white mb-2">$0</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Free Forever</div>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <span className="text-gray-600">✓</span> 5 AI Scans per day
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <span className="text-gray-600">✓</span> Basic DeepSeek Model
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <span className="text-gray-600">✓</span> Standard Public Routing
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 line-through">
                <span>✕</span> Priority Server Queue
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 line-through">
                <span>✕</span> Sniper Radar
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 bg-[#111] text-white font-bold rounded-xl border border-white/5 hover:bg-[#1a1a1a] transition-all"
            >
              Start Hunting
            </button>
          </div>

          {/* 2. PREMIUM TIER (The Anchor & Best Value) */}
          <div className="relative bg-gradient-to-b from-[#11081c] to-[#050505] border border-purple-500/50 rounded-3xl p-8 md:p-10 flex flex-col transform md:-translate-y-4 shadow-[0_0_50px_rgba(168,85,247,0.15)] z-20 ring-1 ring-white/5">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              Best Value
            </div>
            
            <h3 className="text-2xl font-black text-white mb-2">Premium</h3>
            <p className="text-sm text-gray-400 mb-8 font-light">The ultimate unfair advantage for serious snipers.</p>
            
            <div className="mb-8">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">$149.90</span>
              </div>
              <div className="text-xs text-purple-400/80 font-bold uppercase tracking-widest mb-1">Billed Yearly in SOL</div>
              <div className="text-sm text-gray-400 font-medium">Equals <span className="text-white font-bold">$12.49 / month</span></div>
            </div>

            {/* VALUE PROPOSITION BOX (Replaces the fake scarcity bar) */}
            <div className="mb-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl shadow-inner">
              <div className="text-[10px] font-black text-purple-400 mb-2 uppercase tracking-widest text-center">
                Uncompromised Performance
              </div>
              <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                Engineered for maximum reliability. Your requests bypass server traffic for prioritized analysis during peak network congestion.
              </p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-gray-200">
                <span className="text-purple-500">✦</span> <b>Unlimited</b> Deep-Scans & Volume Analysis
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-200">
                <span className="text-purple-500">✦</span> <b>Institutional AI Core</b> (GPT-4o & Claude 3.5 Sonnet)
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-200">
                <span className="text-purple-500">✦</span> <b>Priority Execution Queue</b> (Bypass traffic)
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-200">
                <span className="text-purple-500">✦</span> Advanced Syndicate Spy (Track 10 Whales)
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-200">
                <span className="text-purple-500">✦</span> <b>Early Access:</b> Terminal Webhooks & Alpha
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/dashboard/wallet')}
              className="w-full py-4 bg-purple-500 text-black font-black text-sm rounded-xl hover:bg-purple-400 hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              Claim Unfair Advantage
            </button>
          </div>

          {/* 3. PRO TIER (The Standard Alternative) */}
          <div className="bg-[#050505] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col hover:border-emerald-500/30 transition-colors shadow-2xl ring-1 ring-white/5">
            <h3 className="text-2xl font-black text-white mb-2">Sniper</h3>
            <p className="text-sm text-gray-500 mb-8 font-light">Remove the limits. Never get rugged again.</p>
            
            <div className="mb-8">
              <div className="flex items-end gap-2 mb-2">
                <div className="text-5xl font-black text-white">$14.90</div>
              </div>
              <div className="text-xs text-emerald-500 font-bold uppercase tracking-widest mb-1">Billed Monthly in SOL</div>
              <div className="text-sm text-gray-400 font-medium">Cancel anytime</div>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-emerald-500">✓</span> <b>Unlimited</b> AI Scans
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-emerald-500">✓</span> Standard AI Model (DeepSeek)
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-emerald-500">✓</span> 1x Whale Spy Radar
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-emerald-500">✓</span> Standard Server Queue
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 line-through">
                <span>✕</span> Terminal Webhooks & Priority RPC
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/dashboard/wallet')}
              className="w-full py-4 bg-[#111] text-emerald-400 font-bold rounded-xl border border-emerald-500/30 hover:bg-emerald-500/10 transition-all"
            >
              Upgrade to PRO
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;