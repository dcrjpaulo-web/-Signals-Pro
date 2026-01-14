
export enum SignalType {
  BULLISH = 'BULLISH',
  BEARISH = 'BEARISH',
  NEUTRAL = 'NEUTRAL',
  ALERT = 'ALERT'
}

export interface Signal {
  id: string;
  type: SignalType;
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
  tags: string[];
  rationale: string;
}

export interface MarketData {
  time: string;
  value: number;
  volume: number;
}

export interface AnalysisResult {
  summary: string;
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  signals: Signal[];
}
