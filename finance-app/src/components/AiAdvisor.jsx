import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
// Inisialisasi di luar komponen agar Neural Core stabil
const genAI = new GoogleGenerativeAI(API_KEY);

const AiAdvisor = ({ data, back }) => {
  const [aiAdvice, setAiAdvice] = useState("Analyzing financial data...");
  const [loading, setLoading] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isConsulting, setIsConsulting] = useState(false);

  // Pakai string model yang lu bilang berhasil (2.5)
  const MODEL_NAME = "gemini-2.5-pro"; // Ganti ke "gemini-2.0-flash-exp" atau string 2.5 yang lu maksud jika berbeda

  const totalAssets = data?.customAssets?.reduce((a, b) => a + b.value, 0) || 0;
  const netWorth = (data?.cash || 0) + totalAssets;
  const cashRatio = netWorth > 0 ? ((data?.cash || 0) / netWorth) * 100 : 0;

  // 1. Fungsi Diagnosa Otomatis (Yang Berhasil)
  const fetchAiAdvice = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ 
        model: MODEL_NAME,
        systemInstruction: "You are Neural Engine. Elite, blunt Financial AI. 1-2 sentences max."
      });

      const prompt = `Anthony's Data: Cash Rp${data.cash}, Assets Rp${totalAssets}, Ratio ${cashRatio.toFixed(1)}%. Give a quick professional diagnosis.`;
      
      const result = await model.generateContent(prompt);
      setAiAdvice(result.response.text());
    } catch (error) {
      setAiAdvice(`Diag Error: ${error.message}`); 
    } finally {
      setLoading(false);
    }
  };

  // 2. Fungsi Tanya Langsung (FIXED)
  const handleConsultation = async () => {
    if (!chatInput) return;
    try {
      setIsConsulting(true);
      // Kita panggil model langsung dari genAI yang sudah di-init di atas
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      
      const prompt = `
        Context Keuangan Anthony: Cash Rp${data.cash}, Total Aset Rp${totalAssets}.
        Pertanyaan: "${chatInput}"
        Jawab dengan singkat, logis, dan gaya 'bro-finance' profesional.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setChatResponse(response.text());
    } catch (error) {
      // Menampilkan error asli biar kita tahu kalau masih gagal
      console.error("Neural Link Error:", error);
      setChatResponse(`Neural Link Error: ${error.message}`); 
    } finally {
      setIsConsulting(false);
    }
  };

  useEffect(() => {
    if (data && API_KEY) fetchAiAdvice();
  }, [data]);

  // UI Styles (Tetap sama)
  const cardStyle = { backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '2rem', padding: '24px', textAlign: 'left', width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ backgroundColor: '#0a0f14', minHeight: '100vh', width: '100%', color: 'white', padding: '24px', boxSizing: 'border-box', textAlign: 'left' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <button onClick={back} style={{ backgroundColor: '#1e293b', border: 'none', color: '#60a5fa', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>←</button>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>NEURAL.CORE</h2>
            <p style={{ fontSize: '8px', color: '#3b82f6', letterSpacing: '2px', margin: 0 }}>V2.5_ACTIVE</p>
          </div>
        </div>

        {/* Diagnosis Card */}
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e293b 0%, #0d1117 100%)', marginBottom: '20px' }}>
          <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Current Diagnosis</p>
          <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#c9d1d9', fontStyle: 'italic', margin: 0 }}>
            "{aiAdvice}"
          </p>
        </div>

        {/* Consultation Card */}
        <div style={{ ...cardStyle, marginBottom: '20px' }}>
          <p style={{ fontSize: '8px', fontWeight: '900', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Ask Neural Engine</p>
          <textarea 
            placeholder="Contoh: Aman nggak kalau gue beli motor bulan ini?"
            style={{ width: '100%', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '12px', padding: '12px', fontSize: '12px', outline: 'none', minHeight: '60px', boxSizing: 'border-box' }}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button 
            onClick={handleConsultation}
            disabled={isConsulting}
            style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', padding: '12px', marginTop: '12px', fontWeight: '900', fontSize: '10px', cursor: 'pointer' }}
          >
            {isConsulting ? "SYNCHRONIZING..." : "EXECUTE CONSULTATION →"}
          </button>
          
          {chatResponse && (
            <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#0d1117', borderRadius: '12px', borderLeft: '3px solid #3b82f6' }}>
              <p style={{ fontSize: '12px', margin: 0, color: '#e2e8f0', fontStyle: 'italic' }}>{chatResponse}</p>
            </div>
          )}
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '9px', fontWeight: '900', color: '#8b949e' }}>LIQUIDITY RATIO</span>
            <span style={{ fontSize: '10px', fontWeight: '900' }}>{cashRatio.toFixed(1)}%</span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: '#0d1117', borderRadius: '2px' }}>
            <div style={{ width: `${Math.min(cashRatio, 100)}%`, height: '100%', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiAdvisor;