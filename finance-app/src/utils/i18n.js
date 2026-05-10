export const translations = {
  en: {
    terminalActive: 'Terminal Active',
    overview: 'Overview',
    assets: 'Assets',
    portfolio: 'Portfolio',
    aiReady: 'AI Ready',
    advisor: 'Advisor',
    history: 'History',
    records: 'Records',
    wealthAnalysis: 'Wealth Analysis',
    statisticsDashboard: 'Statistics Dashboard',
    engineer: 'Engineer',
    
    // Dashboard
    globalOverview: 'Global.Overview',
    secureTerminal: 'Secure Terminal v3.0',
    currentCashBalance: 'Current Cash Balance',
    accountHolder: 'Account Holder',
    lastActivity: 'Last Activity',
    cashDiagnostics: 'Cash Diagnostics',
    status: 'Status',
    operational: 'OPERATIONAL',
    logs: 'LOGS',
    activeStream: 'Active Stream',
    
    // Vault
    assetVault: 'Asset.Vault',
    encryptedStorage: 'Encrypted Storage',
    registerNewAsset: 'Register New Asset',
    assetNamePlaceholder: 'Asset Name (e.g. Gold)',
    valuePlaceholder: 'Value (IDR)',
    secureAssetBtn: 'Secure Asset 🔒',
    portfolioBreakdown: 'Portfolio Breakdown',
    identityVerified: 'Identity Verified',
    
    // Stats
    wealthStats: 'Wealth.Stats',
    consolidatedData: 'Consolidated Data',
    totalNetWorth: 'Total Net Worth',
    portfolioAllocation: 'Portfolio Allocation',
    cash: 'CASH',
    asset: 'ASSET',
    
    // Log
    cashflowLog: 'Cashflow.Log',
    awarenessMode: 'Awareness Mode',
    monthlyBurnRate: 'Monthly Burn Rate 🚨',
    burnRateDesc: 'Money you have spent this month, Laser.',
    recordActivity: 'Record Activity',
    descPlaceholder: 'Description',
    amountPlaceholder: 'Amount (IDR)',
    incomeBtn: 'INCOME +',
    expenseBtn: 'EXPENSE -',
    globalTransactionStream: 'Global Transaction Stream',
    
    // AI
    currentDiagnosis: 'Current Diagnosis',
    askNeuralEngine: 'Ask Neural Engine',
    aiPlaceholder: 'Example: Is it safe to buy a motorcycle this month?',
    syncing: 'SYNCHRONIZING...',
    executeConsultation: 'EXECUTE CONSULTATION →',
    liquidityRatio: 'LIQUIDITY RATIO'
  },
  id: {
    terminalActive: 'Terminal Aktif',
    overview: 'Ringkasan',
    assets: 'Aset',
    portfolio: 'Portofolio',
    aiReady: 'AI Siap',
    advisor: 'Penasihat',
    history: 'Riwayat',
    records: 'Catatan',
    wealthAnalysis: 'Analisis Kekayaan',
    statisticsDashboard: 'Dasbor Statistik',
    engineer: 'Insinyur',
    
    // Dashboard
    globalOverview: 'Ringkasan.Global',
    secureTerminal: 'Terminal Aman v3.0',
    currentCashBalance: 'Saldo Kas Saat Ini',
    accountHolder: 'Pemilik Akun',
    lastActivity: 'Aktivitas Terakhir',
    cashDiagnostics: 'Diagnostik Kas',
    status: 'Status',
    operational: 'OPERASIONAL',
    logs: 'CATATAN',
    activeStream: 'Aliran Aktif',
    
    // Vault
    assetVault: 'Brankas.Aset',
    encryptedStorage: 'Penyimpanan Terenkripsi',
    registerNewAsset: 'Daftarkan Aset Baru',
    assetNamePlaceholder: 'Nama Aset (mis. Emas)',
    valuePlaceholder: 'Nilai (IDR)',
    secureAssetBtn: 'Amankan Aset 🔒',
    portfolioBreakdown: 'Rincian Portofolio',
    identityVerified: 'Identitas Terverifikasi',
    
    // Stats
    wealthStats: 'Statistik.Kekayaan',
    consolidatedData: 'Data Konsolidasi',
    totalNetWorth: 'Total Kekayaan Bersih',
    portfolioAllocation: 'Alokasi Portofolio',
    cash: 'KAS',
    asset: 'ASET',
    
    // Log
    cashflowLog: 'Catatan.ArusKas',
    awarenessMode: 'Mode Kesadaran',
    monthlyBurnRate: 'Pengeluaran Bulan Ini 🚨',
    burnRateDesc: 'Duit yang udah lu abisin bulan ini, Laser.',
    recordActivity: 'Catat Aktivitas',
    descPlaceholder: 'Deskripsi',
    amountPlaceholder: 'Jumlah (IDR)',
    incomeBtn: 'PEMASUKAN +',
    expenseBtn: 'PENGELUARAN -',
    globalTransactionStream: 'Aliran Transaksi Global',
    
    // AI
    currentDiagnosis: 'Diagnosis Saat Ini',
    askNeuralEngine: 'Tanya Neural Engine',
    aiPlaceholder: 'Contoh: Aman nggak kalau gue beli motor bulan ini?',
    syncing: 'SINKRONISASI...',
    executeConsultation: 'JALANKAN KONSULTASI →',
    liquidityRatio: 'RASIO LIKUIDITAS'
  }
};

// Default language
let currentLang = 'id';

export const setLanguage = (lang) => {
  currentLang = lang;
};

export const getLanguage = () => currentLang;

export const t = (key) => {
  return translations[currentLang][key] || key;
};
