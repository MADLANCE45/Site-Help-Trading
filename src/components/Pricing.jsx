import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  // Toggle per switchare tra Mensile e Annuale
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-[#020202] text-gray-200 py-24 px-6 relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Unfair Advantage</span>
          </h2>
          <p className="text-lg text-gray-400">
            Stop trading blind. Avoid one single rug-pull and the subscription pays for itself. 
            All payments are processed securely on-chain via Phantom.
          </p>
          
          {/* BILLING TOGGLE */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Pay Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 rounded-full bg-[#111] border border-[#333] transition-colors p-1"
            >
              <div className={`w-6 h-6 rounded-full transition-transform duration-300 ${isAnnual ? 'translate-x-8 bg-amber-500' : 'bg-blue-500'}`}></div>
            </button>
            <span className={`text-sm font-bold flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
              Pay Yearly <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded uppercase tracking-wider">Save 70%</span>
            </span>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* 1. FREE TIER (The Hook) */}
          <div className="bg-[#0a0a0a] border border-[#222] rounded-3xl p-8 h-full flex flex-col hover:border-[#444] transition-colors">
            <h3 className="text-xl font-black text-white mb-2">Scout</h3>
            <p className="text-sm text-gray-500 mb-6">Test the waters. Perfect for casual traders.</p>
            <div className="text-4xl font-black text-white mb-8">$0 <span className="text-sm text-gray-500 font-medium">/ forever</span></div>
            
            <ul className="space-y-4 mb-8 flex-1">
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
                <span>✕</span> MEV Sandwich Protection
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 bg-[#111] text-white font-bold rounded-xl border border-[#333] hover:bg-[#1a1a1a] transition-all"
            >
              Start Hunting
            </button>
          </div>

          {/* 2. PREMIUM TIER (The Anchor & Real Cash Generator) */}
          <div className="relative bg-[#050505] border border-amber-500/50 rounded-3xl p-8 h-full flex flex-col transform md:-translate-y-4 shadow-[0_0_50px_rgba(245,158,11,0.15)] z-20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">
              Most Popular
            </div>
            
            <h3 className="text-2xl font-black text-white mb-2">Institutional</h3>
            <p className="text-sm text-gray-400 mb-6">The ultimate unfair advantage for serious snipers.</p>
            
            <div className="mb-6">
              {isAnnual ? (
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl text-gray-500 line-through font-bold pb-1">$238.80</span>
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">$69.90</span>
                  </div>
                  <div className="text-sm text-gray-500 font-medium mt-1">/ year, billed annually in SOL</div>
                </div>
              ) : (
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">$19.90</span>
                    <span className="text-sm text-gray-500 font-medium mb-1">/ month</span>
                  </div>
                  <div className="text-sm text-gray-500 font-medium mt-1">Billed monthly in SOL</div>
                </div>
              )}
            </div>

            {/* SCARCITY PROGRESS BAR */}
            <div className="mb-8 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <div className="flex justify-between text-xs font-bold text-amber-500 mb-2 uppercase tracking-wider">
                <span>Early Bird Spots</span>
                <span>87 / 100</span>
              </div>
              <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-[87%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center">To ensure sub-millisecond RPC speeds, slots are strictly capped.</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-gray-200 font-medium">
                <span className="text-amber-500">✦</span> Infinite AI Scans & Copilot
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-200">
                <span className="text-amber-500">✦</span> GPT-4o & Claude 3.5 unlocked
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-200">
                <span className="text-amber-500">✦</span> Syndicate Spy (Track up to 10 Whales)
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-200">
                <span className="text-amber-500">✦</span> Helius Turbo Node Routing (0.1ms)
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-200">
                <span className="text-amber-500">✦</span> VIP Discord (Auto-calls Score &gt; 90)
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-200 opacity-80">
                <span className="text-blue-400 animate-pulse">⚙️</span> Auto-Copy Trade (Beta Access)
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/dashboard/wallet')}
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-black text-lg rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              Claim Unfair Advantage
            </button>
          </div>

          {/* 3. PRO TIER (The Alternative) */}
          <div className="bg-[#0a0a0a] border border-[#222] rounded-3xl p-8 h-full flex flex-col hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-black text-white mb-2">Sniper</h3>
            <p className="text-sm text-gray-500 mb-6">Remove the limits. Never get rugged again.</p>
            
            <div className="mb-8">
              <div className="text-4xl font-black text-white mb-1">
                {isAnnual ? '$14.90' : '$19.90'} <span className="text-sm text-gray-500 font-medium">/ month</span>
              </div>
              {isAnnual && <div className="text-xs text-blue-400 font-medium">Billed $178.80 yearly</div>}
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-blue-500">✓</span> Unlimited AI Scans
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-blue-500">✓</span> Jito MEV Shield (No Sandwich)
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-blue-500">✓</span> 1x Whale Spy Radar
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-500 line-through">
                <span>✕</span> VIP Discord & Turbo Nodes
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/dashboard/wallet')}
              className="w-full py-4 bg-[#111] text-blue-400 font-bold rounded-xl border border-blue-500/30 hover:bg-blue-500/10 transition-all"
            >
              Upgrade with Phantom
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;