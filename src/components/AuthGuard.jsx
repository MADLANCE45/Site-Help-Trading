import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import fpPromise from '@fingerprintjs/fingerprintjs';
import { supabase } from '../supabase';

export const AuthGuard = ({ children }) => {
  const { publicKey, signMessage, connected } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!connected) {
      setIsAuthenticated(false);
    }
  }, [connected]);

  const handleSignAndLogin = async () => {
    try {
      setIsSigning(true);
      setError('');

      if (!signMessage) {
        throw new Error('Your wallet does not support message signing.');
      }

      // 1. Ask Wallet to sign the message
      const message = new TextEncoder().encode("Log in to Meme Saver. No fees will be charged. Verify wallet ownership to receive 5 free scans.");
      await signMessage(message);

      // 2. Generate invisible Device Fingerprint
      const fp = await fpPromise.load();
      const result = await fp.get();
      const deviceId = result.visitorId;

      const walletAddress = publicKey.toString();
      
      // 3. Check if this Device ID has already created multiple free accounts
      const { data: existingDevices, error: deviceError } = await supabase
        .from('users')
        .select('wallet_address')
        .eq('device_id', deviceId)
        .neq('wallet_address', walletAddress);

      // Block if the same computer tries to use more than 2 wallets
      if (existingDevices && existingDevices.length >= 2) {
        throw new Error('Device limit reached. Free tier abuse detected. Please upgrade to PRO.');
      }

      // 4. Check if user exists in Supabase
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      // 5. If user DOES NOT exist, create them with their Device ID
      if (!user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ 
            wallet_address: walletAddress,
            scans_remaining: 5,
            plan_type: 'free',
            device_id: deviceId // Make sure to add this column in your Supabase table!
          }]);

        if (insertError) throw insertError;
      }

      // 6. Authentication successful
      setIsAuthenticated(true);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Signature rejected or connection error. Please try again.');
    } finally {
      setIsSigning(false);
    }
  };

  // CASE A: Wallet is not connected
  if (!connected) {
    return (
      <div className="flex h-screen bg-[#020202] items-center justify-center p-4 selection:bg-emerald-500/30">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-10 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden ring-1 ring-white/5">
          <div className="w-16 h-16 bg-[#111] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#222] shadow-inner">
            <span className="text-3xl">🔒</span>
          </div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Restricted Access</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
            Connect your Solana wallet to access the Meme Saver terminal. No funds will be requested.
          </p>
          <div className="flex justify-center">
             <WalletMultiButton className="!w-full !justify-center !bg-[#111] hover:!bg-[#1a1a1a] !text-white !border !border-[#333] !h-12 !rounded-xl !text-sm !font-bold transition-all shadow-lg" />
          </div>
        </div>
      </div>
    );
  }

  // CASE B: Wallet connected, but signature not verified
  if (connected && !isAuthenticated) {
    return (
      <div className="flex h-screen bg-[#020202] items-center justify-center p-4 selection:bg-emerald-500/30">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-10 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden ring-1 ring-white/5">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
          
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="text-3xl">✍️</span>
          </div>
          
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Identity Verification</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">
            Sign a message with your wallet to activate your <strong>5 free scans</strong> and unlock the Control Room.
          </p>

          {/* PREMIUM ERROR BOX */}
          {error && (
            <div className="mb-6 p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-start gap-3 text-left">
              <span className="text-rose-500 text-lg mt-0.5">⚠️</span>
              <div>
                <strong className="text-rose-400 text-sm block mb-0.5 font-bold">Authentication Failed</strong>
                <span className="text-gray-400 text-xs">{error}</span>
              </div>
            </div>
          )}

          <button 
            onClick={handleSignAndLogin}
            disabled={isSigning}
            className={`w-full px-6 py-4 bg-white text-black font-black text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 ${isSigning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 hover:-translate-y-0.5'}`}
          >
            {isSigning ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Awaiting Wallet...
              </>
            ) : 'Sign & Unlock'}
          </button>
          
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
            <WalletMultiButton className="!w-full !justify-center !bg-[#111] hover:!bg-[#1a1a1a] !h-10 !rounded-lg !text-xs !font-bold transition-colors border border-[#333] !text-gray-400 hover:!text-white" />
          </div>
        </div>
      </div>
    );
  }

  // CASE C: Wallet connected and signed -> Render App
  return children;
};

export default AuthGuard;