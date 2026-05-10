import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { t } from '../utils/i18n';
import { AreaChart, Area, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

const DashboardDetail = ({ back }) => {
  const { data } = useFinance();
  const lastUpdate = data.transactions.length > 0 ? data.transactions[0].date : "28/03/2026";

  // Calculate historical balance for the chart
  let currentBalance = data.cash;
  const chartData = [{ name: 'Now', balance: currentBalance }];
  
  for (let i = 0; i < data.transactions.length; i++) {
    const trx = data.transactions[i];
    if (trx.type === 'Masuk') {
      currentBalance -= trx.amount;
    } else {
      currentBalance += trx.amount;
    }
    // Keep it short for the chart label
    const shortDate = trx.date.split('/').slice(0, 2).join('/');
    chartData.unshift({ name: shortDate, balance: currentBalance });
  }

  // Style sakti
  const cardStyle = {
    backgroundColor: '#161b22',
    border: '1px solid #30363d',
    borderRadius: '2rem',
    padding: '24px',
    textAlign: 'left',
    width: '100%',
    boxSizing: 'border-box',
    display: 'block'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#0d1117', border: '1px solid #30363d', padding: '10px', borderRadius: '8px' }}>
          <p style={{ color: '#8b949e', fontSize: '10px', margin: '0 0 4px 0' }}>{payload[0].payload.name}</p>
          <p style={{ color: '#3b82f6', fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Rp {payload[0].value.toLocaleString('id-ID')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* 1. HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingTop: '20px' }}>
          <button 
            onClick={back} 
            style={{ backgroundColor: '#1e293b', border: 'none', color: '#60a5fa', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifySelf: 'center', paddingLeft: '12px' }}
          >
            ←
          </button>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic', margin: 0, textTransform: 'uppercase', letterSpacing: '-1px' }}>{t('globalOverview')}</h2>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#3b82f6', margin: 0, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>{t('secureTerminal')}</p>
          </div>
        </div>

        {/* 2. MAIN CARD */}
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e293b 0%, #0d1117 100%)', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
          <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px', position: 'relative', zIndex: 2 }}>{t('currentCashBalance')}</p>
          <h3 style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'italic', margin: 0, letterSpacing: '-1px', position: 'relative', zIndex: 2 }}>
            Rp {data.cash.toLocaleString('id-ID')}
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px', position: 'relative', zIndex: 2 }}>
             <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', display: 'block', textTransform: 'uppercase', letterSpacing: '2px' }}>{t('accountHolder')}</span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', fontStyle: 'italic', color: '#c9d1d9' }}>LASER CORP</span>
             </div>
             <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', display: 'block', textTransform: 'uppercase', letterSpacing: '2px' }}>{t('lastActivity')}</span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', fontStyle: 'italic', color: '#3b82f6' }}>{lastUpdate}</span>
             </div>
          </div>
        </div>

        {/* 2.5 GRAPHIC CHART */}
        <div style={{ ...cardStyle, marginBottom: '24px', padding: '16px 16px 24px 16px', height: '180px' }}>
          <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '16px', marginLeft: '8px' }}>Cash Flow Trend</p>
          <div style={{ width: '100%', height: '100px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip content={<CustomTooltip />} />
                <YAxis domain={['auto', 'auto']} hide />
                <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. DIAGNOSTICS */}
        <div style={{ textAlign: 'left', marginBottom: '12px' }}>
           <p style={{ fontSize: '9px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 16px 8px', fontStyle: 'italic' }}>{t('cashDiagnostics')}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ ...cardStyle, flex: 1, padding: '20px' }}>
             <span style={{ fontSize: '7px', fontWeight: '900', color: '#3b82f6', display: 'block', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>{t('status')}</span>
             <span style={{ fontSize: '12px', fontWeight: '900', fontStyle: 'italic' }}>{t('operational')}</span>
          </div>
          <div style={{ ...cardStyle, flex: 1, padding: '20px' }}>
             <span style={{ fontSize: '7px', fontWeight: '900', color: '#3b82f6', display: 'block', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>{t('records')}</span>
             <span style={{ fontSize: '12px', fontWeight: '900', fontStyle: 'italic' }}>{data.transactions.length} {t('logs')}</span>
          </div>
        </div>

        {/* 4. ACTIVITY LOG */}
        <div style={{ ...cardStyle, padding: '28px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', margin: 0 }}>{t('activeStream')}</p>
              <div style={{ width: '6px', height: '6px', backgroundColor: '#238636', borderRadius: '50%' }}></div>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             {data.transactions.slice(0, 3).map(t_item => (
               <div key={t_item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '13px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>{t_item.desc}</p>
                    <p style={{ fontSize: '8px', color: '#484f58', margin: '4px 0 0 0' }}>{t_item.date}</p>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '900', fontStyle: 'italic', color: t_item.type === 'Masuk' ? '#3fb950' : 'white' }}>
                    {t_item.type === 'Masuk' ? '+' : '-'} {t_item.amount.toLocaleString()}
                  </span>
               </div>
             ))}
           </div>
        </div>

    </>
  );
};

export default DashboardDetail;