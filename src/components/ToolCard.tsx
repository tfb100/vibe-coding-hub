import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Activity } from 'lucide-react';
import type { StackItem } from '../types/stack';

interface ToolCardProps {
  item: StackItem;
  stars?: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ item, stars }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const formatStars = (num?: number) => {
    if (!num) return null;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };
  
  // Motion values for spotlight and tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    // Update individual spotlight position for the CSS radial gradient
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative h-full glass-premium rounded-2xl p-7 border border-white/5 hover:border-accent/80 bg-slate-950/20 spotlight-container overflow-visible hover:shadow-[0_0_60px_-15px_rgba(31,111,235,0.5)] transition-colors duration-500"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Blue Background Glow (The illumination requested) - Intensified */}
      <div className="absolute -inset-4 bg-accent/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-20 pointer-events-none" />
      <div className="absolute -inset-1 bg-gradient-to-b from-accent/0 via-accent/10 to-accent/50 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-20 pointer-events-none" />
      
      {/* Spotlight Dynamic Glow */}
      <div className="spotlight-glow" />

      {/* Card Content with 3D Pop (TranslateZ) */}
      <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6 w-full">
          <div />
          <div className="flex gap-2">
            {item.isNew && (
              <span className="text-[10px] font-black text-white px-3 py-1 rounded-lg bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse">
                LATEST
              </span>
            )}
            {item.isMCP && (
              <span className="text-[10px] font-black text-white px-3 py-1 rounded-lg bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.3)] border border-indigo-400/30 uppercase tracking-widest">
                MCP
              </span>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-bold font-heading text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent transition-all duration-300 mb-3">
          {item.name}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 font-sans">
          {item.desc}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[1px] flex-grow bg-white/5" />
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter flex items-center gap-1">
              {stars ? (
                <>
                  <Activity size={10} className="text-accent/60" />
                  {formatStars(stars)} GitHub Stars
                </>
              ) : 'Stack Intel'}
            </span>
            <div className="h-[1px] w-4 bg-white/5" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.isMCP ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'}`} />
              <span className="text-xs font-bold text-slate-300 truncate max-w-[150px]">
                {item.isMCP ? 'Server Ready' : (item.example || 'Global Tech')}
              </span>
            </div>

            {(item.link || item.doc) && (
              <a 
                href={item.link || item.doc} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:bg-accent hover:text-white hover:border-accent transition-all duration-500 scale-90 group-hover:scale-100 shadow-xl"
                title={item.docLabel || 'Ver Documentação'}
              >
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Extra floating glow for the visual pop */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
};

export default ToolCard;
