import React from 'react';

const Home = ({ data, setActiveTab, isAiOnly }) => {
  const totalStocks = data.stocks.reduce((a, b) => a + (b.price * b.lots * 100), 0);
  const totalCustom = data.customAssets.reduce((a, b) => a + b.value, 0);
  const netWorth = data.cash + totalStocks + totalCustom;

  if (isAiOnly) {
    return (
      <div className="animate-in zoom-in-95 duration-500 bg-white p-10 rounded-[3rem] shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-3xl">🤖</div>
        <h3 className="text-xl font-black italic uppercase italic tracking-tighter">AI Advisor</h3>
        <p className="text-sm italic text-slate-600">"Anthony, portofolio lu sudah mencapai Rp {(netWorth/1000000).toFixed(1)}M. Keren! AI saranin fokus kumpulin cash likuid dulu ya."</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* CARD: CASH */}
      <div className="bg-slate-950 p-9 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Liquid Cash</p>
        <h2 className="text-3xl font-bold italic tracking-tighter">Rp {data.cash.toLocaleString('id-ID')}</h2>
        <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-blue-600 rounded-full opacity-20 blur-[60px]"></div>
      </div>

      {/* GRID: STATS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-50 h-32 flex flex-col justify-between">
          <span className="text-xl">💎</span>
          <p className="font-bold text-sm italic">Rp {netWorth.toLocaleString('id-ID')}</p>
        </div>
        <div onClick={() => setActiveTab('ai')} className="bg-blue-600 p-7 rounded-[2.5rem] shadow-xl text-white h-32 flex flex-col justify-between active:scale-95 transition">
          <span className="text-xl">🤖</span>
          <p className="font-black text-[10px] uppercase italic">Open AI Advisor</p>
        </div>
      </div>
    </div>
  );
};

export default Home;