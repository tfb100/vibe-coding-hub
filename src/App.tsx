import React from 'react';
import AuroraBackground from './components/AuroraBackground';
import Hero from './components/Hero';
import ToolGrid from './components/ToolGrid';

function App() {
  return (
    <div className="app-container">
      <AuroraBackground />
      
      <main>
        <Hero />
        <ToolGrid />
      </main>

      <footer className="app-footer">
        <p>© 2026 Vibe Coding Hub - Curadoria para a Era da IA</p>
        <div className="footer-links">
          <span>Built with React & Aurora</span>
        </div>
      </footer>
      
      <style>{`
        .app-container {
          position: relative;
          min-height: 100vh;
        }
        
        .app-footer {
          padding: 4rem 1rem;
          text-align: center;
          border-top: 1px solid rgba(51, 65, 85, 0.3);
          margin-top: 4rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          backdrop-filter: blur(10px);
        }
        
        .footer-links {
          margin-top: 1rem;
          font-size: 0.8rem;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}

export default App;
