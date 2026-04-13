import React, { useState } from 'react';

const TransactionLog = ({ data, setData, back }) => {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  // FIXED: Menggunakan '_' untuk variabel yang tidak terpakai agar ESLint tidak error
  const monthlyExpense = data.transactions
    .filter(t => {
      const [_, m, y] = t.date.split('/');
      return parseInt(m) - 1 === currentMonth && parseInt(y) === currentYear && t.type === 'Keluar';
    })
    .reduce((acc, curr) => acc + curr.amount, 0);

  const addTransaction = (type) => {
    if (!desc || !amount) return;
    const newTrans = {
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID'),
      desc,
      amount: parseInt(amount),
      type
    };
    const newCash = type === 'Masuk' ? data.cash + newTrans.amount : data.cash - newTrans.amount;
    setData({ ...data, cash: newCash, transactions: [newTrans, ...data.transactions] });
    setDesc(''); setAmount('');
  };

  const cardStyle = { backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '2rem', padding: '24px', textAlign: 'left', width: '100%', boxSizing: 'border-box' };
  const inputStyle = { backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d', padding: '15px', borderRadius: '12px', width: '100%', outline: 'none', marginBottom: '15px', boxSizing: 'border-box' };

  return (
    <div style={{ backgroundColor: '#0a0f14', minHeight: '100vh', width: '100%', color: 'white', padding: '24px', boxSizing: 'border-box', textAlign: 'left' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingTop: '20px' }}>
          <button onClick={back} style={{ backgroundColor: '#1e293b', border: 'none', color: '#60a5fa', width: '40px', height: '40px', borderRadius: '50%' }}>←</button>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic', margin: 0, textTransform: 'uppercase' }}>Cashflow.Log</h2>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#3b82f6', margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>Awareness Mode</p>
          </div>
        </div>

        {/* MONTHLY AWARENESS METER */}
        <div style={{ ...cardStyle, border: '1px solid #ef444430', marginBottom: '24px', padding: '20px' }}>
           <p style={{ fontSize: '8px', fontWeight: '900', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '8px' }}>Monthly Burn Rate 🚨</p>
           <h3 style={{ fontSize: '20px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>Rp {monthlyExpense.toLocaleString()}</h3>
           <p style={{ fontSize: '9px', color: '#8b949e', marginTop: '4px' }}>Duit yang udah lu abisin bulan ini, Anthony.</p>
        </div>

        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e293b 0%, #0d1117 100%)', marginBottom: '32px' }}>
          <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px' }}>Record Activity</p>
          <input type="text" placeholder="Description" style={inputStyle} value={desc} onChange={(e) => setDesc(e.target.value)} />
          <input type="number" placeholder="Amount (IDR)" style={{...inputStyle, color: '#3fb950', fontWeight: '900'}} value={amount} onChange={(e) => setAmount(e.target.value)} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => addTransaction('Masuk')} style={{ backgroundColor: '#238636', color: 'white', border: 'none', borderRadius: '12px', flex: 1, padding: '15px', fontWeight: '900' }}>INCOME +</button>
            <button onClick={() => addTransaction('Keluar')} style={{ backgroundColor: '#da3633', color: 'white', border: 'none', borderRadius: '12px', flex: 1, padding: '15px', fontWeight: '900' }}>EXPENSE -</button>
          </div>
        </div>

        <p style={{ fontSize: '9px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 15px 8px' }}>Global Transaction Stream</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.transactions.map(t => (
            <div key={t.id} style={cardStyle} className="flex justify-between items-center">
              <div>
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
  );
};

export default TransactionLog;