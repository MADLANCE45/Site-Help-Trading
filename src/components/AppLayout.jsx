import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const StatusBars = ({ healthPercentage }) => {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[...Array(24)].map((_, i) => {
        const isAnomaly = Math.random() * 100 > healthPercentage;
        return (
          <div 
            key={i} 
            className={`w-1 rounded-sm transition-all duration-500 ${
              isAnomaly ? 'h-2 bg-amber-500' : 'h-4 bg-emerald-500'
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { publicKey } = useWallet(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);

  const [networkPing, setNetworkPing] = useState('--');
  const [systemHealth, setSystemHealth] = useState({
    status: 'connecting', 
    services: { radar: 100, deepseek: 100, gpt4o: 100, claude: 100 }
  });

  useEffect(() => {
    let isMounted = true;
    const checkNetwork = async () => {
      const startTime = Date.now();
      const API_URL = import.meta.env.VITE_API_URL || 'https://help-trading-production.up.railway.app';
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch(`${API_URL}/api/health`, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!res.ok) throw new Error("Backend error");
        
        const data = await res.json();
        const latency = Date.now() - startTime;
        
        if (isMounted) {
          setNetworkPing(latency);
          setSystemHealth({
            status: latency > 800 ? 'degraded' : 'operational',
            services: data.services
          });
        }
      } catch (err) {
        if (isMounted) {
          setNetworkPing('ERR');
          setSystemHealth({
            status: 'offline',
            services: { radar: 0, deepseek: 0, gpt4o: 0, claude: 0 }
          });
        }
      }
    };

    checkNetwork(); 
    const interval = setInterval(checkNetwork, 10000); 
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) => `
    w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-3.5 text-sm font-bold group
    ${isActive(path) 
      ? 'bg-white/[0.03] text-emerald-400 border border-white/10 shadow-[inset_3px_0_0_#10b981]' 
      : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.02] border border-transparent'}
  `;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Chiude il menu su mobile dopo il click
  };

  const menuItems = [
    { path: '/dashboard', label: 'Terminal Overview', icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>) },
    { path: '/dashboard/radar', label: 'Live AI Radar', icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5m13.5 0V6A2.25 2.25 0 0015 3.75h-1.5m-6 15H6A2.25 2.25 0 013.75 16.5v-1.5m13.5 0v1.5A2.25 2.25 0 0115 19.5h-1.5m-6-11.25h.008v.008H7.5V8.25zm0 3.75h.008v.008H7.5V12zm0 3.75h.008v.008H7.5v-.008zm3.75-7.5h.008v.008H11.25V8.25zm0 3.75h.008v.008H11.25V12zm0 3.75h.008v.008H11.25v-.008zm3.75-7.5h.008v.008H15V8.25zm0 3.75h.008v.008H15V12zm0 3.75h.008v.008H15v-.008z" /></svg>) },
    { path: '/dashboard/leaderboard', label: 'Leaderboard', icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728m-8.54-5.492a46.327 46.327 0 01m5.006 0a46.327 46.327 0 00-5.006 0z" /></svg>) },
    { path: '/dashboard/wallet', label: 'Access & Tier', icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>) }
  ];

  return (
    <div className="flex h-screen bg-[#020202] text-gray-200 font-sans overflow-hidden">
      
      {/* HEADER MOBILE - FIX: Era stato cancellato! */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#050505] border-b border-white/5 z-50 flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/meme.png" alt="Logo" className="w-8 h-8 rounded-lg border border-emerald-500/30 object-cover" />
          <h1 className="text-xl font-black text-white">Meme<span className="text-emerald-400">Saver</span></h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-gray-400 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          )}
        </button>
      </div>

      {/* OVERLAY MOBILE - Scurisce lo sfondo quando il menu è aperto */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* SIDEBAR PRINCIPALE */}
      <aside className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-[#050505] border-r border-white/5 flex flex-col z-40
        transition-transform duration-300 ease-in-out shadow-[10px_0_30px_rgba(0,0,0,0.5)] md:shadow-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* LOGO & NETWORK STATUS REALE (Solo Desktop) */}
        <div className="p-6 border-b border-white/5 hidden md:block cursor-pointer group" onClick={() => navigate('/')}>
          <div className="flex items-center gap-3">
            <img src="/meme.png" alt="Logo" className={`w-8 h-8 rounded-lg border shrink-0 object-cover transition-all duration-500 ${publicKey ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] grayscale-0 opacity-100' : 'border-white/10 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0'}`} />
            <h1 className="text-2xl font-black tracking-tight text-white whitespace-nowrap">
              Meme<span className={`font-medium transition-colors duration-500 ${publicKey ? 'text-emerald-400' : 'text-gray-500'}`}>Saver</span>
            </h1>
          </div>
          
          <div 
            className="relative mt-4"
            onMouseEnter={() => setIsNetworkModalOpen(true)}
            onMouseLeave={() => setIsNetworkModalOpen(false)}
          >
            <div className="flex items-center gap-2 pl-1 cursor-help">
              <div className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${systemHealth.status === 'offline' ? 'bg-rose-500' : systemHealth.status === 'degraded' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${systemHealth.status === 'offline' ? 'bg-rose-500' : systemHealth.status === 'degraded' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
              </div>
              <p className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${systemHealth.status === 'offline' ? 'text-rose-500' : systemHealth.status === 'degraded' ? 'text-amber-500' : 'text-emerald-400'}`}>
                {systemHealth.status === 'offline' ? 'Terminal Offline' : systemHealth.status === 'degraded' ? 'High Latency' : 'All Systems Operational'}
              </p>
            </div>

            <div className={`absolute top-full left-0 mt-2 w-72 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 origin-top-left z-50 ${isNetworkModalOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="flex justify-between items-end border-b border-white/5 pb-3 mb-4">
                <div className="text-xs font-black text-white uppercase tracking-widest">Network Health</div>
                <div className="text-[10px] font-mono text-gray-400">{networkPing}ms</div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    <span>Live Radar Stream</span>
                    <span className="text-emerald-400 font-mono">{systemHealth.services.radar.toFixed(1)}%</span>
                  </div>
                  <StatusBars healthPercentage={systemHealth.services.radar} />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    <span>DeepSeek API (Base)</span>
                    <span className="text-emerald-400 font-mono">{systemHealth.services.deepseek.toFixed(1)}%</span>
                  </div>
                  <StatusBars healthPercentage={systemHealth.services.deepseek} />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    <span>OpenAI GPT-4o (Inst.)</span>
                    <span className="text-emerald-400 font-mono">{systemHealth.services.gpt4o.toFixed(1)}%</span>
                  </div>
                  <StatusBars healthPercentage={systemHealth.services.gpt4o} />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    <span>Claude 3.5 Sonnet (Inst.)</span>
                    <span className="text-emerald-400 font-mono">{systemHealth.services.claude.toFixed(1)}%</span>
                  </div>
                  <StatusBars healthPercentage={systemHealth.services.claude} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Menu Navigazione */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto mt-16 md:mt-0">
          <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-4 mb-4">Terminal Core</div>
          {menuItems.map((item) => (
            <button key={item.path} onClick={() => handleNavigation(item.path)} className={navItemClass(item.path)}>
              <span className={`transition-colors ${isActive(item.path) ? 'text-emerald-400' : 'text-gray-500 group-hover:text-gray-400'}`}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* FOOTER DELLA SIDEBAR */}
        <div className="p-4 border-t border-white/5 bg-[#020202] space-y-4 pb-8 md:pb-4">
          <div className="px-2 py-3 border border-white/5 rounded-xl bg-white/[0.01] flex justify-between items-center">
             <div className="flex items-center gap-2">
               <div className={`w-1.5 h-1.5 rounded-full ${systemHealth.status === 'offline' ? 'bg-rose-500' : 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]'}`}></div>
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Main API</span>
             </div>
             <span className={`text-[10px] font-mono ${systemHealth.status === 'offline' ? 'text-rose-500' : 'text-emerald-400'}`}>
               {networkPing === '--' || networkPing === 'ERR' ? 'Offline' : `${networkPing}ms`}
             </span>
          </div>

          <WalletMultiButton className="!w-full !justify-center !bg-[#0a0a0a] hover:!bg-[#111] !h-12 !rounded-xl !text-sm !font-bold transition-all border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:border-emerald-500/30" />
          
          <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 text-xs text-gray-600 hover:text-gray-300 transition-colors py-2 font-bold uppercase tracking-wider">
            <span>←</span> Exit Terminal
          </button>
        </div>
      </aside>

      {/* AREA CONTENUTO PRINCIPALE (Scroll indipendente) */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#020202] pt-16 md:pt-0 relative custom-scrollbar">
        <div className="w-full min-h-full pb-20 md:pb-0">
          {children}
        </div>
      </main>

    </div>
  );
};

export default AppLayout;