import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '../supabase';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

export const WalletProfile = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  
  const [localProData, setLocalProData] = useState(null);
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: null });

  // --- STATI DEL MODALE E SCONTI ---
  const [checkoutPlan, setCheckoutPlan] = useState(null); // 'pro' o 'premium'
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountStatus, setDiscountStatus] = useState(null);
  const [liveSolPrice, setLiveSolPrice] = useState(140); // Prezzo di sicurezza base
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);

  const baseData = {
    planType: 'free',
    syncKey: "",
    expiresAt: null
  };

  // --- LISTA CODICI AFFILIATI ---
  const validAffiliates = {
    'CRYPTOBOY10': 0.10,
    'WHALE20': 0.20,
    'CoinHub': 0.10,
    'SAGE': 0.10
  };

  useEffect(() => {
    const fetchUserSupabase = async () => {
      if (!publicKey) {
        setLocalProData(null);
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('wallet_address', publicKey.toString())
          .single();

        if (data && (data.plan_type === 'pro' || data.plan_type === 'premium' || data.plan_type === 'admin')) {
          setLocalProData({ 
            planType: data.plan_type,
            syncKey: data.sync_key,
            expiresAt: data.pro_expires_at
          });
        }
      } catch (error) {
        console.log("Free user or DB error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSupabase();
  }, [publicKey]);

  const userData = localProData ? { ...baseData, ...localProData } : baseData;

  const showToast = (type, title, message) => {
    setToast({ show: true, type, title, message });
    setTimeout(() => setToast({ show: false, type: '', title: '', message: null }), 6000);
  };

  // --- CALCOLO PREZZI DINAMICO ---
  const getBaseUsdPrice = (plan) => plan === 'premium' ? 149.90 : 14.90;

  const getFinalUsdPrice = (plan) => {
    let price = getBaseUsdPrice(plan);
    if (discountStatus === 'success' && validAffiliates[promoCode.toUpperCase()]) {
      price = price * (1 - validAffiliates[promoCode.toUpperCase()]);
    }
    return price;
  };

  const getFinalSolPrice = () => {
    if (!checkoutPlan) return "0.0000";
    const usd = getFinalUsdPrice(checkoutPlan);
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

  // APERTURA MODALE E FETCH PREZZO SOLANA
  const openCheckoutModal = async (plan) => {
    if (!publicKey) {
      showToast('error', 'WALLET DISCONNECTED', 'Please connect your Phantom wallet.');
      return;
    }
    setCheckoutPlan(plan);
    setDiscountStatus(null);
    setPromoCode('');
    setIsFetchingPrice(true);
    
    try {
      const solResp = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT");
      if (solResp.ok) {
          const solData = await solResp.json();
          setLiveSolPrice(parseFloat(solData.price));
      }
    } catch (apiErr) {
      console.warn("API Prezzo Binance irraggiungibile, uso prezzo di fallback.", apiErr);
    } finally {
      setIsFetchingPrice(false);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const solAmountTarget = parseFloat(getFinalSolPrice());
      const lamportsToPay = Math.floor(solAmountTarget * 1e9); 
      
      const HELIUS_RPC = import.meta.env.VITE_HELIUS_RPC;
const directConnection = new Connection(HELIUS_RPC, 'confirmed');
// AGGIUNGI QUESTE 6 RIGHE: Controllo del saldo prima di disturbare Phantom
const userBalance = await directConnection.getBalance(publicKey);
const networkFeeBase = 5000; // ~0.000005 SOL in lamports
if (userBalance < lamportsToPay + networkFeeBase) {
    showToast('error', 'INSUFFICIENT FUNDS', 'Not enough SOL to cover the transaction + network fees.');
    setIsProcessing(false);
    return;
}

const { blockhash, lastValidBlockHeight } = await directConnection.getLatestBlockhash('confirmed');
// ... resto del tuo codice (transaction = new Transaction...)
      const TARGET_FOUNDER_WALLET = new PublicKey("ERRYCEdzkYXcnCycVGYNmoQ2RHhdhi1wDfnFuRKHJ7QA");
      
      const transaction = new Transaction({
          recentBlockhash: blockhash,
          feePayer: publicKey
      }).add(
          SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: TARGET_FOUNDER_WALLET,
              lamports: lamportsToPay,
          })
      );

      const signature = await sendTransaction(transaction, directConnection);
      
      await directConnection.confirmTransaction({
        signature: signature,
        blockhash: blockhash,
        lastValidBlockHeight: lastValidBlockHeight
      }, 'confirmed');

      // Dentro Pricing.jsx, dopo la conferma della transazione:
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

setTransactionMessage({ 
  type: 'success', 
  text: `Payment Successful! \nYour Sync Key is: ${verifyData.syncKey}\nCopy and save it securely.`
});

      setLocalProData({ 
          planType: checkoutPlan, 
          syncKey: verifyData.syncKey, 
          expiresAt: verifyData.expiresAt 
      });
      
      if (checkoutPlan === 'premium') {
        showToast('success', 'INSTITUTIONAL TIER ACTIVATED 💎', 'Welcome to the elite. Paste your new Sync Key in the extension.');
      } else {
        showToast('success', 'SNIPER TIER ACTIVATED ⚡', 'Sniper mode engaged. Unlimited scans unlocked.');
      }
      
      setCheckoutPlan(null); // Chiude il modale in caso di successo
      
    } catch (err) {
      console.error("❌ TRANSACTION ERROR:", err);
      if (err.message && err.message.toLowerCase().includes("user rejected")) {
          showToast('error', 'PAYMENT CANCELLED', 'You closed Phantom without confirming.');
      } else {
          showToast('error', 'TRANSACTION FAILED ⚠️', 'Unable to complete. Please check your funds and connection.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(userData.syncKey);
    showToast(
      'success',
      'SYNC KEY COPIED ✅',
      'Now open the Meme Saver browser extension, go to settings, and paste your key to unlock premium features.'
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative flex h-8 w-8">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-8 w-8 bg-[#00ffcc]"></span>
        </div>
        <div className="text-gray-500 font-mono text-sm tracking-widest uppercase animate-pulse">Syncing On-Chain Identity...</div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12 relative overflow-x-hidden">
      
      {/* CUSTOM TOAST NOTIFICATION */}
      <div className={`fixed bottom-10 right-10 z-[200] transition-all duration-500 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`bg-[#0a0a0a]/95 backdrop-blur-xl border p-5 rounded-2xl max-w-sm flex gap-4 items-start shadow-2xl ring-1 ring-white/5 ${toast.type === 'error' ? 'border-rose-500/30' : toast.title.includes('INSTITUTIONAL') ? 'border-purple-500/30' : 'border-emerald-500/30'}`}>
          <div className="text-2xl mt-0.5 animate-pulse">
            {toast.type === 'error' ? '❌' : toast.title.includes('INSTITUTIONAL') ? '💎' : '⚡'}
          </div>
          <div>
            <h4 className="text-white font-black text-sm tracking-wider uppercase mb-1">{toast.title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={() => setToast({ show: false, type: '', title: '', message: null })} className="text-gray-600 hover:text-white transition-colors ml-2">
            ✕
          </button>
        </div>
      </div>

      {/* 1. HEADER & ACTIVE PROFILE SECTION */}
      <div className="bg-[#050505] border border-[#222] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full pointer-events-none opacity-20 ${userData.planType === 'premium' ? 'bg-purple-500' : userData.planType === 'pro' ? 'bg-[#00ffcc]' : 'bg-gray-500'}`}></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 border-b border-[#222] pb-8 mb-8">
          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 rounded-full bg-[#111] border flex items-center justify-center text-2xl shadow-lg ${userData.planType === 'premium' ? 'border-purple-500/50 shadow-purple-500/20' : userData.planType === 'pro' ? 'border-emerald-500/50 shadow-emerald-500/20' : 'border-[#333]'}`}>
              {userData.planType === 'premium' ? '💎' : userData.planType === 'pro' ? '👑' : '👤'}
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">Account Settings</h2>
              <p className="text-gray-400 font-mono text-sm mt-1">
                {publicKey ? `${publicKey.toString().slice(0, 8)}...${publicKey.toString().slice(-8)}` : 'Connect wallet for live data'}
              </p>
            </div>
          </div>
          
          <div className={`px-4 py-2 border rounded-xl font-black text-sm tracking-widest uppercase ${userData.planType === 'premium' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : userData.planType === 'pro' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(0,230,118,0.2)]' : 'bg-[#111] border-[#333] text-gray-400'}`}>
            {userData.planType} TIER
          </div>
        </div>

        {/* ACTIVE SUBSCRIPTION DETAILS */}
        {(userData.planType === 'pro' || userData.planType === 'premium' || userData.planType === 'admin') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-[#0a0a0a] border border-[#222] p-5 rounded-xl">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Subscription Expiry</div>
              <div className="text-white font-mono text-lg">
                {userData.expiresAt ? new Date(userData.expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Lifetime Access'}
              </div>
            </div>

            <div className={`bg-[#0a0a0a] border ${userData.planType === 'premium' ? 'border-purple-500/30' : 'border-emerald-500/30'} p-5 rounded-xl relative`}>
              <div className={`text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2 ${userData.planType === 'premium' ? 'text-purple-400' : 'text-emerald-400'}`}>
                <span>🔑 Extension Sync Key</span>
              </div>
              <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type={showKey ? "text" : "password"} 
                      readOnly 
                      value={userData.syncKey} 
                      className="w-full bg-[#050505] border border-[#333] text-white font-mono text-sm px-3 py-2 rounded-lg outline-none pr-10 tracking-widest"
                    />
                    <button 
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      aria-label={showKey ? "Hide key" : "Show key"}
                    >
                      {showKey ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleCopyKey}
                    className={`px-4 py-2 rounded-lg font-bold text-sm text-black transition-colors ${userData.planType === 'premium' ? 'bg-purple-500 hover:bg-purple-400' : 'bg-emerald-400 hover:bg-emerald-300'}`}
                  >
                    Copy
                  </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. AVAILABLE PLANS SECTION */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Manage Subscription</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PRO PLAN */}
          <div className={`bg-[#0a0c10] border ${userData.planType === 'pro' ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(0,230,118,0.1)]' : 'border-[#333] hover:border-emerald-500/30'} p-8 rounded-2xl relative overflow-hidden transition-all flex flex-col`}>
            <h4 className="text-xl font-bold text-white mb-1">PRO Radar</h4>
            <div className="mb-6">
                <div className="text-4xl font-black text-emerald-400 mb-1">$14.90 <span className="text-sm text-gray-500 font-medium">/ month</span></div>
                <div className="text-xs text-gray-500 font-medium">Billed monthly in SOL</div>
            </div>
            
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-emerald-500">✓</span> <span><b>Unlimited</b> AI Scans</span></li>
              <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-emerald-500">✓</span> <span>Standard AI Model (DeepSeek)</span></li>
              <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-emerald-500">✓</span> <span>Spy Radar (1 Wallet)</span></li>
              <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-emerald-500">✓</span> <span>Jito MEV Shield</span></li>
            </ul>
            
            <button 
              onClick={() => openCheckoutModal('pro')}
              disabled={userData.planType === 'pro' || userData.planType === 'premium' || userData.planType === 'admin'}
              className="w-full py-3 bg-[#111] text-emerald-400 border border-emerald-500/30 font-bold text-sm rounded-xl hover:bg-emerald-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {userData.planType === 'pro' ? "Current Plan" : 
               (userData.planType === 'premium' || userData.planType === 'admin') ? "Included in Premium" : 
               "Activate PRO"}
            </button>
          </div>

          {/* PREMIUM PLAN */}
          <div className={`bg-gradient-to-b from-[#1a1025] to-[#0a0c10] border ${userData.planType === 'premium' ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'border-purple-500/50 hover:border-purple-500'} p-8 rounded-2xl relative overflow-hidden flex flex-col`}>
            {userData.planType !== 'premium' && (
              <div className="absolute top-0 right-0 bg-purple-500 text-black text-[10px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-widest">
                Best Value
              </div>
            )}
            <h4 className="text-xl font-bold text-white mb-1">PREMIUM</h4>
            <div className="mb-6">
                <div className="text-4xl font-black text-purple-400 mb-1">$149.90 <span className="text-sm text-gray-500 font-medium">/ year</span></div>
                <div className="text-xs text-purple-400/80 font-medium mt-2">
                  Engineered for maximum reliability and unthrottled access during peak network congestion.
                </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400">✦</span> <span><b>Unlimited</b> Deep-Scans & Volume Analysis</span></li>
              <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400">✦</span> <span><b>Institutional AI Core</b> (GPT-4o & Claude 3.5 Sonnet)</span></li>
              <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400">✦</span> <span><b>Priority Execution Queue</b> (Bypass server traffic)</span></li>
              <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400">✦</span> <span>Advanced Syndicate Spy (Track up to 10 Whales)</span></li>
              <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400">✦</span> <span><b>Early Access:</b> Terminal Webhooks & Alpha Features</span></li>
            </ul>
            
            <button 
              onClick={() => openCheckoutModal('premium')}
              disabled={userData.planType === 'premium' || userData.planType === 'admin'}
              className="w-full py-3 bg-purple-500 text-black font-black text-sm rounded-xl hover:bg-purple-400 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {(userData.planType === 'premium' || userData.planType === 'admin') ? "Current Plan" : "Activate PREMIUM"}
            </button>
          </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* CHECKOUT MODAL (Finestra a comparsa) */}
      {/* ========================================= */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            
            <button 
              onClick={() => setCheckoutPlan(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
              Checkout: {checkoutPlan}
            </h3>
            
            <p className="text-gray-500 text-xs mb-6">
              Original Price: ${getBaseUsdPrice(checkoutPlan).toFixed(2)} USD
            </p>

            <div className="flex justify-between items-center mb-6 border-b border-[#222] pb-4">
              <span className="text-gray-400 font-medium">Total Amount</span>
              <span className={`text-3xl font-mono font-bold ${checkoutPlan === 'premium' ? 'text-purple-400' : 'text-emerald-400'}`}>
                {isFetchingPrice ? (
                  <span className="animate-pulse text-xl text-gray-500">Calculating...</span>
                ) : (
                  `${getFinalSolPrice()} SOL`
                )}
              </span>
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
                    ? 'bg-purple-500 text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                    : 'bg-emerald-400 text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Pay with Phantom'}
              {!isProcessing && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              )}
            </button>
            
            <p className="text-[10px] text-gray-600 text-center mt-4">
              Live SOL price synced via Binance API. Ensure enough SOL for gas.
            </p>

          </div>
        </div>
      )}

    </div>
  );
};

export default WalletProfile;