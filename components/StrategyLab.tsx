
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { AnalysisResult, Signal } from '../types';
import SignalCard from './SignalCard';

const StrategyLab: React.FC = () => {
  const [context, setContext] = useState('');
  const [rawData, setRawData] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleRunAnalysis = async () => {
    if (!context || !rawData) return;
    setLoading(true);
    try {
      const result = await geminiService.analyzeData(context, rawData);
      setAnalysis(result);
    } catch (err) {
      alert("Analysis failed. Please check your API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Strategy Lab</h1>
        <p className="text-gray-400">Design custom intelligence layers by defining context and providing sample data.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-widest text-blue-400">Context / Industry</label>
              <input 
                value={context}
                onChange={e => setContext(e.target.value)}
                placeholder="e.g., Tech Equity Markets, Real Estate Trends, Crypto Sentiment..." 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-widest text-blue-400">Raw Data Input</label>
              <textarea 
                value={rawData}
                onChange={e => setRawData(e.target.value)}
                rows={8}
                placeholder="Paste JSON, CSV, or Text data for Gemini to analyze..." 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors mono text-sm"
              />
            </div>
            <button 
              onClick={handleRunAnalysis}
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Intelligence...
                </>
              ) : 'Generate Signal Suite'}
            </button>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quick Tips
            </h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Be specific about the outcomes you want (e.g., "Find high-risk anomalies").</li>
              <li>• Gemini 3 handles up to 100k tokens of data effortlessly.</li>
              <li>• Use the 'Signal Feed' to track performance over time.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          {analysis ? (
            <div className="space-y-6">
              <div className={`p-6 glass rounded-2xl border-l-4 ${analysis.riskLevel === 'High' ? 'border-red-500' : 'border-green-500'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Analysis Summary</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${analysis.riskLevel === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    Risk: {analysis.riskLevel}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">{analysis.summary}</p>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                  <p className="text-sm italic text-gray-400">"{analysis.recommendation}"</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                  Identified Signals ({analysis.signals.length})
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {analysis.signals.map(signal => (
                    <SignalCard key={signal.id} signal={signal} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-center p-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.674a1 1 0 00.922-.617l2.108-4.742A1 1 0 0016.446 10H13V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-400">Ready for Analysis</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Input your context and data to see the magic of GenSignals Intelligence.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default StrategyLab;
