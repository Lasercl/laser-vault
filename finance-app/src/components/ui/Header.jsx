import React from 'react';
import { t } from '../../utils/i18n';
import { useFinance } from '../../context/FinanceContext';

const Header = () => {
  const { language, setLanguage } = useFinance();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <header style={{ paddingTop: '40px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: '900', fontStyle: 'italic', margin: 0, textTransform: 'uppercase', letterSpacing: '-1.5px' }}>
          Laser<span style={{color: '#3b82f6'}}>.</span>Vault
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
          <div style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></div>
          <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#484f58', textTransform: 'uppercase', letterSpacing: '3px', margin: 0 }}>{t('terminalActive')}</p>
        </div>
      </div>
      <button 
        onClick={toggleLanguage}
        style={{ 
          backgroundColor: '#161b22', 
          border: '1px solid #30363d', 
          color: '#8b949e', 
          padding: '4px 8px', 
          borderRadius: '8px',
          fontSize: '10px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {language.toUpperCase()}
      </button>
    </header>
  );
};

export default Header;
