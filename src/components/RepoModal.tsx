import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Activity, GitFork, Globe, Sparkles, Loader2, Key } from 'lucide-react';
import type { DiscoveryItem } from '../types/stack';
import { getRepoSmartSummary } from '../services/aiService';

interface RepoModalProps {
  item: DiscoveryItem;
  onClose: () => void;
}

const RepoModal: React.FC<RepoModalProps> = ({ item, onClose }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [noApiKey, setNoApiKey] = useState(false);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Fetch AI Summary
  useEffect(() => {
    let isMounted = true;
    async function fetchSummary() {
      if (!item.repo) return;
      setIsGeneratingAI(true);
      
      try {
        const summary = await getRepoSmartSummary(item.repo);
        if (!isMounted) return;
        
        if (summary) {
          setAiSummary(summary);
        } else if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
          setNoApiKey(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsGeneratingAI(false);
      }
    }
    
    fetchSummary();
    
    return () => {
      isMounted = false;
    };
  }, [item.repo]);

  const formatStars = (stars?: number) => {
    if (!stars) return null;
    if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
    return stars.toString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-premium flex flex-col max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6 pr-10">
            <h2 className="text-2xl md:text-3xl font-black font-heading text-white">{item.name}</h2>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-accent/20 text-accent-glow border border-accent/30">
              {item.example || 'Tech'}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm font-mono text-slate-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <Activity size={16} className="text-yellow-500" />
              <span>{formatStars(item.stars)} Stars</span>
            </div>
            {item.forks !== undefined && (
              <div className="flex items-center gap-2 text-sm font-mono text-slate-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                <GitFork size={16} className="text-slate-400" />
                <span>{item.forks >= 1000 ? `${(item.forks / 1000).toFixed(1)}k` : item.forks} Forks</span>
              </div>
            )}
            {'originalLang' in item && item.originalLang && (
              <div className="flex items-center gap-2 text-sm font-mono text-slate-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                <Globe size={16} className="text-emerald-400" />
                <span>Traduzido do {item.originalLang.toUpperCase()}</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Para que serve? (Tradução)
              </h3>
              
              {isGeneratingAI ? (
                <div className="bg-black/20 p-5 rounded-xl border border-white/5 flex items-center gap-3 text-accent-glow">
                  <Loader2 className="animate-spin" size={20} />
                  <span>A IA está lendo o repositório para criar um resumo...</span>
                </div>
              ) : aiSummary ? (
                <div className="bg-slate-900/50 p-6 rounded-xl border border-accent/30 shadow-[0_0_20px_rgba(56,189,248,0.1)] relative">
                  <div className="absolute -top-3 -right-3 bg-accent p-1.5 rounded-full shadow-lg">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <h4 className="text-xs font-bold text-accent uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Sparkles size={12} /> Resumo criado pela IA
                  </h4>
                  <div className="text-slate-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                    {aiSummary}
                  </div>
                </div>
              ) : noApiKey ? (
                <div className="bg-black/20 p-5 rounded-xl border border-yellow-500/20 text-yellow-500/80 flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-bold text-yellow-500">
                    <Key size={18} /> IA Desativada (Falta API Key)
                  </div>
                  <p className="text-sm">
                    Para que a IA leia e resuma o repositório, configure a variável <code>VITE_OPENROUTER_API_KEY</code> no arquivo <code>.env.local</code>.
                  </p>
                  <p className="text-slate-300 text-base mt-2 bg-black/20 p-3 rounded-lg border border-white/5">
                    {item.translatedDesc || item.desc || 'Nenhuma descrição disponível.'}
                  </p>
                </div>
              ) : (
                <p className="text-slate-300 text-base md:text-lg leading-relaxed bg-black/20 p-5 rounded-xl border border-white/5">
                  {item.translatedDesc || item.desc || 'Nenhuma descrição disponível.'}
                </p>
              )}
            </div>

            {item.translatedDesc && item.translatedDesc !== item.desc && !aiSummary && (
              <div>
                <h3 className="text-sm font-bold text-slate-500 mb-2">Descrição Original</h3>
                <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-white/10 pl-4">
                  {item.desc}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 bg-black/20 border-t border-white/5 mt-auto">
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-lg bg-accent text-white hover:bg-accent-glow hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all duration-300"
          >
            Acessar Repositório no GitHub <ExternalLink size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default RepoModal;
