import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Docs = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('architecture');

  const sections = [
    { id: 'architecture', title: '1. Forensic Architecture' },
    { id: 'matrix', title: '2. Trust Score Matrix' },
    { id: 'metrics', title: '3. Algorithmic Metrics' },
    { id: 'pillars', title: '4. The Four Pillars' },
    { id: 'faq', title: '5. Technical FAQ' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-emerald-500/30">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 w-full bg-[#050505]/90 backdrop-blur-2xl border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <img src="/meme.png" alt="Meme Saver Logo" className="w-8 h-8 rounded-lg border border-white/10 shadow-lg object-cover" />
            <div className="text-xl font-black tracking-tight text-white">
              Meme<span className="text-gray-500 font-medium">Saver</span> <span className="text-emerald-400 text-sm ml-2">DOCS</span>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row gap-12 items-start">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 shrink-0 md:sticky md:top-24 hidden md:block">
          <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Documentation</div>
          <ul className="space-y-1 border-l border-white/10">
            {sections.map((sec) => (
              <li key={sec.id}>
                <button
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left pl-4 py-2 text-sm font-bold transition-all border-l-2 ${
                    activeSection === sec.id 
                      ? 'border-emerald-400 text-emerald-400 bg-emerald-400/5' 
                      : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-white/20'
                  }`}
                >
                  {sec.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-3xl space-y-20 pb-32">
          
          {/* 1. Forensic Architecture (Definition-First) */}
          <section id="architecture" className="scroll-mt-24 space-y-6">
            <h1 className="text-4xl font-black text-white tracking-tight border-b border-white/10 pb-4">1. On-Chain Forensic Architecture</h1>
            
            <div>
              <p className="text-gray-300 leading-relaxed font-light text-lg">
                The Meme Saver Trust Score is a 0–100 algorithmic heuristic measuring token survivability based on Supply Integrity, Developer History, Sybil Resistance, and Micro-Dump velocity directly via high-frequency Solana RPC streams.
              </p>
            </div>
            
            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl mt-6">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest text-sm">Deployment & Configuration</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-400 text-sm font-light">
                  <span className="text-emerald-500 font-black">1.</span> 
                  <span><b>Installation:</b> Deploy the Meme Saver extension to your Chromium-based browser to activate the Pump.fun and DexScreener overlay.</span>
                </li>
                <li className="flex gap-3 text-gray-400 text-sm font-light">
                  <span className="text-emerald-500 font-black">2.</span> 
                  <span><b>Synchronization:</b> Link the extension to your Web Account via the Dashboard Sync Key to unlock deep-scan forensics.</span>
                </li>
                <li className="flex gap-3 text-gray-400 text-sm font-light">
                  <span className="text-emerald-500 font-black">3.</span> 
                  <span><b>RPC Node:</b> Connect a dedicated RPC endpoint to guarantee zero-latency execution against Jito bundle manipulation.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 2. Trust Score Matrix */}
          <section id="matrix" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight border-b border-white/10 pb-4">2. Understanding the 0–100 Trust Score Matrix</h2>
            <p className="text-gray-400 leading-relaxed font-light">
              The terminal operates on zero subjective indicators. Every evaluation reflects quantitative data parsed in real time. The Trust Score ranges from 0 (Artificial Trap) to 100 (Organic Flow).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-[#0a0a0a] border border-rose-500/30 p-5 rounded-xl">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest block mb-2">Score ≤ 35</span>
                <h3 className="text-lg font-bold text-white mb-1">AVOID / TRAP</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Critical danger. Indicates fresh disposable developer wallets (&lt; 24h), heavy Jito bundled supply (&gt; 20%), or malicious contracts. Extreme probability of total loss.
                </p>
              </div>
              <div className="bg-[#0a0a0a] border border-amber-500/30 p-5 rounded-xl">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-2">Score 36 – 65</span>
                <h3 className="text-lg font-bold text-white mb-1">SCALP / CHOP</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Manipulated territory. Wash-trading, developer staircase patterns, or concentrated supply clusters holding steady. High risk of sudden distribution.
                </p>
              </div>
              <div className="bg-[#0a0a0a] border border-emerald-500/30 p-5 rounded-xl">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-2">Score ≥ 66</span>
                <h3 className="text-lg font-bold text-white mb-1">RIDE / MOMENTUM</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Organic market mechanics. Independent top holders, clean developer history, distributed token holdings, and sustainable buy pressure on the bonding curve.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Algorithmic Metrics */}
          <section id="metrics" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight border-b border-white/10 pb-4">3. Algorithmic Risk Metrics & Thresholds</h2>
            
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-sm border border-[#222] rounded-xl overflow-hidden">
                <thead className="bg-[#111] text-gray-400 font-mono text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-4 border-b border-[#222]">Metric</th>
                    <th className="p-4 border-b border-[#222]">Range</th>
                    <th className="p-4 border-b border-[#222]">Critical Threshold</th>
                    <th className="p-4 border-b border-[#222]">Algorithmic Logic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222] bg-[#050505]">
                  <tr>
                    <td className="p-4 font-bold text-white">Supply Integrity</td>
                    <td className="p-4 font-mono text-gray-400">0 – 100%</td>
                    <td className="p-4 text-rose-400 font-mono">&gt; 20% in bundles</td>
                    <td className="p-4 text-xs text-gray-400">Flags coordinated supply control acquired during Block 0 via Jito tips.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Developer Trust</td>
                    <td className="p-4 font-mono text-gray-400">0 – 100%</td>
                    <td className="p-4 text-rose-400 font-mono">Wallet age &lt; 24h</td>
                    <td className="p-4 text-xs text-gray-400">Tracks transaction history across Solana to flag serial hit-and-run burner addresses.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Sybil Resistance</td>
                    <td className="p-4 font-mono text-gray-400">0 – 100%</td>
                    <td className="p-4 text-rose-400 font-mono">Shared funder ≥ 3 wallets</td>
                    <td className="p-4 text-xs text-gray-400">Executes reverse graph traversal to find common parent funding wallets or mixer interactions.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-white">Micro-Dump Risk</td>
                    <td className="p-4 font-mono text-gray-400">0 – 100%</td>
                    <td className="p-4 text-rose-400 font-mono">≥ 3 fractional sells</td>
                    <td className="p-4 text-xs text-gray-400">Detects gradual liquidity bleed by insiders while artificial buy pressure keeps the chart green.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. The Four Pillars */}
          <section id="pillars" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight border-b border-white/10 pb-4">4. The Four Forensic Pillars</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#080808] border border-[#222] p-5 rounded-xl">
                <h3 className="text-white font-bold mb-2">1. Supply Integrity</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Evaluates top 10 token holder balances against total circulating supply. Detects whether early snipers acquired dominant allocations in block zero through coordinated bundles.
                </p>
              </div>
              <div className="bg-[#080808] border border-[#222] p-5 rounded-xl">
                <h3 className="text-white font-bold mb-2">2. Developer Trust</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Tracks historical transaction signatures of the creator address to flag serial ruggers, burner deployment wallets, and multi-token dump farms.
                </p>
              </div>
              <div className="bg-[#080808] border border-[#222] p-5 rounded-xl">
                <h3 className="text-white font-bold mb-2">3. Sybil Resistance</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Performs reverse graph traversal on top holder funding sources to uncover secret parent wallets financing seemingly independent buyers on Pump.fun and Raydium.
                </p>
              </div>
              <div className="bg-[#080808] border border-[#222] p-5 rounded-xl">
                <h3 className="text-white font-bold mb-2">4. Micro-Dump Velocity</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Measures whether large holders are slowly offloading bags in micro-transactions (&lt; 0.5 SOL / token equivalent) while artificial buy orders create fake green candles.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Technical FAQ */}
          <section id="faq" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight border-b border-white/10 pb-4">5. Technical FAQ</h2>
            
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl">
                <h3 className="font-bold text-white mb-2">How does the Meme Saver Trust Score work?</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  The Trust Score is a 0-100 quantitative evaluation derived from four on-chain factors: Supply Integrity (bundled wallets), Developer History (burner wallet age), Sybil Resistance (shared funding networks), and Micro-Dump Risk (stealth distribution patterns).
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl">
                <h3 className="font-bold text-white mb-2">What does a Trust Score below 35 mean?</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  A score below 35 indicates extreme risk of capital loss. The token shows signs of a fresh burner deployer, heavy bundled supply, or unverified contract parameters.
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl">
                <h3 className="font-bold text-white mb-2">How are Jito bundles detected on Pump.fun?</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  The terminal inspects transaction block signatures to identify multiple buy orders executed within the exact same block using common tip accounts, flagging artificial early market manipulation.
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl">
                <h3 className="font-bold text-white mb-2">What is a Sybil Attack in crypto trading?</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  In tokenomics, a Sybil Attack occurs when a single entity generates a large number of pseudonymous wallets to covertly hold a massive percentage of the token supply, hiding the fact that one person controls the market.
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Docs;