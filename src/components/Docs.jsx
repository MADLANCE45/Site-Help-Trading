import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Docs = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: '1. Introduction' },
    { id: 'engine', title: '2. Core Engine' },
    { id: 'threats', title: '3. Threat Detection' },
    { id: 'interface', title: '4. Interface & Tools' },
    { id: 'security', title: '5. Infrastructure' },
    { id: 'faq', title: '6. Glossary & FAQ' },
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
      
      {/* NAVBAR SEMPLIFICATA PER DOCS */}
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
          
          {/* 1. Introduction */}
          <section id="intro" className="scroll-mt-24 space-y-6">
            <h1 className="text-4xl font-black text-white tracking-tight border-b border-white/10 pb-4">1. Introduction</h1>
            
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">What is Meme Saver?</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Meme Saver is an institutional-grade quantitative trading terminal and forensic overlay designed specifically for the Solana ecosystem. It operates directly within your browser, transforming standard charting platforms (like DexScreener and Pump.fun) into a high-frequency, anti-manipulation command center. By bypassing visually delayed chart indicators, Meme Saver provides traders with real-time, on-chain execution data to identify organic momentum and filter out malicious actors.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">The Philosophy: Beyond the Chart</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Traditional charts are lagging indicators. By the time a green candle prints on a screen, algorithmic bots and insiders have already executed their distribution strategies. Meme Saver is built on the principle that true market intent is hidden within the raw transaction flow and early contract deployments. We focus on exposing hidden fees, developer supply hoarding, and artificial volume before they impact retail liquidity.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest text-sm">Getting Started</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-400 text-sm font-light">
                  <span className="text-emerald-500 font-black">1.</span> 
                  <span><b>Installation:</b> Deploy the Meme Saver extension to your Chromium-based browser.</span>
                </li>
                <li className="flex gap-3 text-gray-400 text-sm font-light">
                  <span className="text-emerald-500 font-black">2.</span> 
                  <span><b>Account Synchronization:</b> Securely link your extension to your Web Account via your unique Sync Key to unlock premium inference models.</span>
                </li>
                <li className="flex gap-3 text-gray-400 text-sm font-light">
                  <span className="text-emerald-500 font-black">3.</span> 
                  <span><b>RPC Node Configuration:</b> Connect a dedicated custom RPC endpoint (e.g., Helius) in the Control Room to guarantee throttling-free, zero-latency data ingestion.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 2. Core Engine */}
          <section id="engine" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight border-b border-white/10 pb-4">2. Core Engine: Hybrid Forensics</h2>
            
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Dynamic Weighted Algorithm</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Meme Saver does not rely on a single point of failure. The analytical engine utilizes a proprietary hybrid matrix that synthesizes historical contract forensics (Static Analysis) with real-time liquidity dynamics (Live Order Flow). This ensures that a historically dangerous token cannot disguise itself behind a temporary spike in buy volume.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">On-Chain History Analysis</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Upon initialization, the engine conducts a comprehensive background check on the token's origin. This includes developer wallet profiling, historical rug-pull signatures, and the identification of initial supply hoarding (Bundle Risks). The system evaluates the true decentralization of the top holders to determine if the liquidity pool is susceptible to a unilateral drain.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Real-Time Order Flow Parsing</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                The terminal establishes a direct WebSocket connection to the blockchain, bypassing third-party API delays. It calculates volumetric pressure in milliseconds, categorizing incoming capital as retail flow, smart money, or algorithmic MEV execution.
              </p>
            </div>
          </section>

          {/* 3. Threat Detection */}
          <section id="threats" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight border-b border-white/10 pb-4">3. Threat Detection Systems</h2>
            
            <div className="grid gap-4">
              <div className="bg-[#0a0a0a] border border-rose-500/20 p-5 rounded-xl border-l-4 border-l-rose-500">
                <h3 className="text-lg font-bold text-white mb-2">Bundle Pump Protection (Anti-FOMO Filter)</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Malicious actors frequently utilize orchestrated bot networks to inject massive, simultaneous buy orders, creating the illusion of extreme bullish momentum. Meme Saver utilizes high-frequency volume velocity heuristics to detect these artificial spikes. When overbought anomalies are identified, the system instantly downgrades the tactical score, issuing an alert to prevent traders from becoming exit liquidity during the subsequent dump.
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-amber-500/20 p-5 rounded-xl border-l-4 border-l-amber-500">
                <h3 className="text-lg font-bold text-white mb-2">Micro-Dumping & Sybil Detection</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  Sophisticated developers often distribute their tokens across dozens of unlinked wallets (Sybil Attack) to sell off assets in micro-fractions, bleeding the liquidity pool without triggering massive red candles on the chart. Meme Saver’s Event-Driven Multi-Agent Architecture monitors concurrent micro-transactions across the network, flagging coordinated sell-offs that traditional scanners miss.
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-purple-500/20 p-5 rounded-xl border-l-4 border-l-purple-500">
                <h3 className="text-lg font-bold text-white mb-2">Vampire Bleed Alerts</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  If the underlying organic buy pressure collapses unexpectedly while the price remains artificially elevated, the background monitoring agents will deploy a "Vampire Alert." This indicates that the primary manipulator has ceased supporting the floor price and is actively distributing holdings to late buyers.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Interface & Tools */}
          <section id="interface" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight border-b border-white/10 pb-4">4. Interface & Tools</h2>
            
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">The Tactical Hologram HUD</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                A zero-latency, draggable tactical overlay that floats directly on your charting interface. It provides an immediate, synthesized verdict (RIDE, SCALP, or AVOID) alongside a precise Trust Score. The HUD includes a localized RE-SCAN engine, allowing traders to recalculate the hybrid matrix instantly based on shifting order flow without triggering rate limits.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Live Tape & Order Flow Visualization</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                The Control Deck features a split-second visual representation of market momentum. The Order Flow bar dynamically tracks the ratio of inbound versus outbound liquidity. The Live Tape categorizes transactions using institutional tagging, separating standard retail trades from coordinated bundles and whale-sized executions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Smart Money Wallet Tracker & Spy Radar</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Traders can input specific wallet addresses into the Tracker to monitor key market participants. The Spy Radar operates as a background sentry, pushing non-intrusive, real-time alerts to the interface the moment a tracked entity (or a known malicious wallet) executes a transaction on the viewed contract.
              </p>
            </div>
          </section>

          {/* 5. Infrastructure & Security */}
          <section id="security" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight border-b border-white/10 pb-4">5. Infrastructure & Security</h2>
            
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Custom RPC Integration</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                For high-frequency execution, standard public nodes are insufficient. The terminal supports direct integration with premium RPC providers. Routing queries through a dedicated node ensures that the Live Tape and Threat Detection systems operate with maximum architectural efficiency.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Client-Side Execution & Privacy</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Meme Saver is engineered for absolute operational security. The extension does not store private keys, and it does not possess the capability to initiate unauthorized transactions. All complex tactical computations, spatial rendering, and multi-agent monitoring protocols are executed locally within the user's browser RAM, ensuring both data privacy and uncompromised rendering speed.
              </p>
            </div>
          </section>

          {/* 6. Glossary & FAQ */}
          <section id="faq" className="scroll-mt-24 space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight border-b border-white/10 pb-4">6. Glossary & FAQ</h2>
            
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl">
                <h3 className="font-bold text-white mb-2">What is a Rug Pull?</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">A malicious maneuver where the developers of a cryptocurrency project suddenly abandon it, either by draining the liquidity pool or selling off a pre-mined, hidden supply, leaving investors with worthless tokens.</p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl">
                <h3 className="font-bold text-white mb-2">How do developers generate Fake Volume?</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">Through "Wash Trading." Developers program bot networks to repeatedly buy and sell the token amongst themselves. This creates the optical illusion of high trading volume and strong market interest, enticing organic retail traders to invest.</p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl">
                <h3 className="font-bold text-white mb-2">What is a Sybil Attack in crypto trading?</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">In tokenomics, a Sybil Attack occurs when a single entity generates a large number of pseudonymous wallets to covertly hold a massive percentage of the token supply. This makes the holder distribution look healthy and decentralized, hiding the fact that one person controls the market.</p>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl">
                <h3 className="font-bold text-white mb-2">Why is Meme Saver faster than traditional charting tools?</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">Standard charts rely on aggregating blocks and routing data through multiple third-party servers before rendering a visual candle. Meme Saver connects directly to the transaction stream, parsing the raw data packets locally on your machine milliseconds after they hit the blockchain.</p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Docs;