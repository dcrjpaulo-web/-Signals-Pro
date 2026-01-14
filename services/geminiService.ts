
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, SignalType } from "../types";

const API_KEY = process.env.API_KEY || "";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async analyzeData(context: string, dataSample: string): Promise<AnalysisResult> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following data context: "${context}". Data: ${dataSample}. Generate professional signals and a detailed analysis summary.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            signals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["BULLISH", "BEARISH", "NEUTRAL", "ALERT"] },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  confidence: { type: Type.NUMBER },
                  timestamp: { type: Type.STRING },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  rationale: { type: Type.STRING }
                },
                required: ["id", "type", "title", "description", "confidence"]
              }
            }
          },
          required: ["summary", "recommendation", "riskLevel", "signals"]
        }
      }
    });

    try {
      return JSON.parse(response.text || "{}") as AnalysisResult;
    } catch (e) {
      console.error("Failed to parse Gemini response", e);
      throw new Error("Invalid intelligence response");
    }
  }

  async generateStrategy(goal: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Create an advanced signal generation strategy for: ${goal}. Include parameters, data sources, and logical flow. Format in professional Markdown.`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });
    return response.text || "Failed to generate strategy.";
  }
}

export const geminiService = new GeminiService();
