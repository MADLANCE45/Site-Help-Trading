import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction, Connection } from '@solana/web3.js';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

const Pricing = () => {
  const navigate = useNavigate();
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();
  
  // --- STATI DEL CHECKOUT ---
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discountStatus, setDiscountStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState({ type: null, text: '' }); 

  // --- STATI PREZZO DINAMICO ---
  const [liveSolPrice, setLiveSolPrice] = useState(140); 
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);

  const TREASURY_WALLET = "ERRYCEdzkYXcnCycVGYNmoQ2RHhdhi1wDfnFuRKHJ7QA"; 

  const validAffiliates = {
    'CRYPTOBOY10': 0.10,
    'WHALE20': 0.20,
    'COINHUB': 0.10, // TUTTO MAIUSCOLO
    'SAGE': 0.10
  };

  // --- LOGICA DI CALCOLO USD -> SOL ---
  const getBaseUsdPrice = (plan) => plan === 'premium' ? 149.90 : 14.90;

  const getFinalUsdPrice = () => {
    if (!checkoutPlan) return 0;
    let price = getBaseUsdPrice(checkoutPlan);
    if (discountStatus === 'success' && validAffiliates[promoCode.toUpperCase()]) {
      price = price * (1 - validAffiliates[promoCode.toUpperCase()]);
    }
    return price;
  };

  const getFinalSolPrice = () => {
    if (!checkoutPlan) return "0.0000";
    const usd = getFinalUsdPrice();
    return (usd / liveSolPrice).toFixed(4);
  };

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (validAffiliates[code]) {
      setDiscountStatus('success');
    } else {
      setDiscountStatus('error');
    }
  };

  // APERTURA MODALE E FETCH PREZZO SOLANA IN TEMPO REALE
  const openModal = async (plan) => {
    setCheckoutPlan(plan);
    setDiscountStatus(null);
    setPromoCode('');
    setTransactionMessage({ type: null, text: '' });
    setIsFetchingPrice(true);
    
    try {
      const solResp = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT");
      if (solResp.ok) {
          const solData = await solResp.json();
          setLiveSolPrice(parseFloat(solData.price));
      }
    } catch (apiErr) {
      console.warn("Binance API unreachable, using fallback price.", apiErr);
    } finally {
      setIsFetchingPrice(false);
    }
  };

  const handlePayment = async () => {
    setTransactionMessage({ type: null, text: '' });

    if (!publicKey) {
      setVisible(true);
      return;
    }

    setIsProcessing(true);
    try {
      const solAmountTarget = parseFloat(getFinalSolPrice());
      const lamportsToPay = Math.floor(solAmountTarget * 1e9); 
      
      const rpcUrl = import.meta.env.VITE_HELIUS_RPC || "https://api.mainnet-beta.solana.com";
      const directConnection = new Connection(rpcUrl, 'confirmed');
      
      const userBalance = await directConnection.getBalance(publicKey);
      const networkFeeBase = 5000; 
      
      if (userBalance < lamportsToPay + networkFeeBase) {
        setTransactionMessage({ 
          type: 'error', 
          text: 'Insufficient funds. Not enough SOL to cover the transaction and network fees.' 
        });
        setIsProcessing(false);
        return;
      }

      const { blockhash, lastValidBlockHeight } = await directConnection.getLatestBlockhash('confirmed');

      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: publicKey
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(TREASURY_WALLET),
          lamports: lamportsToPay,
        })
      );

      const signature = await sendTransaction(transaction, directConnection);

      await directConnection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      }, 'confirmed');

      // 🔥 AVVISA IL DATABASE DELLA TRANSAZIONE 🔥
      const API_URL = import.meta.env.VITE_API_URL || 'https://help-trading-production.up.railway.app';
      const verifyResp = await fetch(`${API_URL}/api/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            walletAddress: publicKey.toString(),
            signature: signature,
            planType: checkoutPlan,
            affiliateCode: discountStatus === 'success' ? promoCode.toUpperCase() : null 
        })
      });

      const verifyData = await verifyResp.json();
      if (!verifyResp.ok || !verifyData.success) {
        throw new Error(verifyData.error || "Server verification error");
      }

      // Mostriamo la chiave VERA generata dal server a schermo
      setTransactionMessage({ 
        type: 'success', 
        text: `Payment Successful!\nYour Sync Key is: ${verifyData.syncKey}\nRedirecting to Dashboard...`
      });
      
      // Dopo 3 secondi reindirizza l'utente alla dashboard per fargli vedere la chiave lì fissa
      setTimeout(() => {
        navigate('/dashboard');
      }, 3500);

    } catch (error) {
      console.error("ERRORE DETTAGLIATO TRANSAZIONE:", error);
      if (error.message && error.message.toLowerCase().includes("user rejected")) {
        setTransactionMessage({ type: 'error', text: 'Payment cancelled by user.' });
      } else {
        setTransactionMessage({ type: 'error', text: `Error: ${error.message || 'Transaction failed.'}` });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-200 py-24 px-6 relative overflow-x-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Unfair Advantage</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed font-light">
            Stop trading blind. Avoid one single rug-pull and the subscription pays for itself. 
            All payments are processed securely on-chain via Phantom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* SCOUT PLAN (FREE) */}
          <div className="bg-[#050505] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col hover:border-white/10 transition-colors shadow-2xl ring-1 ring-white/5">
            <h3 className="text-2xl font-black text-white mb-2">Scout</h3>
            <p className="text-sm text-gray-500 mb-8 font-light">Test the waters. Perfect for casual traders.</p>
            
            <div className="mb-8">
              <div className="text-5xl font-black text-white mb-2">$0</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Free Forever</div>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span> 
                <span className="leading-relaxed">5 AI Scans per day</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span> 
                <span className="leading-relaxed">Basic DeepSeek Model</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span> 
                <span className="leading-relaxed">Standard Public Routing</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 line-through">
                <span className="mt-0.5 flex-shrink-0">✕</span> 
                <span className="leading-relaxed">Priority Server Queue</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 line-through">
                <span className="mt-0.5 flex-shrink-0">✕</span> 
                <span className="leading-relaxed">Sniper Radar</span>
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 bg-[#111] text-white font-bold rounded-xl border border-white/5 hover:bg-[#1a1a1a] transition-all"
            >
              Start Hunting
            </button>
          </div>

          {/* PREMIUM PLAN */}
          <div className="relative bg-gradient-to-b from-[#11081c] to-[#050505] border border-purple-500/50 rounded-3xl p-8 md:p-10 flex flex-col transform md:-translate-y-4 shadow-[0_0_50px_rgba(168,85,247,0.15)] z-20 ring-1 ring-white/5">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
              Best Value
            </div>
            
            <h3 className="text-2xl font-black text-white mb-2">Premium</h3>
            <p className="text-sm text-gray-400 mb-8 font-light">Engineered for maximum reliability and unthrottled access during peak network congestion.</p>
            
            <div className="mb-8">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">$149.90</span>
              </div>
              <div className="text-xs text-purple-400/80 font-bold uppercase tracking-widest mb-1">Billed Yearly in SOL</div>
              <div className="text-sm text-gray-400 font-medium">Equals <strong className="text-white">$12.49 / month</strong></div>
            </div>
            
            <ul className="space-y-5 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-purple-400 mt-0.5 flex-shrink-0 text-base">✦</span> 
                <span className="leading-relaxed"><strong className="text-white">Unlimited</strong> Deep-Scans & Volume Analysis</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-purple-400 mt-0.5 flex-shrink-0 text-base">✦</span> 
                <span className="leading-relaxed"><strong className="text-white">Institutional AI Core</strong> (GPT-4o & Claude 3.5 Sonnet)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-purple-400 mt-0.5 flex-shrink-0 text-base">✦</span> 
                <span className="leading-relaxed"><strong className="text-white">Priority Execution Queue</strong> (Bypass server traffic)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-purple-400 mt-0.5 flex-shrink-0 text-base">✦</span> 
                <span className="leading-relaxed">Advanced Syndicate Spy <strong className="text-white">(Track up to 10 Whales)</strong></span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-purple-400 mt-0.5 flex-shrink-0 text-base">✦</span> 
                <span className="leading-relaxed">Early Access: Terminal Webhooks & Alpha Features</span>
              </li>
            </ul>
            
            <button 
              onClick={() => openModal('premium')}
              className="w-full py-4 bg-purple-500 text-black font-black text-sm rounded-xl hover:bg-purple-400 hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              Claim Premium
            </button>
          </div>

          {/* SNIPER PLAN (PRO) */}
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
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span> 
                <span className="leading-relaxed"><strong className="text-white">Unlimited</strong> AI Scans</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span> 
                <span className="leading-relaxed">Standard AI Model (DeepSeek)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span> 
                <span className="leading-relaxed">Spy Radar (1 Wallet)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span> 
                <span className="leading-relaxed">Jito MEV Shield</span>
              </li>
            </ul>
            
            <button 
              onClick={() => openModal('pro')}
              className="w-full py-4 bg-[#111] text-emerald-400 font-bold rounded-xl border border-emerald-500/30 hover:bg-emerald-500/10 transition-all"
            >
              Upgrade to PRO
            </button>
          </div>

        </div>
      </div>

      {/* CHECKOUT MODAL CON PREZZO DINAMICO */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            
            <button 
              onClick={() => setCheckoutPlan(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">
              Checkout: {checkoutPlan}
            </h3>

            <div className="flex justify-between items-center mb-6 border-b border-[#222] pb-4">
              <span className="text-gray-400 font-medium">Total Amount</span>
              <div className="text-right">
                <div className={`text-3xl font-mono font-bold ${checkoutPlan === 'premium' ? 'text-purple-400' : 'text-emerald-400'}`}>
                  {isFetchingPrice ? (
                    <span className="animate-pulse text-xl text-gray-500">Calculating...</span>
                  ) : (
                    `${getFinalSolPrice()} SOL`
                  )}
                </div>
                <div className="text-xs text-gray-500 font-medium mt-1">
                  ≈ ${getFinalUsdPrice().toFixed(2)} USD
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Promo / Affiliate Code</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 bg-[#111] border border-[#333] text-white px-4 py-3 rounded-xl uppercase focus:border-emerald-500 outline-none font-mono text-sm transition-colors"
                />
                <button 
                  onClick={handleApplyPromo}
                  className="px-6 py-3 bg-[#222] text-white font-bold rounded-xl border border-[#333] hover:bg-[#333] transition-colors"
                >
                  Apply
                </button>
              </div>
              
              {discountStatus === 'success' && (
                <p className="text-emerald-400 text-xs mt-2 font-bold flex items-center gap-1">
                  <span className="animate-pulse">🟢</span> Code applied! {validAffiliates[promoCode.toUpperCase()] * 100}% off.
                </p>
              )}
              {discountStatus === 'error' && (
                <p className="text-rose-500 text-xs mt-2 font-bold">❌ Invalid or expired code.</p>
              )}
            </div>

            <button 
              onClick={handlePayment}
              disabled={isProcessing || isFetchingPrice}
              className={`w-full py-4 font-black text-lg rounded-xl flex items-center justify-center gap-3 transition-all ${
                isProcessing || isFetchingPrice
                  ? 'bg-[#222] text-gray-500 cursor-not-allowed' 
                  : checkoutPlan === 'premium'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                    : 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Pay with Phantom'}
              {!isProcessing && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              )}
            </button>
            
            {/* 🟢 MESSAGGI DI ERRORE O SUCCESSO ELEGANTI 🔴 */}
            {transactionMessage.type === 'error' && (
              <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center">
                <span className="text-rose-500 text-xs font-bold uppercase tracking-wider">⚠️ {transactionMessage.text}</span>
              </div>
            )}
            
            {transactionMessage.type === 'success' && (
              <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-bold whitespace-pre-line relative z-10 block">
                  {transactionMessage.text}
                </span>
              </div>
            )}
            
            <p className="text-[10px] text-gray-600 text-center mt-4">
              Secure on-chain transaction. Ensure you have enough SOL for gas fees.
            </p>

          </div>
        </div>
      )}

    </div>
  );
};

export default Pricing;