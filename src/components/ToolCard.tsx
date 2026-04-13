import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap } from 'lucide-react';
import './ToolCard.css';
import type { StackItem } from '../data/stackData';

interface ToolCardProps {
  item: StackItem;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ item, index }) => {
  return (
    <motion.div 
      className={`tool-card ${item.isNew ? 'is-new' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, borderColor: 'var(--primary)' }}
    >
      <div className="card-header">
        <h3 className="tool-title">{item.name}</h3>
        {item.isNew && <span className="new-badge">NEW</span>}
      </div>

      <p className="tool-description">{item.desc}</p>

      {item.example && (
        <div className="tool-example">
          <Zap size={10} className="zap-icon" />
          <span>Used by: {item.example}</span>
        </div>
      )}

      {item.link && (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="card-link">
          Ver Documentação
          <ExternalLink size={14} />
        </a>
      )}
    </motion.div>
  );
};

export default ToolCard;
