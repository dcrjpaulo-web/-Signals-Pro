
import React from 'react';
import { Signal, SignalType } from '../types';

const SignalCard: React.FC<{ signal: Signal }> = ({ signal }) => {
  const getColors = (type: SignalType) => {
    switch (type) {
      case SignalType.BULLISH: return 'text-green-400 bg-green-400/10 border-green-400/20 shadow-green-400/5';
      case SignalType.BEARISH: return 'text-red-400 bg-red-400/10 border-red-400/20 shadow-red-400/5';
      case SignalType.ALERT: return 'text-amber-400 bg-amber-400/10 border-amber-400/20 shadow-amber-400/5';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20 shadow-blue-400/5';
    }
  };

  const getIcon = (type: SignalType) => {
    switch (type) {
      case SignalType.BULLISH: return 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6';
      case SignalType.BEARISH: return 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6';
      case SignalType.ALERT: return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
      default: return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  };

  return (
    <div className={`p-5 glass rounded-2xl border transition-all hover:scale-[1.01] hover:-translate-y-1 ${getColors(signal.type)}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-black/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={getIcon(signal.type)} />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{signal.title}</h3>
            <p className="text-xs opacity-60 uppercase tracking-widest">{signal.type}</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-black/20 text-sm font-bold">
          {Math.round(signal.confidence * 100)}% Confidence
        </div>
      </div>
      
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        {signal.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {signal.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded bg-black/10 border border-white/5 text-[10px] uppercase font-bold tracking-tighter">
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="text-xs text-gray-500 mono">{signal.timestamp}</span>
        <button className="text-xs font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
          Deep Analysis <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
};

export default SignalCard;
