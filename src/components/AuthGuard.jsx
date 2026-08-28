import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { supabase } from '../supabase';

export const AuthGuard = ({ children }) => {
  const { publicKey, signMessage, connected } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState('');

  // Se l'utente si disconnette, resettiamo l'autenticazione
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
        throw new Error('Il tuo wallet non supporta la firma dei messaggi!');
      }

      // 1. Chiediamo al Wallet di firmare un messaggio testuale
      const message = new TextEncoder().encode("Accedi a Meme Saver. Nessuna fee verrà addebitata. Dimostra di essere il proprietario del wallet per ricevere 5 scansioni gratuite.");
      await signMessage(message);

      // 2. Se la firma va a buon fine, controlliamo se l'utente esiste su Supabase
      const walletAddress = publicKey.toString();
      
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();

      // 3. Se l'utente NON esiste, lo creiamo regalandogli 5 scansioni
      // 3. Se l'utente NON esiste, lo creiamo con il piano free
      if (!user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ 
            wallet_address: walletAddress,
            scans_remaining: 5,
            plan_type: 'free' // 🔥 Modificato: non più is_pro
          }]);

        if (insertError) throw insertError;
      }

      // 4. Autenticazione completata con successo!
      setIsAuthenticated(true);

    } catch (err) {
      console.error(err);
      setError('Firma rifiutata o errore di connessione. Riprova.');
    } finally {
      setIsSigning(false);
    }
  };

  // CASO A: Il Wallet non è connesso
  if (!connected) {
    return (
      <div className="flex h-screen bg-black items-center justify-center p-4">
        <div className="bg-[#0a0a0a] border border-[#222] p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-[#111] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#333]">
            <span className="text-3xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Accesso Riservato</h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Per accedere al terminale di Meme Saver devi connettere il tuo wallet Solana. Nessun fondo verrà richiesto.
          </p>
          <WalletMultiButton className="!w-full !justify-center !bg-blue-600 hover:!bg-blue-500 !h-12 !rounded-xl !text-sm !font-bold transition-colors" />
        </div>
      </div>
    );
  }

  // CASO B: Il Wallet è connesso, ma l'utente non ha ancora firmato
  if (connected && !isAuthenticated) {
    return (
      <div className="flex h-screen bg-black items-center justify-center p-4">
        <div className="bg-[#0a0a0a] border border-[#222] p-8 rounded-2xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
          
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
            <span className="text-3xl">✍️</span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Verifica Identità</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Firma un messaggio con il tuo wallet per attivare le tue <strong>5 scansioni gratuite</strong> e sbloccare la Dashboard.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-lg">
              {error}
            </div>
          )}

          <button 
            onClick={handleSignAndLogin}
            disabled={isSigning}
            className={`w-full px-6 py-4 bg-white text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] ${isSigning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 hover:scale-[1.02]'}`}
          >
            {isSigning ? 'In attesa del Wallet...' : 'Firma e Sblocca'}
          </button>
          
          <div className="mt-6 pt-6 border-t border-[#222]">
            <WalletMultiButton className="!w-full !justify-center !bg-[#111] hover:!bg-[#222] !h-10 !rounded-lg !text-sm !font-semibold transition-colors border border-[#333]" />
          </div>
        </div>
      </div>
    );
  }

  // CASO C: Wallet connesso e Firma verificata -> Mostra l'App!
  return children;
};

export default AuthGuard;