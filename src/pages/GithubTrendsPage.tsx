import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Calendar, Clock, Loader2, Rocket, Search } from 'lucide-react';
import { useGithubTrends } from '../hooks/useGithubTrends';
import ToolCard from '../components/ToolCard';
import RepoModal from '../components/RepoModal';
import type { DiscoveryItem } from '../types/stack';

const GithubTrendsPage: React.FC = () => {
  const { trending, established, hotReleases, loading } = useGithubTrends();
  const [activeTab, setActiveTab] = useState<'trending' | 'established' | 'hotReleases'>('hotReleases');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<DiscoveryItem | null>(null);

  const filterItems = (items: typeof trending) => {
    if (!searchTerm) return items;
    const lower = searchTerm.toLowerCase();
    return items.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(lower);
      const descMatch = item.desc && item.desc.toLowerCase().includes(lower);
      const translatedDescMatch = 'translatedDesc' in item && item.translatedDesc && item.translatedDesc.toLowerCase().includes(lower);
      return nameMatch || descMatch || translatedDescMatch;
    });
  };

  const filteredHotReleases = filterItems(hotReleases);
  const filteredEstablished = filterItems(established);
  const filteredTrending = filterItems(trending);

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 relative">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-mono glass-premium">
            <GitBranch size={16} className="text-accent" />
            <span>GitHub Explorer</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black font-heading text-white tracking-tighter">
            Tendências <span className="text-accent text-neon">Open-Source</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Descubra os repositórios em maior ascensão no mundo do desenvolvimento, atualizados em tempo real.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar repositório ou tecnologia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent glass-premium transition-all"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl glass-premium">
            <button
              onClick={() => setActiveTab('hotReleases')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all ${
                activeTab === 'hotReleases' 
                ? 'bg-accent text-white shadow-lg shadow-accent/25' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Rocket size={16} />
              Bombando
            </button>
            <button
              onClick={() => setActiveTab('established')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all ${
                activeTab === 'established' 
                ? 'bg-accent text-white shadow-lg shadow-accent/25' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar size={16} />
              Consolidados
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all ${
                activeTab === 'trending' 
                ? 'bg-accent text-white shadow-lg shadow-accent/25' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock size={16} />
              Em Alta
            </button>
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
            <p className="text-slate-400 font-mono text-sm uppercase tracking-widest animate-pulse">Sincronizando com GitHub...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {activeTab === 'hotReleases' ? (
                filteredHotReleases.length > 0 ? (
                  filteredHotReleases.map((item) => (
                    <ToolCard key={`hot-${item.repo}`} item={item} stars={item.stars} rank={hotReleases.indexOf(item) + 1} onClick={() => setSelectedRepo(item)} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-slate-500">Nenhum super lançamento encontrado.</div>
                )
              ) : activeTab === 'established' ? (
                filteredEstablished.length > 0 ? (
                  filteredEstablished.map((item) => (
                    <ToolCard key={`established-${item.repo}`} item={item} stars={item.stars} rank={established.indexOf(item) + 1} onClick={() => setSelectedRepo(item)} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-slate-500">Nenhum repositório consolidado encontrado.</div>
                )
              ) : (
                filteredTrending.length > 0 ? (
                  filteredTrending.map((item) => (
                    <ToolCard key={`trending-${item.repo}`} item={item} stars={item.stars} rank={trending.indexOf(item) + 1} onClick={() => setSelectedRepo(item)} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-slate-500">Nenhum repositório em alta encontrado.</div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        )}

        <AnimatePresence>
          {selectedRepo && (
            <RepoModal item={selectedRepo} onClose={() => setSelectedRepo(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GithubTrendsPage;
