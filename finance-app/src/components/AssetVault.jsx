import React, { useState } from 'react';

const AssetVault = ({ data, setData, back }) => {
  const [name, setName] = useState('');
  const [val, setVal] = useState('');

  const addAsset = () => {
    if (!name || !val) return;
    const newAsset = { id: Date.now(), name, value: parseInt(val) };
    setData({ ...data, customAssets: [...data.customAssets, newAsset] });
    setName(''); setVal('');
  };

  const deleteAsset = (id) => {
    setData({ ...data, customAssets: data.customAssets.filter(a => a.id !== id) });
  };

  const cardStyle = { backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '2rem', padding: '24px', textAlign: 'left', width: '100%', boxSizing: 'border-box' };
  const inputStyle = { backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d', padding: '15px', borderRadius: '12px', width: '100%', outline: 'none', marginBottom: '15px', boxSizing: 'border-box' };

  return (
    <div style={{ backgroundColor: '#0a0f14', minHeight: '100vh', width: '100%', color: 'white', padding: '24px', boxSizing: 'border-box', textAlign: 'left' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingTop: '20px' }}>
          <button onClick={back} style={{ backgroundColor: '#1e293b', border: 'none', color: '#60a5fa', width: '40px', height: '40px', borderRadius: '50%' }}>←</button>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic', margin: 0, textTransform: 'uppercase' }}>Asset.Vault</h2>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#3b82f6', margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>Encrypted Storage</p>
          </div>
        </div>

        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e293b 0%, #0d1117 100%)', marginBottom: '32px' }}>
          <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px' }}>Register New Asset</p>
          <input type="text" placeholder="Asset Name (e.g. Gold)" style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" placeholder="Value (IDR)" style={{...inputStyle, color: '#60a5fa', fontWeight: '900'}} value={val} onChange={(e) => setVal(e.target.value)} />
          <button onClick={addAsset} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '12px', width: '100%', padding: '15px', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic' }}>Secure Asset 🔒</button>
        </div>

        <p style={{ fontSize: '9px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 15px 8px' }}>Portfolio Breakdown</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.customAssets.map(a => (
            <div key={a.id} style={cardStyle} className="flex justify-between items-center">
              <div style={{flex: 1}}>
                <p style={{ fontSize: '7px', fontWeight: '900', color: '#3b82f6', textTransform: 'uppercase', margin: 0 }}>Identity Verified</p>
                <p style={{ fontSize: '14px', fontWeight: '900', fontStyle: 'italic', margin: '4px 0' }}>{a.name}</p>
                <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#8b949e', margin: 0 }}>IDR {a.value.toLocaleString()}</p>
              </div>
              <button onClick={() => deleteAsset(a.id)} style={{ backgroundColor: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', opacity: 0.5 }}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetVault;