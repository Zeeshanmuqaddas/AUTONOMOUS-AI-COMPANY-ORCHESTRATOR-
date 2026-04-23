import React from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { LucideIcon } from 'lucide-react';

interface AgentCardProps {
  title: string;
  agentRole: string;
  icon: LucideIcon;
  content: string;
  delay?: number;
}

export function AgentCard({ title, agentRole, icon: Icon, content, delay = 0 }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full"
    >
      <div className="bg-gray-50 border-b border-gray-200 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700">
            <Icon size={18} />
          </div>
          <div>
            <h3 className="font-semibold tracking-tight text-gray-900">{title}</h3>
            <p className="text-[11px] font-mono font-medium text-gray-500 uppercase tracking-widest">{agentRole}</p>
          </div>
        </div>
      </div>
      <div className="p-5 flex-grow overflow-y-auto max-h-[300px] text-sm text-gray-700">
        <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-600">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
