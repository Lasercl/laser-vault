import React from 'react';

const DashboardDetail = ({ data, back }) => {
  const lastUpdate = data.transactions.length > 0 ? data.transactions[0].date : "28/03/2026";

  // Style sakti buat ngelawan index.css lu
  const cardStyle = {
    backgroundColor: '#161b22',
    border: '1px solid #30363d',
    borderRadius: '2rem',
    padding: '24px',
    textAlign: 'left', // Paksa rata kiri
    width: '100%',
    boxSizing: 'border-box',
    display: 'block'
  };

  return (
    <div style={{ backgroundColor: '#0a0f14', minHeight: '100vh', width: '100%', color: 'white', padding: '24px', boxSizing: 'border-box', textAlign: 'left' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        {/* 1. HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingTop: '20px' }}>
          <button 
            onClick={back} 
            style={{ backgroundColor: '#1e293b', border: 'none', color: '#60a5fa', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifySelf: 'center', paddingLeft: '12px' }}
          >
            ←
          </button>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic', margin: 0, textTransform: 'uppercase', letterSpacing: '-1px' }}>Global.Overview</h2>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#3b82f6', margin: 0, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>Secure Terminal v3.0</p>
          </div>
        </div>

        {/* 2. MAIN CARD */}
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e293b 0%, #0d1117 100%)', marginBottom: '32px' }}>
          <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>Current Cash Balance</p>
          <h3 style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'italic', margin: 0, letterSpacing: '-1px' }}>
            Rp {data.cash.toLocaleString('id-ID')}
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px' }}>
             <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', display: 'block', textTransform: 'uppercase', letterSpacing: '2px' }}>Account Holder</span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', fontStyle: 'italic', color: '#c9d1d9' }}>ANTHONY LASER</span>
             </div>
             <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '7px', fontWeight: '900', color: '#484f58', display: 'block', textTransform: 'uppercase', letterSpacing: '2px' }}>Last Activity</span>
                <span style={{ fontSize: '11px', fontWeight: 'bold', fontStyle: 'italic', color: '#3b82f6' }}>{lastUpdate}</span>
             </div>
          </div>
        </div>

        {/* 3. DIAGNOSTICS */}
        <div style={{ textAlign: 'left', marginBottom: '12px' }}>
           <p style={{ fontSize: '9px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 16px 8px', fontStyle: 'italic' }}>Cash Diagnostics</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ ...cardStyle, flex: 1, padding: '20px' }}>
             <span style={{ fontSize: '7px', fontWeight: '900', color: '#3b82f6', display: 'block', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Status</span>
             <span style={{ fontSize: '12px', fontWeight: '900', fontStyle: 'italic' }}>OPERATIONAL</span>
          </div>
          <div style={{ ...cardStyle, flex: 1, padding: '20px' }}>
             <span style={{ fontSize: '7px', fontWeight: '900', color: '#3b82f6', display: 'block', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Records</span>
             <span style={{ fontSize: '12px', fontWeight: '900', fontStyle: 'italic' }}>{data.transactions.length} LOGS</span>
          </div>
        </div>

        {/* 4. ACTIVITY LOG */}
        <div style={{ ...cardStyle, padding: '28px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', margin: 0 }}>Active Stream</p>
              <div style={{ width: '6px', height: '6px', backgroundColor: '#238636', borderRadius: '50%' }}></div>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             {data.transactions.slice(0, 3).map(t => (
               <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '13px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>{t.desc}</p>
                    <p style={{ fontSize: '8px', color: '#484f58', margin: '4px 0 0 0' }}>{t.date}</p>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '900', fontStyle: 'italic', color: t.type === 'Masuk' ? '#3fb950' : 'white' }}>
                    {t.type === 'Masuk' ? '+' : '-'} {t.amount.toLocaleString()}
                  </span>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardDetail;