import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

const AiAdvisor = ({ data, back }) => {
  const [aiAdvice, setAiAdvice] = useState("Analyzing financial data...");
  const [loading, setLoading] = useState(true);
  
  // Fitur baru: Consultation Mode
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isConsulting, setIsConsulting] = useState(false);

  const totalAssets = data?.customAssets?.reduce((a, b) => a + b.value, 0) || 0;
  const netWorth = (data?.cash || 0) + totalAssets;
  const cashRatio = netWorth > 0 ? ((data?.cash || 0) / netWorth) * 100 : 0;

  useEffect(() => {
    if (data) {
      fetchAiAdvice();
    }
  }, [data]);

  const fetchAiAdvice = async () => {
    if (!API_KEY) {
      setAiAdvice("ERROR: API Key is missing.");
      return;
    }

    try {
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "You are an elite AI Financial Advisor named Neural Engine. Your tone is modern, blunt, and professional. Give advice in 1-2 concise sentences. Reference that user is an engineer if relevant."
      });

      const prompt = `
        User Profile (Anthony):
        - Cash: Rp ${data.cash.toLocaleString()}
        - Assets: Rp ${totalAssets.toLocaleString()}
        - Cash Ratio: ${cashRatio.toFixed(1)}%
        - Net Worth: Rp ${netWorth.toLocaleString()}
        
        Diagnosis data ini. Jika ratio > 70% suruh invest. Jika < 15% suruh hemat. Kasih 1 saran spesifik instrumen lokal Indonesia.
      `;

      const result = await model.generateContent(prompt);
      setAiAdvice(result.response.text());
    } catch (error) {
      setAiAdvice(`API Error: ${error.message}`); 
    } finally {
      setLoading(false);
    }
  };

  // FUNGSI BARU: Tanya AI Langsung
  const handleConsultation = async () => {
    if (!chatInput || !API_KEY) return;
    try {
      setIsConsulting(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `
        Context: Cash Rp ${data.cash}, Assets ${totalAssets}.
        User Question: "${chatInput}"
        Berikan jawaban singkat, logis, dan beri saran 'Yes' atau 'No' yang tegas.
      `;

      const result = await model.generateContent(prompt);
      console.log("AI Consultation Result:", result);
      setChatResponse(result.response.text());
    } catch (error) {
      setChatResponse("Failed to link with Neural Core.");
    } finally {
      setIsConsulting(false);
    }
  };

  const getStatusColor = () => {
    if (cashRatio > 70) return "#facc15"; 
    if (cashRatio < 15) return "#ef4444"; 
    return "#22c55e"; 
  };

  const cardStyle = { backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '2rem', padding: '24px', textAlign: 'left', width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ backgroundColor: '#0a0f14', minHeight: '100vh', width: '100%', color: 'white', padding: '24px', boxSizing: 'border-box', textAlign: 'left' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingTop: '10px' }}>
          <button onClick={back} style={{ backgroundColor: '#1e293b', border: 'none', color: '#60a5fa', width: '40px', height: '40px', borderRadius: '50%' }}>←</button>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>NEURAL.CORE</h2>
            <p style={{ fontSize: '8px', fontWeight: 'bold', color: '#3b82f6', margin: 0, letterSpacing: '2px' }}>AI ADVISOR UNIT</p>
          </div>
        </div>

        {/* 1. AUTO DIAGNOSIS CARD */}
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e293b 0%, #0d1117 100%)', marginBottom: '20px' }}>
          <p style={{ fontSize: '8px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px' }}>
            {loading ? "SCANNING..." : "CURRENT DIAGNOSIS"}
          </p>
          <h3 style={{ color: getStatusColor(), fontSize: '20px', fontWeight: '900', fontStyle: 'italic', margin: '5px 0' }}>
            {loading ? "ANALYZING..." : (cashRatio > 70 ? "EXCESSIVE CASH" : cashRatio < 15 ? "CRITICAL CASH" : "STABLE LIQUIDITY")}
          </h3>
          <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#c9d1d9', fontStyle: 'italic', lineHeight: '1.5', margin: 0 }}>
            "{aiAdvice}"
          </p>
        </div>

        {/* 2. INTERACTIVE CONSULTATION */}
        <div style={{ ...cardStyle, marginBottom: '20px' }}>
          <p style={{ fontSize: '8px', fontWeight: '900', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '15px' }}>Specific Consultation</p>
          <textarea 
            placeholder="Ask anything: 'Should I buy a new phone?'"
            style={{ width: '100%', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '12px', padding: '12px', fontSize: '12px', outline: 'none', minHeight: '60px' }}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button 
            onClick={handleConsultation}
            disabled={isConsulting}
            style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', padding: '12px', marginTop: '12px', fontWeight: '900', fontSize: '10px', cursor: 'pointer' }}
          >
            {isConsulting ? "PROCESSING..." : "EXECUTE CONSULTATION →"}
          </button>
          
          {chatResponse && (
            <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#0d1117', borderRadius: '12px', borderLeft: '3px solid #3b82f6' }}>
              <p style={{ fontSize: '12px', margin: 0, color: '#e2e8f0', fontStyle: 'italic' }}>{chatResponse}</p>
            </div>
          )}
        </div>

        {/* 3. RISK METER */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '9px', fontWeight: '900', color: '#8b949e', textTransform: 'uppercase' }}>Liquidity Risk</span>
            <span style={{ fontSize: '10px', fontWeight: '900', color: getStatusColor() }}>{cashRatio.toFixed(1)}%</span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: '#0d1117', borderRadius: '2px' }}>
            <div style={{ width: `${Math.min(cashRatio, 100)}%`, height: '100%', backgroundColor: getStatusColor(), transition: 'width 1s' }}></div>
          </div>
        </div>

        <button 
          onClick={fetchAiAdvice} 
          style={{ marginTop: '20px', background: 'transparent', border: '1px solid #30363d', color: '#484f58', fontSize: '9px', padding: '10px', borderRadius: '10px', width: '100%', fontWeight: '900' }}
        >
          FORCE SYSTEM REFRESH
        </button>
      </div>
    </div>
  );
};

export default AiAdvisor;