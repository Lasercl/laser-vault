import React, { useState, useEffect } from 'react';
import DashboardDetail from './components/DashboardDetail';
import AssetVault from './components/AssetVault';
import AiAdvisor from './components/AiAdvisor';
import WealthStats from './components/WealthStats';
import TransactionLog from './components/TransactionLog';

const FinanceApp = () => {
  const [view, setView] = useState('menu');
  
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('anthony_vault_v31');
    return saved ? JSON.parse(saved) : {
      cash: 25000000,
      customAssets: [
        { id: 1, name: 'Tanah BSD', value: 250000000 },
        { id: 2, name: 'Emas Antam (10g)', value: 12000000 }
      ],
      transactions: [{ id: 1, date: '28/03/2026', desc: 'Gaji SRIN', amount: 15000000, type: 'Masuk' }]
    };
  });

  useEffect(() => {
    localStorage.setItem('anthony_vault_v31', JSON.stringify(data));
  }, [data]);

  const netWorth = data.cash + data.customAssets.reduce((a, b) => a + b.value, 0);

  // --- STYLE RESET (THE BIG 5 THEME) ---
  const mainWrapperStyle = {
    backgroundColor: '#0a0f14',
    minHeight: '100vh',
    width: '100%',
    color: 'white',
    padding: '24px',
    boxSizing: 'border-box',
    textAlign: 'left',
    fontFamily: 'sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#161b22',
    border: '1px solid #30363d',
    borderRadius: '2.5rem',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
    height: '160px'
  };

  // --- ROUTING ---
  if (view === 'dashboard') return <DashboardDetail data={data} back={() => setView('menu')} />;
  if (view === 'vault') return <AssetVault data={data} setData={setData} back={() => setView('menu')} />;
  if (view === 'ai') return <AiAdvisor data={data} back={() => setView('menu')} />;
  if (view === 'stats') return <WealthStats data={data} netWorth={netWorth} back={() => setView('menu')} />;
  if (view === 'log') return <TransactionLog data={data} setData={setData} back={() => setView('menu')} />;

  return (
    <div style={mainWrapperStyle}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        {/* 1. HEADER */}
        <header style={{ paddingTop: '40px', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'italic', margin: 0, textTransform: 'uppercase', letterSpacing: '-1.5px' }}>
            Anthony<span style={{color: '#3b82f6'}}>.</span>Vault
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></div>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#484f58', textTransform: 'uppercase', letterSpacing: '3px', margin: 0 }}>Terminal Active</p>
          </div>
        </header>

        {/* 2. GRID MENU (2 COLUMNS) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          
          <div onClick={() => setView('dashboard')} style={cardStyle}>
            <span style={{ fontSize: '32px' }}>🖥️</span>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>Rp {(netWorth/1000000).toFixed(1)}M</p>
              <p style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', textTransform: 'uppercase', letterSpacing: '2px', margin: '4px 0 0 0' }}>Overview</p>
            </div>
          </div>

          <div onClick={() => setView('vault')} style={cardStyle}>
            <span style={{ fontSize: '32px' }}>💎</span>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>{data.customAssets.length} Assets</p>
              <p style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', textTransform: 'uppercase', letterSpacing: '2px', margin: '4px 0 0 0' }}>Portfolio</p>
            </div>
          </div>

          <div onClick={() => setView('ai')} style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e293b 0%, #0d1117 100%)', borderColor: '#3b82f650' }}>
            <span style={{ fontSize: '32px' }}>🤖</span>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '900', fontStyle: 'italic', margin: 0, color: '#60a5fa' }}>AI Ready</p>
              <p style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', textTransform: 'uppercase', letterSpacing: '2px', margin: '4px 0 0 0' }}>Advisor</p>
            </div>
          </div>

          <div onClick={() => setView('log')} style={cardStyle}>
            <span style={{ fontSize: '32px' }}>🧾</span>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>History</p>
              <p style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', textTransform: 'uppercase', letterSpacing: '2px', margin: '4px 0 0 0' }}>Records</p>
            </div>
          </div>

        </div>

        {/* 3. FULL WIDTH STATS CARD */}
        <div 
          onClick={() => setView('stats')} 
          style={{ 
            ...cardStyle, 
            height: 'auto', 
            padding: '24px', 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginTop: '0' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '28px' }}>📊</span>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '11px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>Wealth Analysis</p>
              <p style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', textTransform: 'uppercase', letterSpacing: '2px', margin: '2px 0 0 0' }}>Statistics Dashboard</p>
            </div>
          </div>
          <span style={{ color: '#30363d' }}>→</span>
        </div>

        {/* 4. FOOTER */}
        <footer style={{ marginTop: '60px', textAlign: 'center' }}>
          <p style={{ fontSize: '7px', fontWeight: '900', color: '#30363d', textTransform: 'uppercase', letterSpacing: '5px' }}>
            Engineer: Anthony Laser // SRIN v3.1
          </p>
        </footer>

      </div>
    </div>
  );
};

export default FinanceApp;