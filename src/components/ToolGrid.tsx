import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Layers, Target } from 'lucide-react';
import { stackData } from '../data/stackData';
import ToolCard from './ToolCard';
import { useVibeTrends } from '../hooks/useVibeTrends';

const ToolGrid: React.FC = () => {
  const { trends, discovery } = useVibeTrends();
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearchQuery(value), 200);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(stackData.map(s => s.cat));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    return stackData.map(section => {
      if (activeCategory !== 'all' && activeCategory !== section.cat) return null;
      
      const matchedItems = section.items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
      );

      if (matchedItems.length === 0) return null;

      return { ...section, items: matchedItems };
    }).filter(Boolean) as typeof stackData;
  }, [searchQuery, activeCategory]);

  return (
    <section id="hub" className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-40">
      <div className="flex flex-col gap-10 md:gap-16 mb-12 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 text-accent font-black text-xs uppercase tracking-[0.4em]">
              <Target size={14} />
              <span>Engine de Curadoria</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black font-heading text-white tracking-tighter leading-none">
              Stack de <br />
              <span className="text-accent text-neon">Exploração.</span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="relative group w-full md:w-[450px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-accent/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar ferramenta..." 
              value={inputValue}
              onChange={handleSearchChange}
              className="w-full h-14 md:h-20 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl pl-12 md:pl-16 pr-6 md:pr-8 text-base md:text-xl text-white placeholder:text-slate-700 outline-none focus:border-accent/40 focus:bg-white/10 transition-all font-sans relative z-10 glass-premium"
            />
          </motion.div>
        </div>

        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 pb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((cat) => (
            <motion.button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all whitespace-nowrap border ${
                 activeCategory === cat 
                 ? 'bg-accent text-white border-accent shadow-[0_0_30px_rgba(31,111,235,0.4)]' 
                 : 'bg-white/5 text-slate-500 border-white/5 hover:bg-white/10 hover:text-white'
               }`}
            >
               {cat === 'all' && <Layers size={14} />}
               {cat === 'all' ? 'Tudo' : cat}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div className="space-y-32">
        <AnimatePresence mode="popLayout">
          {/* Discovery Section - Rising Tech */}
          {!searchQuery && activeCategory === 'all' && discovery.length > 0 && (
            <motion.div 
               key="discovery-section"
               layout
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               className="space-y-12"
            >
              <div className="flex items-center gap-6 group">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center text-2xl md:text-4xl group-hover:bg-accent/30 transition-all duration-700 animate-pulse">
                  🔥
                </div>
                <div className="space-y-1 flex-grow">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl md:text-3xl font-black font-heading text-white tracking-widest uppercase">
                      Rising Technologies
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-accent text-[10px] font-black text-white uppercase animate-bounce">Live</span>
                  </div>
                  <div className="h-[2px] w-full bg-gradient-to-r from-accent to-transparent opacity-60" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {discovery.map((item) => (
                  <ToolCard 
                    key={`discovery-${item.repo}`} 
                    item={item} 
                    stars={item.stars}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {filteredData.map((section) => (
            <motion.div 
               key={section.cat} 
               layout
               initial={{ opacity: 0, scale: 0.98 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               exit={{ opacity: 0, scale: 0.98 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-12"
            >
              <div className="flex items-center gap-6 group">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl md:text-4xl grayscale group-hover:grayscale-0 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-700 rotate-3 group-hover:rotate-0">
                  {section.icon}
                </div>
                <div className="space-y-1 flex-grow">
                  <h3 className="text-xl md:text-3xl font-black font-heading text-white tracking-widest uppercase">
                    {section.cat}
                  </h3>
                  <div className="h-[2px] w-full bg-gradient-to-r from-accent to-transparent opacity-30" />
                </div>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } }
                }}
              >
                {section.items.map((item) => (
                  <ToolCard 
                    key={item.name} 
                    item={item} 
                    stars={item.repo ? trends[item.repo] : undefined}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredData.length === 0 && (
        <motion.div 
          className="py-40 flex flex-col items-center text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative">
             <Filter size={80} className="text-slate-800" />
             <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full -z-10" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">Frequência não encontrada</h3>
            <p className="text-slate-500 text-lg font-medium">A engine de busca não localizou registros para "{searchQuery}".</p>
          </div>
          <button 
            onClick={() => { setSearchQuery(''); setInputValue(''); setActiveCategory('all'); }}
            className="px-8 py-3 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-white/10 transition-all"
          >
            Resetar Engine
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default ToolGrid;
