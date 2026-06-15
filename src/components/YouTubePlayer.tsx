import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, ChevronDown, Play, Pause, Volume2, VolumeX, X, Tv } from 'lucide-react';

const VIDEO_ID = '54hoKbTWon4';
const PLAYLIST_ID = 'RD54hoKbTWon4';

// Declaração de tipos básica para o YouTube Player
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  isMuted(): boolean;
  mute(): void;
  unMute(): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  destroy(): void;
}

export default function YouTubePlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showVideo, setShowVideo] = useState(false);
  
  // Progresso
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const progressInterval = useRef<number | null>(null);

  // Inicializar YouTube API
  useEffect(() => {
    // Carregar o script do YouTube Iframe API se não estiver presente
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Função que será chamada quando a API estiver pronta
    const setupPlayer = () => {
      if (!(window as any).YT || !containerRef.current) return;

      playerRef.current = new (window as any).YT.Player(containerRef.current, {
        height: '100%',
        width: '100%',
        videoId: VIDEO_ID,
        playerVars: {
          list: PLAYLIST_ID,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume);
            if (isMuted) event.target.mute();
          },
          onStateChange: (event: any) => {
            const state = event.target.getPlayerState();
            // 1 = playing, 2 = paused
            if (state === 1) {
              setIsPlaying(true);
              setDuration(event.target.getDuration());
            } else {
              setIsPlaying(false);
            }
          }
        }
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      setupPlayer();
    } else {
      // Aguardar o script carregar
      const prevCallback = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        setupPlayer();
      };
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Monitorar o progresso quando tocando
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = window.setInterval(() => {
        if (playerRef.current) {
          setCurrentTime(playerRef.current.getCurrentTime());
          const dur = playerRef.current.getDuration();
          if (dur && dur !== duration) {
            setDuration(dur);
          }
        }
      }, 500);
    } else {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    }

    return () => {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (playerRef.current) {
      playerRef.current.setVolume(val);
      if (val > 0 && isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newPercentage = clickX / width;
    const newTime = newPercentage * duration;
    
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isVisible) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2 font-sans">
      {/* O componente inteiro é mantido no DOM sempre, para o YouTube Iframe não reiniciar */}
      <motion.div
        animate={{ 
          opacity: isExpanded ? 1 : 0, 
          scale: isExpanded ? 1 : 0.9, 
          y: isExpanded ? 0 : 15,
          visibility: isExpanded ? 'visible' : 'hidden'
        }}
        initial={false}
        transition={{ type: 'spring', stiffness: 350, damping: 26 }}
        className="w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 glass-premium flex flex-col"
        style={{ 
          background: 'rgba(10, 10, 10, 0.85)', 
          backdropFilter: 'blur(24px)',
          position: isExpanded ? 'relative' : 'absolute',
          pointerEvents: isExpanded ? 'auto' : 'none',
          zIndex: isExpanded ? 10 : -10
        }}
      >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  {isPlaying && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/70 opacity-75" />
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-accent-glow' : 'bg-slate-500'}`} />
                </span>
                <span className="text-xs font-bold text-slate-200 tracking-wider uppercase">Vibe Coding FM</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimizar"
                >
                  <ChevronDown size={16} />
                </button>
                <button
                  onClick={() => {
                    if (playerRef.current) playerRef.current.pauseVideo();
                    setIsVisible(false);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Fechar"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Info / Visualizer Area */}
            <div className="p-4 flex items-center gap-4">
              {/* Spinning Vinyl / CD Animation */}
              <div className="relative flex-shrink-0">
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent/30 via-slate-800 to-accent-glow/30 flex items-center justify-center border-2 border-white/10 shadow-lg relative"
                >
                  <div className="w-5 h-5 rounded-full bg-background border border-white/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>
                  {/* Music Waves when playing */}
                  {isPlaying && (
                    <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping opacity-30" />
                  )}
                </motion.div>
                <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-1 border border-background">
                  <Music2 size={10} className="text-white" />
                </div>
              </div>

              {/* Title & Track Details */}
              <div className="overflow-hidden flex-1">
                <h4 className="text-sm font-bold text-white truncate">Lofi Coding Session</h4>
                <p className="text-xs text-slate-400 truncate">Sintonia Antigravidade</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-accent-glow font-mono uppercase tracking-wider">
                    24/7 Lofi
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Progress Bar */}
            <div className="px-4 pb-2">
              <div 
                className="h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden relative group"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-accent-glow rounded-full transition-all duration-100 relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="px-4 py-2 flex items-center justify-between bg-white/5 border-t border-white/5">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-md"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 flex-1 max-w-[130px] ml-4">
                <button 
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-glow"
                  style={{ backgroundSize: `${volume}% 100%` }}
                />
              </div>

              {/* Show/Hide Video Button (Opção A) */}
              <button
                onClick={() => setShowVideo(!showVideo)}
                className={`p-2 rounded-lg border transition-all ${
                  showVideo 
                    ? 'bg-accent/20 border-accent/40 text-accent-glow' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                title={showVideo ? "Esconder Vídeo" : "Mostrar Vídeo"}
              >
                <Tv size={16} />
              </button>
            </div>

            {/* YouTube Player Container - always kept in the DOM to prevent audio resetting when hiding/showing video */}
            <motion.div
              animate={{ 
                height: showVideo ? 180 : 0, 
                opacity: showVideo ? 1 : 0,
                borderTopWidth: showVideo ? 1 : 0
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden bg-black relative border-white/10 flex-shrink-0 w-full"
            >
              <div ref={containerRef} className="w-full h-full" />
            </motion.div>
      </motion.div>

      {/* Pulsing Pill button when minimized */}
      <motion.button
        animate={{ 
          opacity: isExpanded ? 0 : 1, 
          scale: isExpanded ? 0.9 : 1,
          visibility: isExpanded ? 'hidden' : 'visible'
        }}
        initial={false}
        onClick={() => setIsExpanded(true)}
        whileHover={!isExpanded ? { scale: 1.05 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/10 shadow-lg text-white font-medium text-xs tracking-wider transition-all uppercase"
        style={{ 
          background: 'rgba(10, 10, 10, 0.88)', 
          backdropFilter: 'blur(16px)',
          position: isExpanded ? 'absolute' : 'relative',
          pointerEvents: isExpanded ? 'none' : 'auto',
          zIndex: isExpanded ? -10 : 10
        }}
      >
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full bg-accent-glow/20 blur-md -z-10"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <motion.div
          animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
        >
          <Music2 size={14} className={isPlaying ? 'text-accent-glow' : 'text-slate-400'} />
        </motion.div>
        <span>Vibe FM</span>
        {isPlaying && (
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-glow opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-glow" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
