import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const LandingPage = () => {
  const [browser, setBrowser] = useState('Chrome');
  const { connected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      navigate('/dashboard');
    }
  }, [connected, navigate]);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/firefox|fxios/i)) setBrowser('Firefox');
    else if (userAgent.match(/opr\//i)) setBrowser('Opera');
    else if (userAgent.match(/edg/i)) setBrowser('Edge');
    else if (userAgent.match(/brave/i)) setBrowser('Brave');
    else if (userAgent.match(/chrome|chromium|crios/i)) setBrowser('Chrome');
    else if (userAgent.match(/safari/i)) setBrowser('Safari');
  }, []);

  return (
    <div className="min-h-screen bg-background text-white font-sans overflow-y-auto">
      
      {/* HEADER */}
      <header className="flex justify-between items-center p-6 w-full z-50">
        <div className="font-black text-2xl tracking-tighter text-yellow-500">MS.</div>
        <WalletMultiButton className="!bg-yellow-500 hover:!bg-yellow-400 !text-black !font-black !rounded-xl !h-10 transition-all" />
      </header>

      {/* SEZIONE 1: HERO */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 flex flex-col lg:flex-row items-center gap-12 relative">
        
        {/* Colonna Sinistra */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10">
          <div className="inline-block bg-yellow-500/10 border-2 border-yellow-500 text-yellow-500 font-bold px-4 py-1 rounded-full mb-6 transform -rotate-2">
            🚨 IL RADAR DEFINITIVO PER SOLANA
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none uppercase">
            Smetti <br /> di farti <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Ruggare.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 font-bold mb-8 max-w-lg">
            Scansiona i token, evita gli scam e snippa prima della massa. Direttamente dal tuo browser. 🦍
          </p>

          <button className="group relative inline-flex items-center justify-center px-8 py-5 font-black text-black bg-yellow-500 rounded-2xl hover:scale-105 transition-all duration-200 shadow-[0_0_30px_rgba(234,179,8,0.4)] text-xl uppercase tracking-wider">
            Scimmia Dentro Ora
            <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <p className="mt-4 text-sm text-gray-500 font-mono font-bold">
            Disponibile gratis per {browser}
          </p>
        </div>

        {/* Colonna Destra: L'ESTENSIONE INTERATTIVA */}
        <div className="flex-1 w-full max-w-sm relative">
          <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full"></div>
          
          <div className="relative bg-[#111] rounded-[2rem] border-4 border-gray-800 shadow-2xl overflow-hidden flex flex-col h-[550px]">
            <div className="bg-gray-900 p-3 flex justify-center items-center border-b border-gray-800 shrink-0">
              <div className="w-10 h-1 text-[10px] bg-gray-700 rounded-full"></div>
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
              <img 
                src="/screenshot.png" 
                alt="Meme Saver Interface" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </main>

      {/* SEZIONE 2: ALTRI SCREENSHOTS */}
      <section className="bg-[#0a0a0a] border-y border-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 uppercase">Come ti salviamo il portafoglio</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-4 transform hover:-translate-y-2 transition-transform">
              <div className="aspect-video bg-gray-900 rounded-xl mb-4 flex items-center justify-center border border-gray-800 overflow-hidden">
                <span className="text-gray-600 font-mono text-sm">Spazio Screenshot 1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Radar in Tempo Reale</h3>
              <p className="text-gray-500 text-sm">Intercetta i lanci su Pump.fun prima che arrivino su Raydium.</p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-2xl p-4 transform hover:-translate-y-2 transition-transform">
              <div className="aspect-video bg-gray-900 rounded-xl mb-4 flex items-center justify-center border border-gray-800 overflow-hidden">
                <span className="text-gray-600 font-mono text-sm">Spazio Screenshot 2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analisi Algoritmica</h3>
              <p className="text-gray-500 text-sm">Scopri all'istante se il dev ha bloccato la liquidity o se è uno scam.</p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-2xl p-4 transform hover:-translate-y-2 transition-transform">
              <div className="aspect-video bg-gray-900 rounded-xl mb-4 flex items-center justify-center border border-gray-800 overflow-hidden">
                <span className="text-gray-600 font-mono text-sm">Spazio Screenshot 3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Auto-Sniper</h3>
              <p className="text-gray-500 text-sm">Imposta il tuo slippage e lascia che il bot compri per te in millisecondi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 3: PLACEHOLDER VIDEO */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-black mb-8 uppercase text-yellow-500">Guarda il bot in azione</h2>
        <div className="w-full aspect-video bg-[#111] border-2 border-dashed border-gray-800 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 transition-colors group">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent ml-2"></div>
          </div>
          <p className="text-gray-500 font-mono font-bold">Incolla qui l'iframe di YouTube</p>
        </div>
      </section>
    {/* FOOTER & LEGAL POLICIES */}
      <footer className="bg-black border-t border-gray-900 pt-16 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            {/* Brand e Mission */}
            <div className="md:w-1/3">
              <div className="font-black text-2xl tracking-tighter text-yellow-500 mb-4">MS.</div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Il terminale algoritmico avanzato per il trading su Solana. Costruito per darti un vantaggio matematico, non per garantirti profitti. 
              </p>
            </div>

            {/* Link Legali */}
            <div className="grid grid-cols-2 gap-12 md:w-2/3 md:justify-items-end">
              <div>
                <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Piattaforma</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-yellow-500 transition">Scarica Estensione</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition">Documentazione API</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition">Supporto</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Note Legali</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-white transition">Termini di Servizio</a></li>
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition">Informativa sui Cookie</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* DISCLAIMER SUI RISCHI (Il tuo vero scudo legale) */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 mb-8 text-xs text-gray-400 leading-relaxed">
            <p className="mb-2">
              <strong className="text-gray-300">DISCLAIMER SUI RISCHI E ASSENZA DI CONSULENZA FINANZIARIA:</strong> L'estensione Meme Saver fornisce esclusivamente strumenti software e analisi basate su algoritmi. Nessuna delle informazioni o dei punteggi ("Trust Score") generati dall'Intelligenza Artificiale costituisce una consulenza finanziaria, di investimento, legale o fiscale. Il trading di criptovalute, in particolare di token a bassa capitalizzazione (memecoin) sulla rete Solana, comporta un rischio estremamente elevato e la possibilità di perdere l'intero capitale investito.
            </p>
            <p className="mb-2">
              <strong className="text-gray-300">ESCLUSIONE DI RESPONSABILITÀ TECNICA:</strong> Gli algoritmi di rilevamento scam non sono infallibili e possono produrre falsi positivi o falsi negativi. Meme Saver non si assume alcuna responsabilità per perdite derivanti da "rug pull", token fraudolenti, slippage, congestione della rete RPC, latenza del nodo o errori di esecuzione degli smart contract. Le funzioni di "Auto-Sniper" agiscono secondo i parametri impostati dall'utente, il quale rimane l'unico responsabile delle transazioni firmate dal proprio wallet non-custodial (es. Phantom).
            </p>
            <p>
              <strong className="text-gray-300">TUTELA DELLA PRIVACY:</strong> L'estensione non memorizza, non trasmette e non ha mai accesso alle chiavi private del tuo wallet. Tutte le analisi avvengono interrogando dati pubblici on-chain.
            </p>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} Meme Saver. Tutti i diritti riservati.</p>
            <p className="flex items-center gap-2">
              Status Rete: <span className="w-2 h-2 rounded-full bg-green-500"></span> Operativa
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default LandingPage;