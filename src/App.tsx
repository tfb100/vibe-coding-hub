import { motion, useScroll, useSpring } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { GitBranch } from 'lucide-react';
import Prism from './components/Prism';
import HomePage from './pages/HomePage';
import GithubTrendsPage from './pages/GithubTrendsPage';
import YouTubePlayer from './components/YouTubePlayer';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const location = useLocation();
  const isGithubPage = location.pathname === '/github';

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

      <header className="fixed top-0 left-1/2 -translate-x-1/2 mt-3 md:mt-6 z-50 w-[95%] max-w-7xl glass-premium rounded-xl md:rounded-2xl py-2 md:py-3 px-4 md:px-6 flex items-center justify-between border-white/5 shadow-2xl">
        <div className="flex items-center gap-10">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl flex items-center justify-center text-black font-black text-sm md:text-lg rotate-12 group-hover:rotate-0 transition-transform duration-500">VH</div>
              <div className="absolute -inset-1 bg-accent/20 blur-md rounded-lg md:rounded-xl -z-10 group-hover:bg-accent/40 transition-all" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase sm:block hidden">
              <span className="text-white">Vibe</span>
              <span className="text-accent ml-2 text-neon">Code Hub</span>
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link 
            to="/github" 
            className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all border ${
              isGithubPage 
                ? 'bg-accent/20 border-accent/50 text-white' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <GitBranch size={16} />
            <span className="hidden sm:inline">GitHub Trends</span>
          </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/github" element={<GithubTrendsPage />} />
        </Routes>
      </main>

      {/* Player de Música Global - visível em todas as páginas */}
      <YouTubePlayer />

      <footer className="relative py-10 md:py-20 px-4 md:px-6 border-t border-white/5 text-center text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] md:tracking-[0.3em]">
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
