import React, { createContext, useState, useEffect, useContext } from 'react';
import { setLanguage as setI18nLanguage } from '../utils/i18n';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('laser_vault_v31') || localStorage.getItem('anthony_vault_v31');
    return saved ? JSON.parse(saved) : {
      cash: 25000000,
      customAssets: [
        { id: 1, name: 'Tanah BSD', value: 250000000 },
        { id: 2, name: 'Emas Antam (10g)', value: 12000000 }
      ],
      transactions: [{ id: 1, date: '28/03/2026', desc: 'Gaji SRIN', amount: 15000000, type: 'Masuk' }]
    };
  });

  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('laser_vault_lang') || localStorage.getItem('anthony_vault_lang');
    return savedLang || 'id';
  });

  useEffect(() => {
    localStorage.setItem('laser_vault_v31', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('laser_vault_lang', language);
    setI18nLanguage(language);
  }, [language]);

  const netWorth = data.cash + data.customAssets.reduce((a, b) => a + b.value, 0);

  return (
    <FinanceContext.Provider value={{ data, setData, netWorth, language, setLanguage }}>
      {children}
    </FinanceContext.Provider>
  );
};
