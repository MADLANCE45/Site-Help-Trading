import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 py-16 px-6 font-sans relative overflow-x-hidden">
      
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        <button 
          onClick={() => navigate('/')}
          className="mb-8 text-gray-500 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-emerald-400 font-mono text-sm mb-12">Last Updated: September 2026</p>

        <div className="space-y-8 text-sm md:text-base leading-relaxed bg-[#0a0a0a] border border-[#222] p-8 md:p-12 rounded-3xl shadow-2xl">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p className="text-gray-400">
              Welcome to Meme Saver ("we", "our", or "us"). We are committed to protecting your privacy. This Privacy Policy explains how our browser extension and web platform collect, use, and safeguard your information. By using Meme Saver, you agree to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p className="text-gray-400 mb-3">We collect the absolute minimum amount of data required to provide our services:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">Anonymous Device ID:</strong> We generate a random, anonymous string (Device ID) stored locally in your browser. This is solely used to enforce daily API rate limits (Free Tier) and prevent abuse of our AI infrastructure.</li>
              <li><strong className="text-gray-200">Public Blockchain Data:</strong> Our extension reads public Solana wallet addresses and token contract addresses (Mint IDs) from the active tabs you visit (e.g., Pump.fun, Raydium, DexScreener). This data is already public on the blockchain.</li>
              <li><strong className="text-gray-200">Authentication Keys:</strong> If you purchase a PRO or Premium subscription, we store a secure "Sync Key" linked to your public Solana wallet address to authenticate your premium access.</li>
            </ul>
            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-mono text-xs">
              WE DO NOT collect personal identifiable information (PII) such as names, emails, IP addresses, or physical addresses.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>To query public RPC nodes (Helius) and retrieve transaction history for risk analysis.</li>
              <li>To send public token metrics to our AI providers (Groq, OpenAI, Anthropic) to generate safety reports. No user-specific data is ever sent to AI models; only public blockchain metrics are analyzed.</li>
              <li>To manage your subscription status via our secure database (Supabase).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-400">
              <strong className="text-white">We do not sell, rent, or trade your data to third parties.</strong> Data is only transmitted to our trusted infrastructure providers (Supabase for database hosting, Helius for blockchain RPC) strictly for the purpose of delivering the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Extension Permissions Justification</h2>
            <p className="text-gray-400 mb-3">Our browser extension requires specific permissions to function correctly:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong className="text-gray-200">activeTab / host_permissions:</strong> Required to read the token address from supported DEX platforms (Pump.fun, DexScreener) to fetch real-time blockchain data.</li>
              <li><strong className="text-gray-200">storage:</strong> Required to save your Sync Key and UI preferences locally, so you don't have to log in every time you open the browser.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Security</h2>
            <p className="text-gray-400">
              We implement industry-standard security measures to protect your Sync Key and subscription data. All communications between the extension and our servers are encrypted via HTTPS/WSS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
            <p className="text-gray-400">
              If you have any questions or concerns about this Privacy Policy, please contact us via our official communication channels on X (Twitter) or through our platform support.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;