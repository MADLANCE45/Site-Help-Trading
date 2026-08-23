import React, { useState } from 'react';

const Settings = () => {
  // Stati finti per i parametri del bot
  const [buyAmount, setBuyAmount] = useState(0.5);
  const [slippage, setSlippage] = useState(15);
  const [takeProfit, setTakeProfit] = useState(100);
  const [stopLoss, setStopLoss] = useState(30);
  const [priorityFee, setPriorityFee] = useState('0.005');

  return (
    <div className="flex-1 overflow-auto p-8 bg-background text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-100">⚙️ Configurazione Bot</h2>
        <p className="text-gray-500 mt-2">Imposta i parametri di rischio e le fee per i tuoi snipe on-chain.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pannello 1: Gestione Ordini */}
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-gray-800 shadow-xl">
          <h3 className="text-lg font-bold text-orange-400 mb-6 border-b border-gray-800 pb-2">
            Parametri di Entrata
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Dimensione Snipe (SOL)
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="w-full bg-[#111] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 transition"
                />
                <span className="absolute right-4 top-3 text-gray-500 font-bold">SOL</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Slippage Tollerato (%)
              </label>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-full accent-orange-500"
              />
              <div className="text-right text-orange-500 font-mono font-bold mt-1">{slippage}%</div>
              <p className="text-xs text-gray-600 mt-1">Slippage alti aumentano le chance di entrata sui lanci volatili (es. Pump.fun).</p>
            </div>
          </div>
        </div>

        {/* Pannello 2: Gestione Rischio e Uscita */}
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-gray-800 shadow-xl">
          <h3 className="text-lg font-bold text-orange-400 mb-6 border-b border-gray-800 pb-2">
            Gestione Rischio
          </h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-2">Take Profit (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    className="w-full bg-[#111] border border-green-900/50 rounded-lg p-3 text-green-400 font-bold focus:outline-none focus:border-green-500 transition"
                  />
                  <span className="absolute right-4 top-3 text-green-700">%</span>
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-400 mb-2">Stop Loss (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="w-full bg-[#111] border border-red-900/50 rounded-lg p-3 text-red-400 font-bold focus:outline-none focus:border-red-500 transition"
                  />
                  <span className="absolute right-4 top-3 text-red-700">%</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Jito Priority Fee (Accelerazione Tx)
              </label>
              <select 
                value={priorityFee}
                onChange={(e) => setPriorityFee(e.target.value)}
                className="w-full bg-[#111] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 appearance-none"
              >
                <option value="0.001">Bassa (0.001 SOL) - Rischio fallimento</option>
                <option value="0.005">Media (0.005 SOL) - Consigliata</option>
                <option value="0.01">Alta (0.01 SOL) - Frontrun competitivo</option>
                <option value="0.05">Estrema (0.05 SOL) - Modalità Cecchino</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all transform hover:-translate-y-1">
          Salva Configurazione On-Chain
        </button>
      </div>

    </div>
  );
};

export default Settings;