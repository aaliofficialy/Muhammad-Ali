import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Menu, X, ArrowUpRight, UserPlus, UserCheck, Sun, Moon, Search, RefreshCw, Mic, MicOff } from "lucide-react";
import { useApp } from "../context/AppContext";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const BreathingPulse = ({ isRecording }: { isRecording: boolean }) => {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let microphone: MediaStreamAudioSourceNode;
    let dataArray: Uint8Array;
    let animationFrame: number;
    let stream: MediaStream;

    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((s) => {
        stream = s;
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.smoothingTimeConstant = 0.6;
        analyser.fftSize = 256;
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        let smoothedVolume = 0;
        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          // Scale volume (0 to 1 approximation)
          let targetVolume = average / 40; 
          if (targetVolume > 1) targetVolume = 1;
          
          // Smooth interpolation
          smoothedVolume += (targetVolume - smoothedVolume) * 0.15;
          
          setVolume(smoothedVolume);
          animationFrame = requestAnimationFrame(updateVolume);
        };
        updateVolume();
      }).catch(err => console.error("Error accessing mic for volume", err));
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (audioContext && audioContext.state !== 'closed') audioContext.close();
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [isRecording]);

  if (!isRecording) return null;

  const scale = 1 + volume * 2.5;
  // Transition from gold (212, 175, 55) to white-blue (230, 245, 255) based on volume
  const r = Math.round(212 + (230 - 212) * volume);
  const g = Math.round(175 + (245 - 175) * volume);
  const b = Math.round(55 + (255 - 55) * volume);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
       <div 
         className="w-5 h-5 rounded-full transition-all duration-75"
         style={{
           "--pulse-color": `${r}, ${g}, ${b}`,
           transform: `scale(${scale})`,
           backgroundColor: `rgba(var(--pulse-color), ${0.3 + volume * 0.4})`,
           boxShadow: `0 0 ${10 + volume * 40}px ${volume * 8}px rgba(var(--pulse-color), ${0.6 + volume * 0.4})`
         } as React.CSSProperties}
       />
    </div>
  );
};

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const { 
    isFollowing, 
    toggleFollow, 
    theme, 
    toggleTheme, 
    personalInfo, 
    searchQuery, 
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  } = useApp();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";

      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const sanitized = sanitizeSearchInput(transcript);
        setSearchQuery(sanitized);
        addRecentSearch(sanitized);
        setIsRecording(false);
      };

      recog.onerror = () => {
        setIsRecording(false);
      };

      recog.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recog);
    }
  }, []);

  const toggleVoiceSearch = () => {
    if (!recognition) return;
    
    if (isRecording) {
      recognition.stop();
    } else {
      setIsRecording(true);
      recognition.start();
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Skills", id: "skills" },
    { label: "Articles", id: "blog" },
    { label: "Stories", id: "testimonials" },
    { label: "Contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const sanitizeSearchInput = (val: string) => {
    // Keep letters, numbers, spaces, and basic punctuation useful for searches
    return val.replace(/[^a-zA-Z0-9 &'/\-.,_]/g, "");
  };

  const handleRecentClick = (q: string) => {
    setSearchQuery(q);
    addRecentSearch(q);
    setShowRecent(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      addRecentSearch(searchQuery);
      setShowRecent(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-slate-900 py-3"
          : "bg-transparent py-5"
      }`}
    >
      {/* Dynamic Scroll Reading Progress Bar */}
      <motion.div
        id="reading-progress-bar"
        className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-gold via-[#e6c280] to-gold origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            id="brand-logo"
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-2 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-none bg-slate-900 dark:bg-slate-850 flex items-center justify-center font-bold text-white transition-all duration-300 group-hover:bg-gold">
              <span className="text-lg tracking-wider">M</span>
              <span className="text-lg text-gold font-serif leading-none">A</span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-sm font-semibold tracking-wide text-slate-900 dark:text-white group-hover:text-gold transition-colors uppercase font-mono">
                {personalInfo.name}
              </span>
              <span className="block text-[10px] text-slate-400 dark:text-slate-450 uppercase tracking-widest font-mono">
                Expert Strategist
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-xs font-bold tracking-widest uppercase font-mono transition-all duration-200 cursor-pointer ${
                    active
                      ? "text-gold relative font-extrabold"
                      : "text-slate-600 dark:text-slate-350 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call to action & Hire button */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              id="desktop-theme-toggle"
              onClick={toggleTheme}
              className="p-2.5 rounded-none text-slate-700 hover:text-slate-950 dark:text-slate-350 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer relative"
              aria-label="Toggle Theme"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? (
                    <Sun size={15} className="text-amber-400" />
                  ) : (
                    <Moon size={15} className="text-slate-700" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

           

            {/* Consultation */}
            <button
              id="cta-nav-consult"
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center space-x-1 border border-slate-900 dark:border-slate-800 px-5 py-2.5 rounded-none text-xs font-bold tracking-widest uppercase font-mono bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-200 hover:bg-slate-900 dark:hover:bg-slate-800 hover:text-white dark:hover:text-gold transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>Consultation</span>
              <ArrowUpRight size={13} className="text-gold" />
            </button>
          </div>

          {/* Mobile Actions (Bell + Theme + Burger) */}
          <div className="flex md:hidden items-center space-x-1.5">
            {/* Theme Toggle Button for Mobile */}
            <button
              id="mobile-theme-toggle"
              onClick={toggleTheme}
              className="p-2 text-slate-705 text-slate-700 dark:text-slate-350 hover:text-black dark:hover:text-white"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-slate-700" />
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 dark:text-slate-350 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-905 dark:border-slate-900 overflow-hidden shadow-lg"
          >
             <div className="px-4 pt-4 pb-6 space-y-1 sm:px-6">
              {/* Mobile Search */}
              <div id="mobile-search-container" className="mb-4 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={15} className="text-slate-400 group-focus-within:text-gold" />
                </div>
                <input
                  id="search-input-mobile"
                  type="text"
                  placeholder="Universal Search..."
                  value={searchQuery}
                  onFocus={() => setShowRecent(true)}
                  onBlur={() => setTimeout(() => setShowRecent(false), 200)}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSearchQuery(sanitizeSearchInput(e.target.value))}
                  className="block w-full pl-10 pr-20 py-3 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none focus:outline-none focus:border-gold font-mono"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-3">
                  {searchQuery && (
                    <button
                      id="clear-search-mobile"
                      onClick={() => setSearchQuery("")}
                      className="text-slate-400"
                    >
                      <X size={18} />
                    </button>
                  )}
                  <button
                    id="voice-search-mobile"
                    onClick={toggleVoiceSearch}
                    className={`relative p-2 flex items-center justify-center transition-colors ${
                      isRecording ? "text-slate-900 dark:text-white" : "text-slate-400"
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <BreathingPulse isRecording={isRecording} />
                        <MicOff size={18} className="relative z-10" />
                      </>
                    ) : (
                      <Mic size={18} />
                    )}
                  </button>
                </div>

                {/* Recent Searches Dropdown - Mobile */}
                <AnimatePresence>
                  {showRecent && recentSearches.length > 0 && (
                    <motion.div
                      id="recent-searches-dropdown-mobile"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden"
                    >
                      <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Recent History</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); clearRecentSearches(); }}
                          className="text-[10px] text-gold hover:underline uppercase font-bold font-mono"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="max-h-40 overflow-y-auto">
                        {recentSearches.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleRecentClick(q)}
                            className="w-full text-left px-4 py-3 text-sm text-slate-600 dark:text-slate-400 border-b border-gray-50 dark:border-slate-800 last:border-0 font-mono flex items-center justify-between"
                          >
                            <span className="truncate">{q}</span>
                            <RefreshCw size={12} className="text-slate-300" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {navItems.map((item) => (
                <button
                  id={`mobile-nav-${item.id}`}
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-3 rounded-none text-xs font-bold tracking-widest font-mono uppercase transition-colors ${
                    activeSection === item.id
                      ? "text-gold bg-gold-light/50 dark:bg-gold/10 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
              <div className="pt-4 px-3 flex flex-col space-y-2">
                <button
                  id="mobile-nav-follow"
                  onClick={toggleFollow}
                  className={`w-full inline-flex justify-center items-center space-x-2 py-3 rounded-none text-xs font-bold tracking-widest uppercase font-mono transition-colors ${
                    isFollowing
                      ? "bg-slate-950 dark:bg-slate-800 text-gold border border-slate-950 dark:border-slate-800"
                      : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-805 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {isFollowing ? <UserCheck size={14} className="text-gold" /> : <UserPlus size={14} />}
                  <span>{isFollowing ? "Following" : "Follow"}</span>
                </button>

                <button
                  id="mobile-nav-cta"
                  onClick={() => scrollToSection("contact")}
                  className="w-full inline-flex justify-center items-center space-x-2 bg-slate-900 dark:bg-slate-805 py-3 rounded-none text-xs font-bold text-white dark:text-neutral-200 tracking-widest uppercase font-mono hover:bg-gold hover:text-slate-950 transition-colors"
                >
                  <span>Book Free Consultation</span>
                  <ArrowUpRight size={14} className="text-gold" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
