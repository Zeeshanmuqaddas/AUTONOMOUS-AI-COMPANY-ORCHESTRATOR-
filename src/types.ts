export interface StartupPlan {
  idea: string;
  business_strategy: string;
  product_architecture: string;
  code_plan: string;
  marketing_strategy: string;
  pricing_model: string;
  growth_strategy: string;
  monetization: string;
  final_summary: string;
  tool_actions?: {
    github?: Record<string, any>;
    vercel?: Record<string, any>;
    stripe?: Record<string, any>;
  };
}
