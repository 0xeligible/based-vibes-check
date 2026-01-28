"use client";
import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useState } from "react";

export default function BasedVibesApp() {
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      // Mengambil data user dari Farcaster secara otomatis
      const ctx = await sdk.context;
      setContext(ctx);
      // Memberitahu Farcaster bahwa aplikasi siap digunakan
      sdk.actions.ready();
    };
    init();
  }, []);

  // Tampilan saat sedang loading data
  if (!context) {
    return (
      <div className="bg-[#050505] text-[#0052FF] h-screen flex items-center justify-center font-mono animate-pulse">
        ANALYZING BASED ENERGY...
      </div>
    );
  }

  const user = context.user;
  const fid = user.fid;

  // Logika penentuan Persona berdasarkan nomor FID (Otomatis)
  let persona = "New Explorer";
  let color = "text-cyan-400";
  let border = "border-cyan-500/30";

  if (fid < 10000) { 
    persona = "Ancient Founder"; 
    color = "text-purple-500"; 
    border = "border-purple-500/50";
  } else if (fid < 100000) { 
    persona = "Early Resident"; 
    color = "text-blue-500"; 
    border = "border-blue-500/50";
  } else if (fid < 500000) { 
    persona = "Based Settler"; 
    color = "text-green-400"; 
    border = "border-green-400/50";
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
      <div className={`w-full max-w-sm bg-[#111] border ${border} rounded-[32px] p-8 text-center shadow-2xl`}>
        {/* Foto Profil Otomatis */}
        <img 
          src={user.pfpUrl} 
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-600 mb-4 shadow-[0_0_20px_rgba(0,82,255,0.3)]" 
          alt="Profile"
        />
        
        <h1 className="text-2xl font-bold">@{user.username}</h1>
        <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest">FID: {fid}</p>
        
        <div className="bg-black/50 py-6 rounded-2xl mb-8 border border-white/5">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">Your Based Identity</p>
          <h2 className={`text-3xl font-black ${color}`}>{persona}</h2>
        </div>

        {/* Tombol Share ke Feed Farcaster */}
        <button 
          onClick={() => {
            const text = `My Based Identity is ${persona} (FID: ${fid}). Check yours! 🔵`;
            window.open(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`);
          }}
          className="w-full bg-[#0052FF] py-4 rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-blue-900/40"
        >
          Share to Feed
        </button>
      </div>
    </main>
  );
}
