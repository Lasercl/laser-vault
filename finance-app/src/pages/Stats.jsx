import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { t } from '../utils/i18n';

const WealthStats = ({ back }) => {
  const { data, netWorth } = useFinance();
  const totalAssets = data.customAssets.reduce((a, b) => a + b.value, 0);
  const cashPerc = ((data.cash / netWorth) * 100).toFixed(1);
  const assetPerc = ((totalAssets / netWorth) * 100).toFixed(1);

  const cardStyle = { backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '2rem', padding: '24px', textAlign: 'left', width: '100%', boxSizing: 'border-box' };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingTop: '20px' }}>
        <button onClick={back} style={{ backgroundColor: '#1e293b', border: 'none', color: '#60a5fa', width: '40px', height: '40px', borderRadius: '50%' }}>←</button>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic', margin: 0, textTransform: 'uppercase' }}>{t('wealthStats')}</h2>
          <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#3b82f6', margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>{t('consolidatedData')}</p>
        </div>
      </div>

      <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e293b 0%, #0d1117 100%)', marginBottom: '32px', textAlign: 'center' }}>
        <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px' }}>{t('totalNetWorth')}</p>
        <h3 style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>Rp {netWorth.toLocaleString()}</h3>
      </div>

      <div style={cardStyle} className="mb-8">
        <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px' }}>{t('portfolioAllocation')}</p>
        <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '20px', border: '1px solid #30363d' }}>
          <div style={{ width: `${cashPerc}%`, backgroundColor: '#3b82f6' }}></div>
          <div style={{ width: `${assetPerc}%`, backgroundColor: '#a855f7' }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '10px', fontWeight: '900' }}>{t('cash')} {cashPerc}%</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#a855f7', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '10px', fontWeight: '900' }}>{t('asset')} {assetPerc}%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WealthStats;