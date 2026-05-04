import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Terminal, Zap, Command } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[100vh] md:min-h-[110vh] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden pt-28 md:pt-20">
      {/* Parallax Background Decorations */}
      <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-accent/10 blur-[60px] md:blur-[120px] rounded-full -z-10 animate-float" />
      <motion.div style={{ y: y2, animationDelay: '2s' }} className="absolute bottom-[20%] right-[10%] w-[175px] md:w-[350px] h-[175px] md:h-[350px] bg-primary/10 blur-[50px] md:blur-[100px] rounded-full -z-10 animate-float" />
      
      {/* Text Reveal Headline */}
      <div className="max-w-6xl w-full text-center relative z-20">
        <motion.div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono mb-8 glass-premium"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Command size={12} className="text-accent" />
          <span>v2026.4.14 — ESTÁVEL</span>
          <div className="w-1 h-1 rounded-full bg-primary animate-pulse ml-2" />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black font-sans tracking-tight mb-6 md:mb-8 leading-[0.9] text-white overflow-hidden">
          <motion.span 
            className="inline-block text-reveal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            A Próxima Vibe do
          </motion.span>
          <br />
          <motion.span 
            className="inline-block text-accent text-neon"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Desenvolvimento.
          </motion.span>
        </h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-2xl text-slate-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-sans font-medium px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Uma curadoria brutalista e elegante das ferramentas que estão <br className="hidden md:block" />
          moldando o futuro da engenharia de software e IA.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.a 
            href="#hub" 
            className="btn-github-primary flex items-center gap-3 group relative px-6 py-4 md:px-10 md:py-5 text-base md:text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Zap size={20} className="fill-white" />
            Explorar Ecossistema
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            className="btn-github-outline flex items-center gap-3 px-6 py-4 md:px-10 md:py-5 text-base md:text-lg glass-premium"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Terminal size={20} />
            GitHub Open-Source
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Abstract Element */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-accent/0 via-accent to-accent/0"
        animate={{ height: [96, 48, 96], opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Scroll Hint */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase font-bold tracking-[0.3em] text-slate-600"
        style={{ opacity }}
      >
        Scroll Down
      </motion.div>
    </section>
  );
};

export default Hero;
