import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="badge">
          <Sparkles size={14} className="sparkle" />
          <span>Curadoria Elite 2026</span>
        </div>
        
        <h1 className="hero-title">
          Vibe <span className="gradient-text">Coding</span> Hub
        </h1>
        
        <p className="hero-subtitle">
          A fronteira final do desenvolvimento moderno. Uma seleção rigorosa de frameworks, 
          ferramentas e IAs para construir o futuro hoje.
        </p>

        <div className="hero-actions">
          <a href="#hub" className="btn-primary">Explorar Stack</a>
          <a href="https://github.com" target="_blank" className="btn-secondary">Contribuir</a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
