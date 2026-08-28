import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import { supabase } from '../supabase';

export const WalletProfile = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [localProData, setLocalProData] = useState(null);
  const [showKey, setShowKey] = useState(false); // Nasconde la chiave di default
  const baseData = {
    isPro: false,
    planType: 'free',
    scansRemaining: 5,
    totalPnl: "+$3,450.20",
    winRate: "68%",
    scamsAvoided: 14,
    bestTrade: "+420%",
    syncKey: ""
  };

  useEffect(() => {
    const fetchUserSupabase = async () => {
      if (!publicKey) {
        setLocalProData(null);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('wallet_address', publicKey.toString())
          .single();

        // Controlla se è PRO, PREMIUM o ADMIN
        if (data && (data.plan_type === 'pro' || data.plan_type === 'premium' || data.plan_type === 'admin')) {
          setLocalProData({ 
            isPro: true, 
            planType: data.plan_type,
            syncKey: data.sync_key,
            expiresAt: data.pro_expires_at
          });
        }
      } catch (error) {
        console.log("Utente free o errore DB");
      }
    };

    fetchUserSupabase();
  }, [publicKey]);

  const userData = localProData ? { ...baseData, ...localProData } : baseData;

  // 🔥 FUNZIONE DI UPGRADE DINAMICA (Accetta 'pro' o 'premium')
  const handleUpgrade = async (selectedPlan) => {
    if (!publicKey) return alert("Per favore, connetti prima il tuo wallet!");
    setIsProcessing(selectedPlan); // Salva quale piano sta caricando per il bottone

    try {
      // 1. Impostazioni in base al piano scelto
      const isPremium = selectedPlan === 'premium';
      const usdPrice = isPremium ? 69.90 : 19.90;
      const daysToAdd = isPremium ? 365 : 30;

      // 2. Oracolo Prezzo SOL
      const solResp = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT");
      const solData = await solResp.json();
      const solPriceUsd = parseFloat(solData.price);
      
      const solAmountTarget = parseFloat((usdPrice / solPriceUsd).toFixed(4));
      const lamportsToPay = solAmountTarget * 1e9; 

      // 3. Esecuzione Transazione
      const TARGET_FOUNDER_WALLET = new PublicKey("J216pocVZkQ1aipatZfeHQuyJq1WiFHqcHhsimyNz9vG");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: TARGET_FOUNDER_WALLET,
          lamports: lamportsToPay,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      console.log("Transazione inviata! Firma:", signature);

      await connection.confirmTransaction(signature, 'confirmed');

      // 4. Generazione Chiave e Salvataggio su Supabase
      const newSyncKey = "ms-" + selectedPlan + "-" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      const expirationDate = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString();

      try {
        const { error } = await supabase
          .from('users')
          .upsert({ 
            wallet_address: publicKey.toString(),
            is_pro: true, 
            plan_type: selectedPlan, // Salva 'pro' o 'premium'
            pro_expires_at: expirationDate,
            sync_key: newSyncKey 
          }, { 
            onConflict: 'wallet_address'
          });

        if (error) throw error;
      } catch (dbErr) {
        console.warn("DB issue, but payment secured.", dbErr);
      }

      setLocalProData({ isPro: true, planType: selectedPlan, syncKey: newSyncKey, expiresAt: expirationDate });
      alert(`🎉 ABBONAMENTO ${selectedPlan.toUpperCase()} ATTIVATO! Benvenuto nell'élite.`);
      
    } catch (err) {
      console.error(err);
      alert("Transazione annullata o fallita. Nessun fondo è stato prelevato.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#222] pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            {userData.planType === 'premium' ? '💎' : userData.isPro ? '👑' : '👤'}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Trader Profile</h2>
            <p className="text-gray-400 font-mono text-sm mt-1">
              {publicKey ? publicKey.toString() : 'Connetti il wallet per i dati live'}
            </p>
          </div>
        </div>
        <div className={`px-4 py-2 border rounded-lg font-bold text-sm tracking-widest uppercase ${userData.planType === 'premium' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : userData.isPro ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-[#111] border-[#333] text-gray-400'}`}>
          {userData.planType === 'premium' ? 'PREMIUM TIER' : userData.isPro ? 'PRO TIER' : 'FREE TIER'}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Trading Stats (Identica a prima, la nascondo per brevità ma tu lasciala!) */}
        <div className="xl:col-span-2 space-y-8">
          {/* ... (Lascia intatti i tuoi box delle statistiche: Net PnL, Win Rate, ecc. e AI Analysis) ... */}
          <div className="bg-[#050505] border border-[#222] rounded-xl overflow-hidden p-6 text-center text-gray-400">
             [Le tue statistiche di trading e AI Analysis vanno qui]
          </div>
        </div>

        {/* RIGHT COLUMN: LISTINO PREZZI / DASHBOARD PRO */}
        <div className="xl:col-span-1">
          {!userData.isPro ? (
            // 🔥 IL NUOVO LISTINO PREZZI (FREE TIER VIEW)
            <div className="space-y-4">
              
              {/* Box 1: PRO (Mensile) */}
              <div className="bg-[#0a0c10] border border-[#333] p-6 rounded-2xl relative overflow-hidden transition-all hover:border-[#00ffcc]/50">
                <h4 className="text-xl font-bold text-white mb-1">PRO Radar</h4>
                <div className="text-2xl font-black text-emerald-400 mb-4">$19.90 <span className="text-xs text-gray-500 font-medium">/ mese (in SOL)</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-emerald-500">✓</span> <span>Scansioni IA <b>Illimitate</b></span></li>
                  <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-emerald-500">✓</span> <span>Modello IA Standard (DeepSeek)</span></li>
                  <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-emerald-500">✓</span> <span>Spy Radar (1 Wallet)</span></li>
                </ul>
                <button 
                  onClick={() => handleUpgrade('pro')}
                  disabled={isProcessing !== false}
                  className="w-full py-3 bg-[#111] text-[#00ffcc] border border-[#00ffcc]/30 font-bold text-sm rounded-xl hover:bg-[#00ffcc]/10 transition-all"
                >
                  {isProcessing === 'pro' ? "Elaborazione..." : "Attiva PRO Mensile"}
                </button>
              </div>

              {/* Box 2: PREMIUM (Annuale) */}
              <div className="bg-gradient-to-b from-[#1a1025] to-[#0a0c10] border border-purple-500/50 p-6 rounded-2xl relative overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                <div className="absolute top-0 right-0 bg-purple-500 text-black text-[10px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-widest">
                  Miglior Scelta
                </div>
                <h4 className="text-xl font-bold text-white mb-1">PREMIUM Terminal</h4>
                <div className="text-2xl font-black text-purple-400 mb-4">$69.90 <span className="text-xs text-gray-500 font-medium">/ anno (in SOL)</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400">✓</span> <span>Tutto ciò che c'è nel PRO</span></li>
                  <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400">✓</span> <span><b>Modelli IA Istituzionali</b> (GPT-4o)</span></li>
                  <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400">✓</span> <span>Scelta manuale dell'IA</span></li>
                  <li className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400">✓</span> <span>Spy Radar Multiplo (10 Wallet)</span></li>
                </ul>
                <button 
                  onClick={() => handleUpgrade('premium')}
                  disabled={isProcessing !== false}
                  className="w-full py-3 bg-purple-500 text-black font-black text-sm rounded-xl hover:bg-purple-400 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  {isProcessing === 'premium' ? "Elaborazione..." : "Attiva PREMIUM Annuale"}
                </button>
              </div>

            </div>
          ) : (
            // 👑 DASHBOARD PRO/PREMIUM ATTIVA CON CHIAVE
            <div className={`bg-[#0a0c10] border ${userData.planType === 'premium' ? 'border-purple-500/50' : 'border-[#00ffcc]/30'} p-8 rounded-2xl relative shadow-2xl h-full flex flex-col items-center text-center`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 border ${userData.planType === 'premium' ? 'bg-purple-500/10 border-purple-500/30 text-4xl shadow-[0_0_30px_rgba(168,85,247,0.3)]' : 'bg-emerald-500/10 border-emerald-500/30 text-4xl shadow-[0_0_30px_rgba(0,230,118,0.2)]'}`}>
                {userData.planType === 'premium' ? '💎' : '👑'}
              </div>
              
              <h4 className="text-2xl font-bold text-white mb-2">
                Piano {userData.planType.toUpperCase()}
              </h4>
              <p className="text-gray-400 text-sm mb-6">
                Tutte le funzionalità sbloccate.
              </p>
              
              <div className="bg-[#111] border border-[#333] w-full p-4 rounded-xl text-left mb-6">
                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Scadenza Abbonamento</div>
                <div className="text-white font-mono text-sm">
                  {userData.expiresAt ? new Date(userData.expiresAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>

              <div className={`bg-[#050505] border ${userData.planType === 'premium' ? 'border-purple-500/40' : 'border-[#00ffcc]/40'} w-full p-5 rounded-xl text-left relative`}>
                <div className={`text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2 ${userData.planType === 'premium' ? 'text-purple-400' : 'text-[#00ffcc]'}`}>
                  <span>🔑 Extension Sync Key</span>
                </div>
                <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                  Incolla questa chiave nella "Control Room" dell'estensione.
                </p>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                      {/* L'input cambia type da "password" a "text" in base allo stato */}
                      <input 
                        type={showKey ? "text" : "password"} 
                        readOnly 
                        value={userData.syncKey} 
                        className="w-full bg-black border border-[#333] text-[#00ffcc] font-mono text-sm px-3 py-2 rounded-lg outline-none pr-10 tracking-widest"
                      />
                      {/* Bottone Occhio in posizione assoluta dentro l'input */}
                      <button 
                        onClick={() => setShowKey(!showKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showKey ? "🙈" : "👁️"}
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(userData.syncKey);
                        alert("Key copied! Now paste it into the Extension.");
                      }}
                      className="bg-[#00ffcc] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#00ccaa] transition-colors"
                    >
                      Copy
                    </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default WalletProfile;