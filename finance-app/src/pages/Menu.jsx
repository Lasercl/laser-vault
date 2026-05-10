import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { t } from '../utils/i18n';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const Menu = ({ setView }) => {
  const { netWorth, data } = useFinance();

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

  return (
    <>
      <Header />
      {/* GRID MENU (2 COLUMNS) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        
        <div onClick={() => setView('dashboard')} style={cardStyle}>
          <span style={{ fontSize: '32px' }}>🖥️</span>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>Rp {(netWorth/1000000).toFixed(1)}M</p>
            <p style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', textTransform: 'uppercase', letterSpacing: '2px', margin: '4px 0 0 0' }}>{t('overview')}</p>
          </div>
        </div>

        <div onClick={() => setView('vault')} style={cardStyle}>
          <span style={{ fontSize: '32px' }}>💎</span>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>{data.customAssets.length} {t('assets')}</p>
            <p style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', textTransform: 'uppercase', letterSpacing: '2px', margin: '4px 0 0 0' }}>{t('portfolio')}</p>
          </div>
        </div>

        <div onClick={() => setView('ai')} style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e293b 0%, #0d1117 100%)', borderColor: '#3b82f650' }}>
          <span style={{ fontSize: '32px' }}>🤖</span>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '900', fontStyle: 'italic', margin: 0, color: '#60a5fa' }}>{t('aiReady')}</p>
            <p style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', textTransform: 'uppercase', letterSpacing: '2px', margin: '4px 0 0 0' }}>{t('advisor')}</p>
          </div>
        </div>

        <div onClick={() => setView('log')} style={cardStyle}>
          <span style={{ fontSize: '32px' }}>🧾</span>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>{t('history')}</p>
            <p style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', textTransform: 'uppercase', letterSpacing: '2px', margin: '4px 0 0 0' }}>{t('records')}</p>
          </div>
        </div>

      </div>

      {/* FULL WIDTH STATS CARD */}
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
            <p style={{ fontSize: '11px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>{t('wealthAnalysis')}</p>
            <p style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', textTransform: 'uppercase', letterSpacing: '2px', margin: '2px 0 0 0' }}>{t('statisticsDashboard')}</p>
          </div>
        </div>
        <span style={{ color: '#30363d' }}>→</span>
      </div>
      <Footer />
    </>
  );
};

export default Menu;
