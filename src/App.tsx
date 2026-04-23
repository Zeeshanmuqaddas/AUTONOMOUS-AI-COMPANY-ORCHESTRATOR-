import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Lightbulb, Code, Target, DollarSign, TrendingUp, Briefcase, Rocket, ArrowRight, Loader2, Database } from 'lucide-react';
import { orchestrateStartup } from './services/geminiService';
import { StartupPlan } from './types';
import { AgentCard } from './components/AgentCard';

export default function App() {
  const [idea, setIdea] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [plan, setPlan] = useState<StartupPlan | null>(null);
  const [error, setError] = useState("");

  const handleOrchestrate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setIsProcessing(true);
    setError("");
    setPlan(null);

    try {
      const result = await orchestrateStartup(idea);
      setPlan(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during execution.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-900 text-white p-2 rounded-lg">
              <Terminal size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-gray-900">Autonomous Startup Orchestrator</h1>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest hidden sm:block">Level 2 Multi-Agent Engine</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-gray-500">System Online</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">Initialize New Startup</h2>
            <p className="text-gray-500">Enter your core concept. The multi-agent system will design, architect, and plan your business.</p>
          </motion.div>

          <form onSubmit={handleOrchestrate} className="relative">
            <div className="absolute top-4 left-4 text-gray-400">
              <Lightbulb size={20} />
            </div>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. A marketplace for AI agents that write unit tests for legacy code..."
              className="w-full bg-white border border-gray-300 rounded-2xl py-4 pl-12 pr-32 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm shadow-blue-500/5 transition-all"
              rows={3}
              disabled={isProcessing}
              required
            />
            <div className="absolute bottom-4 right-4 group">
              <button
                type="submit"
                disabled={isProcessing || !idea.trim()}
                className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-md group-hover:-translate-y-0.5 active:translate-y-0"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Executing</span>
                  </>
                ) : (
                  <>
                    <span>Orchestrate</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 border border-red-200 bg-red-50 text-red-700 rounded-xl text-sm flex items-center">
              {error}
            </motion.div>
          )}
        </div>

        {/* Processing State */}
        <AnimatePresence mode="wait">
          {isProcessing && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Terminal size={24} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Agents are working...</h3>
              <div className="flex space-x-2 mt-4 font-mono text-xs text-gray-500">
                <span className="animate-pulse">CEO</span>
                <span>→</span>
                <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>CTO</span>
                <span>→</span>
                <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>CMO</span>
                <span>→</span>
                <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>CFO</span>
              </div>
            </motion.div>
          )}

          {/* Results Dashboard */}
          {!isProcessing && plan && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AgentCard
                  title="Business Strategy"
                  agentRole="CEO Agent"
                  icon={Briefcase}
                  content={plan.business_strategy}
                  delay={0.1}
                />
                <AgentCard
                  title="Product Architecture"
                  agentRole="CTO Agent"
                  icon={Database}
                  content={plan.product_architecture}
                  delay={0.2}
                />
                <AgentCard
                  title="Implementation & Code"
                  agentRole="DEV Agent"
                  icon={Code}
                  content={plan.code_plan}
                  delay={0.3}
                />
                <AgentCard
                  title="Marketing Engine"
                  agentRole="CMO Agent"
                  icon={Target}
                  content={plan.marketing_strategy}
                  delay={0.4}
                />
                <AgentCard
                  title="Pricing & Monetization"
                  agentRole="CFO Agent"
                  icon={DollarSign}
                  content={plan.pricing_model + "\n\n" + plan.monetization}
                  delay={0.5}
                />
                <AgentCard
                  title="Scaling & Growth"
                  agentRole="GROWTH Agent"
                  icon={TrendingUp}
                  content={plan.growth_strategy}
                  delay={0.6}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-900 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between mt-12"
              >
                <div className="flex-1 mb-6 md:mb-0 md:pr-8">
                  <div className="flex items-center space-x-3 mb-4 text-blue-400">
                    <Rocket size={24} />
                    <h2 className="text-xl font-semibold tracking-tight text-white">Final Startup Synthesis</h2>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                    <ReactMarkdown>{plan.final_summary}</ReactMarkdown>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-5 w-full md:w-64 border border-gray-700 font-mono text-xs text-gray-400">
                  <div className="mb-2 uppercase tracking-wider text-[10px] text-gray-500 font-semibold grid grid-cols-2 gap-2">
                    <span>Target:</span> <span className="text-right text-gray-300">SaaS Ready</span>
                    <span>Status:</span> <span className="text-right text-green-400">Architected</span>
                  </div>
                  {plan.tool_actions && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <h4 className="text-[10px] text-gray-500 uppercase font-semibold mb-2">Automated Triggers (Simulated)</h4>
                      <ul className="space-y-2">
                        {Object.keys(plan.tool_actions).map((tool) => (
                          <li key={tool} className="flex items-center justify-between">
                            <span className="capitalize">{tool} Setup</span>
                            <span className="text-green-400">✓ Prepared</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

