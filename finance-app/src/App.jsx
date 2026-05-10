import React, { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import MainLayout from './layouts/MainLayout';
import Menu from './pages/Menu';
import DashboardDetail from './pages/Dashboard';
import AssetVault from './pages/Vault';
import AiAdvisor from './pages/AiAdvisor';
import WealthStats from './pages/Stats';
import TransactionLog from './pages/Log';

const AppContent = () => {
  const [view, setView] = useState('menu');

  const renderView = () => {
    switch(view) {
      case 'dashboard': return <DashboardDetail back={() => setView('menu')} />;
      case 'vault': return <AssetVault back={() => setView('menu')} />;
      case 'ai': return <AiAdvisor back={() => setView('menu')} />;
      case 'stats': return <WealthStats back={() => setView('menu')} />;
      case 'log': return <TransactionLog back={() => setView('menu')} />;
      case 'menu':
      default:
        return <Menu setView={setView} />;
    }
  };

  return (
    <MainLayout>
      {renderView()}
    </MainLayout>
  );
};

const FinanceApp = () => {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
};

export default FinanceApp;