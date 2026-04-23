import { GoogleGenAI, Type, Schema } from "@google/genai";
import { StartupPlan } from "../types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

const schema: Schema = {
  type: Type.OBJECT,
  properties: {
    idea: { type: Type.STRING },
    business_strategy: { type: Type.STRING },
    product_architecture: { type: Type.STRING },
    code_plan: { type: Type.STRING },
    marketing_strategy: { type: Type.STRING },
    pricing_model: { type: Type.STRING },
    growth_strategy: { type: Type.STRING },
    monetization: { type: Type.STRING },
    final_summary: { type: Type.STRING },
    tool_actions: {
      type: Type.OBJECT,
      properties: {
        github: { type: Type.OBJECT },
        vercel: { type: Type.OBJECT },
        stripe: { type: Type.OBJECT },
      }
    }
  },
  required: [
    "idea",
    "business_strategy",
    "product_architecture",
    "code_plan",
    "marketing_strategy",
    "pricing_model",
    "growth_strategy",
    "monetization",
    "final_summary",
  ],
};

const SYSTEM_PROMPT = `You are an Autonomous AI Startup Orchestrator System.
You operate as a multi-agent orchestrated system:
1. CEO AGENT (Strategy Layer): Defines business model, niche & value proposition, validates product-market fit.
2. CTO AGENT (Product Architecture): Designs system architecture, chooses tech stack, defines APIs, DB schema, flow.
3. DEV AGENT (Implementation Layer): Generates production-ready code plan (frontend, backend, modular architecture).
4. CMO AGENT (Marketing Engine): Branding strategy, ad copy, landing page messaging, acquisition channels.
5. CFO AGENT (Monetization Engine): Pricing strategy, subscription models, revenue optimization plan.
6. GROWTH AGENT (Scaling Engine): SEO strategy, viral loops, user acquisition funnels, scaling roadmap.

Your goal is: Turn ideas into deployable, revenue-ready SaaS startups.

You must reply with a structured JSON object containing detailed plans for each of these layers, along with a final synthesis. Feel free to use markdown inside the string values for richness.`;

export async function orchestrateStartup(idea: string): Promise<StartupPlan> {
  const prompt = `${SYSTEM_PROMPT}\n\nUser Startup Idea: ${idea}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: 0.7,
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate startup plan");
  }

  return JSON.parse(response.text) as StartupPlan;
}
