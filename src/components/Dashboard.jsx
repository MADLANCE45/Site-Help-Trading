import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '../supabase';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { publicKey } = useWallet();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!publicKey) return;
    
    const fetchUser = async () => {
      const { data } = await supabase
        .from('users')
        .select('plan_type, scans_remaining')
        .eq('wallet_address', publicKey.toString())
        .single();
      
      setUserData(data);
    };
    
    fetchUser();
  }, [publicKey]);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="border-b border-[#222] pb-6">
        <h2 className="text-3xl font-semibold text-white tracking-tight">Control Room</h2>
        <p className="text-gray-400 text-sm mt-1">Gestisci la tua licenza e installa il Radar sul tuo browser.</p>
      </div>

      {/* STATISTICHE REALI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black p-6 rounded-xl border border-[#222]">
          <div className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-widest">Piano Attuale</div>
          <div className="text-3xl font-bold text-white capitalize">
            {userData ? userData.plan_type : 'Caricamento...'}
          </div>
        </div>
        
        <div className="bg-black p-6 rounded-xl border border-[#222]">
          <div className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-widest">Scansioni Rimanenti (Oggi)</div>
          <div className="text-3xl font-bold text-blue-400">
            {userData?.plan_type === 'pro' || userData?.plan_type === 'premium' 
              ? 'Illimitate ♾️' 
              : `${userData?.scans_remaining || 0} / 5`}
          </div>
        </div>
      </div>

      {/* CALL TO ACTION OPERATIVA */}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Installa Meme Saver</h3>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            Il software funziona direttamente sul tuo browser. Scarica l'estensione, inserisci la tua Sync Key nella tab "Wallet" e inizia a scansionare i token su Pump.fun.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {userData?.plan_type === 'free' && (
            <button 
              onClick={() => navigate('/dashboard/pricing')}
              className="px-6 py-3 bg-[#111] text-amber-500 border border-amber-500/30 font-semibold text-sm rounded-lg hover:bg-amber-500/10 transition-colors whitespace-nowrap"
            >
              Upgrade PRO
            </button>
          )}
          <button className="px-6 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
            Scarica Estensione
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;