import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, RefreshCw, Mic, MicOff } from "lucide-react";
import { useApp } from "../context/AppContext";

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

export default function SearchBar() {
  const { 
    searchQuery, 
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  } = useApp();
  
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
    <div id="desktop-search-container" className="flex items-center flex-1 max-w-xs mx-auto my-8 relative">
      <div className="relative w-full group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={14} className="text-slate-400 group-focus-within:text-gold transition-colors" />
        </div>
        <input
          id="search-input-desktop"
          type="text"
          placeholder="Search services, projects, articles..."
          value={searchQuery}
          onFocus={() => setShowRecent(true)}
          onBlur={() => setTimeout(() => setShowRecent(false), 200)}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchQuery(sanitizeSearchInput(e.target.value))}
          className="block w-full pl-9 pr-16 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-none focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all font-mono placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1.5">
          {searchQuery && (
            <button
              id="clear-search-desktop"
              onClick={() => setSearchQuery("")}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={12} />
            </button>
          )}
          <button
            id="voice-search-desktop"
            onClick={toggleVoiceSearch}
            className={`relative p-1.5 flex items-center justify-center transition-colors ${
              isRecording ? "text-slate-900 dark:text-white" : "text-slate-400 hover:text-gold"
            }`}
            title="Voice Search"
          >
            {isRecording ? (
              <>
                <BreathingPulse isRecording={isRecording} />
                <MicOff size={14} className="relative z-10" />
              </>
            ) : (
              <Mic size={14} />
            )}
          </button>
        </div>
      </div>

      {/* Recent Searches Dropdown - Desktop */}
      <AnimatePresence>
        {showRecent && recentSearches.length > 0 && (
          <motion.div
            id="recent-searches-dropdown-desktop"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden"
          >
            <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">Recent History</span>
              <button 
                onClick={(e) => { e.stopPropagation(); clearRecentSearches(); }}
                className="text-[9px] text-gold hover:underline uppercase font-bold font-mono"
              >
                Clear
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {recentSearches.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRecentClick(q)}
                  className="w-full text-left px-4 py-2.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-gold transition-colors font-mono flex items-center space-x-2"
                >
                  <RefreshCw size={10} className="text-slate-300" />
                  <span className="truncate">{q}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
