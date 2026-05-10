# Laser.Vault 💎

![Version](https://img.shields.io/badge/Version-3.1-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-latest-646CFF.svg?logo=vite)

Laser.Vault (formerly Anthony.Vault) is a modern, dark-themed personal finance management web application built with React. It provides an intuitive, hacker-style "Secure Terminal" aesthetic to track cash flows, manage asset portfolios, and consult an integrated AI financial advisor powered by Google's Gemini.

## ✨ Features

- **Global Overview Dashboard**: Get a quick snapshot of your total cash balance, recent activities, and visualize your historical cash flow trend through an interactive dynamic chart (`Recharts`).
- **Asset Vault**: Encrypted-style storage view to register and monitor the value of your non-liquid custom assets (e.g., Gold, Property, Stocks).
- **Neural Core (AI Advisor)**: Integrated with `@google/generative-ai` (Gemini-2.5 Pro) to provide quick, blunt, and professional financial diagnostics based on your exact liquidity ratio and asset distribution.
- **Cashflow Log**: Awareness-mode transaction tracking. Record incomes and expenses easily while monitoring your real-time "Monthly Burn Rate".
- **Wealth Statistics**: A consolidated view showing your portfolio allocation (Cash vs. Assets) visually.
- **Bilingual Support (i18n)**: One-click toggle between English and Indonesian interfaces.
- **Local Persistence**: Zero backend required! Your financial data is saved securely in your browser's `localStorage`.

## 📂 Project Structure

A clean, modular React architecture:

```text
src/
├── components/
│   └── ui/              # Reusable UI components (Header.jsx, Footer.jsx)
├── context/
│   └── FinanceContext.jsx # Global State Management & Persistence logic
├── layouts/
│   └── MainLayout.jsx   # Consistent app wrapper and styling scaffolds
├── pages/               # Main application views
│   ├── AiAdvisor.jsx
│   ├── Dashboard.jsx
│   ├── Log.jsx
│   ├── Menu.jsx
│   ├── Stats.jsx
│   └── Vault.jsx
├── utils/
│   └── i18n.js          # Localization dictionary (EN/ID)
├── App.jsx              # Application router and entry point
├── main.jsx             # React DOM renderer
└── index.css            # Global utility styles
```

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if using git) or open the project folder.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (alongside `package.json`) and add your Google Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
5. **Open your browser**: Navigate to the URL provided by Vite (usually `http://localhost:5173`).

## 🛠️ Tech Stack
- **Framework**: React 18 (Vite)
- **Styling**: Vanilla CSS (Inline styling combined with global utility classes)
- **State Management**: React Context API
- **Charts**: Recharts
- **AI Integration**: Google Generative AI (`gemini-2.5-pro`)

## 💡 Usage Notes
- Data is entirely localized to your browser. Clearing your browser data will clear your transaction history unless backed up manually.
- The `Neural Core` AI feature requires an active internet connection to communicate with the Gemini API.

---
*Engineer: Laser // SRIN v3.1*
