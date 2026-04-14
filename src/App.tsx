import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import ToolGrid from './components/ToolGrid';
import Prism from './components/Prism';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans relative selection:bg-accent selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Official Prism Background Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <Prism 
          height={6} 
          baseWidth={10} 
          animationType="rotate" 
          hueShift={120} 
          colorFrequency={1.5} 
          glow={0.6}
          scale={2.2}
          timeScale={0.3}
          bloom={3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/50" />
      </div>

      <header className="fixed top-0 left-1/2 -translate-x-1/2 mt-6 z-50 w-[95%] max-w-7xl glass-premium rounded-2xl py-3 px-6 flex items-center justify-between border-white/5 shadow-2xl">
        <div className="flex items-center gap-10">
          <a href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-black text-lg rotate-12 group-hover:rotate-0 transition-transform duration-500">VH</div>
              <div className="absolute -inset-1 bg-accent/20 blur-md rounded-xl -z-10 group-hover:bg-accent/40 transition-all" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase sm:block hidden">
              <span className="text-white">Vibe</span>
              <span className="text-accent ml-2 text-neon">Code Hub</span>
            </span>
          </a>
        </div>
      </header>

      <main>
        <Hero />
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/10 blur-[150px] -z-10 rounded-full" />
          <ToolGrid />
        </div>
      </main>

      <footer className="relative py-20 px-6 border-t border-white/5 text-center text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em]">
        <div className="mb-4">SYS_VER_OCTOKIT_DISCOVERY_4.14.26</div>
        <div>
          Desenvolvido pelo time{" "}
          <a href="http://oqconecta.tech/" target="_blank" className="text-accent hover:text-white transition-colors underline underline-offset-4">
            oqconecta.tech
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
