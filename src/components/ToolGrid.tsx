import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Layers } from 'lucide-react';
import { stackData } from '../data/stackData';
import ToolCard from './ToolCard';
import './ToolGrid.css';

const ToolGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(() => {
    return ['all', ...stackData.map(s => s.cat)];
  }, []);

  const filteredSections = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    return stackData.map(section => {
      // Filtrar por categoria
      if (activeCategory !== 'all' && activeCategory !== section.cat) {
        return null;
      }
      
      // Filtrar ferramentas dentro da categoria
      const matchedItems = section.items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
      );

      if (matchedItems.length === 0) return null;

      return {
        ...section,
        items: matchedItems
      };
    }).filter(Boolean) as typeof stackData;
  }, [searchQuery, activeCategory]);

  const totalFilteredCount = useMemo(() => {
    return filteredSections.reduce((acc, section) => acc + section.items.length, 0);
  }, [filteredSections]);

  return (
    <section id="hub" className="tool-grid-section">
      <div className="grid-header">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Buscar framework, banco ou ferramenta..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-bar">
          {categories.map(cat => (
            <button
               key={cat}
               className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
               onClick={() => setActiveCategory(cat)}
            >
               {cat === 'all' ? <Layers size={14} /> : null}
               {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="results-count">
        Encontradas <span>{totalFilteredCount}</span> ferramentas
      </div>

      <div className="hub-content">
        <AnimatePresence mode="popLayout">
          {filteredSections.map(section => (
            <motion.div 
               key={section.cat} 
               layout 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="hub-section"
            >
              <h2 className="section-title">
                <span className="section-icon">{section.icon}</span>
                {section.cat}
              </h2>
              
              <div className="items-grid">
                {section.items.map((item, idx) => (
                  <ToolCard key={item.name} item={item} index={idx} />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredSections.length === 0 && (
        <div className="no-results">
          <Filter size={48} className="no-results-icon" />
          <h3>Nenhum resultado encontrado</h3>
          <p>Tente ajustar seus filtros ou busca.</p>
          <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
            Limpar tudo
          </button>
        </div>
      )}
    </section>
  );
};

export default ToolGrid;
