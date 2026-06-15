import React, { useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Activity, Globe, Flame, GitFork } from 'lucide-react';
import type { StackItem, DiscoveryItem } from '../types/stack';

interface ToolCardProps {
  item: StackItem | DiscoveryItem;
  stars?: number;
  rank?: number;
  onClick?: () => void;
}

// Computed once at module level, not on every render
const IS_TOUCH = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const ToolCard: React.FC<ToolCardProps> = ({ item, stars, rank, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const formatStars = useMemo(() => {
    if (!stars) return null;
    if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
    return stars.toString();
  }, [stars]);
  
  // Motion values for spotlight and tilt (disabled on touch devices for performance)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltAmount = IS_TOUCH ? 0 : 10;
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), { stiffness: 150, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || IS_TOUCH) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    // Update individual spotlight position for the CSS radial gradient
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, [mouseX, mouseY]);

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const isHot = 'forks' in item && item.forks !== undefined && item.forks > 500;

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`group relative h-full glass-premium rounded-xl md:rounded-2xl p-5 md:p-7 border bg-slate-950/20 spotlight-container overflow-visible transition-colors duration-500 ${onClick ? 'cursor-pointer' : ''} ${
        isHot 
          ? 'border-orange-500/40 hover:border-red-500/80 shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:shadow-[0_0_60px_-10px_rgba(239,68,68,0.5)] backdrop-blur-2xl' 
          : 'border-white/5 hover:border-accent/80 hover:shadow-[0_0_60px_-15px_rgba(31,111,235,0.5)]'
      }`}
      style={{ rotateX, rotateY, transformStyle: IS_TOUCH ? 'flat' : 'preserve-3d' }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Glow - changes color if hot */}
      <div className={`absolute -inset-4 blur-[30px] md:blur-[60px] rounded-full transition-all duration-1000 -z-20 pointer-events-none ${isHot ? 'bg-orange-500/20 opacity-30 group-hover:opacity-100' : 'bg-accent/20 opacity-0 group-hover:opacity-100'}`} />
      <div className={`absolute -inset-1 blur-xl md:blur-3xl rounded-3xl transition-all duration-1000 -z-20 pointer-events-none ${isHot ? 'bg-gradient-to-br from-red-500/30 via-orange-400/20 to-transparent opacity-50 group-hover:opacity-100' : 'bg-gradient-to-b from-accent/0 via-accent/10 to-accent/50 opacity-0 group-hover:opacity-100'}`} />
      
      {/* Efeito de Reflexo de Vidro Animado Continuo */}
      {isHot && (
        <div className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden pointer-events-none z-0">
           <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine mix-blend-overlay" />
        </div>
      )}
      
      {/* Spotlight Dynamic Glow */}
      <div className="spotlight-glow" />

      {/* Card Content with 3D Pop (TranslateZ) */}
      <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-6 w-full">
          <div>
            {rank !== undefined && (
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-black shadow-lg border ${
                rank === 1 ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-yellow-950 border-yellow-400 shadow-yellow-500/50' :
                rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-slate-900 border-slate-300 shadow-slate-400/50' :
                rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 border-amber-600 shadow-amber-700/50' :
                'bg-white/10 text-white border-white/20'
              }`}>
                #{rank}
              </div>
            )}
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {isHot && (
              <span className="flex items-center gap-1 text-[10px] font-black text-white px-3 py-1 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] border border-white/20 uppercase tracking-widest animate-pulse z-10">
                <Flame size={10} /> HOT
              </span>
            )}
            {item.isNew && !isHot && (
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

        <h3 className={`relative z-10 text-lg md:text-2xl font-bold font-heading text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 mb-3 ${isHot ? 'group-hover:from-red-300 group-hover:to-orange-400' : 'group-hover:from-white group-hover:to-accent'}`}>
          {item.name}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed font-sans" style={{ 
          marginBottom: ('translatedDesc' in item && item.translatedDesc) ? '0' : '2rem' 
        }}>
          {'translatedDesc' in item && item.translatedDesc 
            ? item.translatedDesc 
            : item.desc}
        </p>
        
        {/* Indicador de tradução */}
        {'translatedDesc' in item && item.translatedDesc && (
          <div className="flex items-center gap-1 mb-6 text-[10px] text-slate-500">
            <Globe size={10} />
            <span>Traduzido do </span>
            {'originalLang' in item && item.originalLang && (
              <span className="text-accent font-bold">{item.originalLang.toUpperCase()}</span>
            )}
            <span> para </span>
            {'translationLang' in item && item.translationLang && (
              <span className="text-accent font-bold">{item.translationLang}</span>
            )}
          </div>
        )}

        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[1px] flex-grow bg-white/5" />
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter flex items-center gap-1">
              {formatStars ? (
                <>
                  <Activity size={10} className={isHot ? "text-red-400" : "text-accent/60"} />
                  {formatStars} Stars
                  {'forks' in item && item.forks !== undefined && (
                    <>
                      <span className="mx-1 opacity-30">•</span>
                      <GitFork size={10} className={isHot ? "text-orange-400" : "text-accent/60"} />
                      {item.forks >= 1000 ? `${(item.forks / 1000).toFixed(1)}k` : item.forks} Forks
                    </>
                  )}
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

      {/* Extra floating glow - hidden on touch devices for performance */}
      {!IS_TOUCH && (
        <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br transition-opacity duration-700 pointer-events-none ${isHot ? 'from-red-500/40 via-orange-400/20 opacity-30 group-hover:opacity-100' : 'from-accent/20 opacity-0 group-hover:opacity-100'} to-transparent z-0`} />
      )}
    </motion.div>
  );
};

export default ToolCard;
