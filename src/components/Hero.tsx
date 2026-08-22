import React from "react";
import { motion } from "motion/react";
import { ArrowRight, PhoneCall, Sparkles, Award, Shield, DollarSign, Maximize2, X, Clock, Zap, UserPlus, UserCheck, Bot } from "lucide-react";
import { useApp } from "../context/AppContext";

// Declare portrait asset URL path directly
const aliPortrait = new URL("../assets/images/regenerated_image_1780166588314.jpg", import.meta.url).href;

interface HeroProps {
  onCtaClick: () => void;
  onSecondaryClick: () => void;
}

export default function Hero({ onCtaClick, onSecondaryClick }: HeroProps) {
  const { isFollowing, toggleFollow, addNotification, addToast, personalInfo } = useApp();
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [transferEmail, setTransferEmail] = React.useState("");
  const [isTransferring, setIsTransferring] = React.useState(false);
  const [transferSuccess, setTransferSuccess] = React.useState(false);

  const handleTransferBlueprint = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setIsTransferring(true);
    
    const subject = "Request: On-Chain Triple Expert Blueprint Delivery";
    const specs = "Wants to align Web Solutions, Infrastructure Architecture, & Viral Growth. High-definition copy requested.";

    try {
      const payload = {
        name: "Strategic Blueprint Requestor",
        contact: transferEmail.trim() || "Unspecified client workspace",
        interest: specs,
        _subject: `💎 HERO BLUEPRINT DELIVERY ACTION: ${transferEmail.trim() || "Partner Coordinate"}`,
        _replyto: transferEmail.trim() || personalInfo.email,
        _honey: ""
      };

      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      await response.json();

      setIsTransferring(false);
      setTransferSuccess(true);

      addNotification(
        "Blueprint Action Dispatched",
        `Requested and details dispatched to official pipeline: ${personalInfo.email} for client: ${transferEmail.trim()}`,
        "system"
      );
      addToast(`🚀 BLUEPRINT TRANSFERRED: requirements for ${transferEmail.trim()} zipped to ${personalInfo.email}!`, "success");

      setTimeout(() => {
        setTransferSuccess(false);
        setTransferEmail("");
      }, 5000);
    } catch (error) {
      console.error("AJAX error in Hero blueprint:", error);
      
      // Quick fallback trigger mailto
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Hello Muhammad Ali,\n\nI am requesting details regarding your "On-Chain Triple Expert Blueprint Metrics".\n\nContact Workspace: ${transferEmail.trim()}\nRequirements: ${specs}\n\nWarm regards`
      )}`;
      
      window.location.href = mailtoUrl;

      setIsTransferring(false);
      setTransferSuccess(true);

      addNotification(
        "Blueprint Draft Saved",
        `Dispatched fallback client drafting for: ${personalInfo.email}`,
        "system"
      );
      addToast(`📧 Checking mail server workspace...`, "info");

      setTimeout(() => {
        setTransferSuccess(false);
        setTransferEmail("");
      }, 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Decorative luxury abstract lines */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-radial from-gold/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-radial from-gold/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#f1f1f1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Copy Column */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tag/Badge */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center px-3.5 py-1 rounded-sm text-[10px] font-bold tracking-widest font-mono uppercase bg-gold-light dark:bg-slate-900/80 border border-gold/30 gold-text shadow-xs">
                <Sparkles size={11} className="mr-1.5 text-gold animate-pulse" />
                Expert Consultant
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              <span className="block font-mono text-sm uppercase tracking-[0.25em] font-bold text-slate-400 dark:text-slate-500 mb-2">
                {personalInfo.name}
              </span>
              <span className="block tracking-tighter text-3xl sm:text-4xl lg:text-5xl uppercase font-mono font-black mt-1 text-slate-900 dark:text-white">
                {personalInfo.title}
              </span>
            </motion.h1>

            {/* Paragraph Introduction */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-sm sm:text-base text-slate-500 dark:text-slate-300 max-w-xl leading-relaxed font-sans"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Interaction Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4 items-center"
            >
              <button
                id="hero-cta-book"
                onClick={onCtaClick}
                className="inline-flex items-center justify-center px-8 py-4 rounded-none text-[11px] font-bold tracking-widest text-white bg-slate-900 hover:bg-gold hover:text-slate-950 uppercase font-mono transition-all duration-300 shadow-md active:scale-98 cursor-pointer"
              >
                <span>Hire Me</span>
                <PhoneCall size={13} className="ml-2" />
              </button>

              <button
                id="hero-cta-hire"
                onClick={onSecondaryClick}
                className="inline-flex items-center justify-center px-8 py-4 rounded-none text-[11px] font-bold tracking-widest gold-text border-2 gold-border bg-white dark:bg-slate-900 hover:bg-gold-light dark:hover:bg-slate-800 hover:text-gold-dark uppercase font-mono transition-all duration-300 active:scale-98 cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowRight size={13} className="ml-2" />
              </button>

              <button
                id="hero-cta-follow"
                onClick={toggleFollow}
                className={`inline-flex items-center justify-center px-8 py-4 rounded-none text-[11px] font-bold tracking-widest uppercase font-mono transition-all duration-300 active:scale-98 cursor-pointer border ${
                  isFollowing
                    ? "bg-slate-950 dark:bg-slate-800 text-gold border-slate-950 dark:border-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700"
                    : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/55"
                }`}
              >
                {isFollowing ? <UserCheck size={13} className="mr-2 text-gold animate-pulse" /> : <UserPlus size={13} className="mr-2" />}
                <span>{isFollowing ? "Following" : "Follow"}</span>
              </button>
            </motion.div>

            {/* Trust Metrics Sub-Panel */}
            <motion.div
              variants={itemVariants}
              className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800/80 pt-8"
            >
              <div className="text-left">
                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tighter">
                  {personalInfo.experienceYears}+
                </span>
                <span className="block text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono mt-1 font-bold">
                  Years Exp
                </span>
              </div>
              <div className="text-left">
                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tighter">
                  {personalInfo.completedProjects}+
                </span>
                <span className="block text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono mt-1 font-bold">
                  Brand Projects
                </span>
              </div>
              <div className="text-left">
                <span className="block text-2xl sm:text-3xl font-extrabold gold-text font-mono tracking-tighter">
                  {personalInfo.consultationHours}
                </span>
                <span className="block text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono mt-1 font-bold">
                  Consult Hours
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Media Column (Portrait and Floating Accent Cards) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] sm:aspect-[3/4.2] cursor-zoom-in group mb-4"
              onClick={() => setLightboxOpen(true)}
            >
              {/* Gold/Black Double Layer Frame */}
              <div className="absolute -inset-4 rounded-none border border-dashed border-gold/40 rotate-1 pointer-events-none" />
              <div className="absolute -inset-2 rounded-none border border-slate-100 dark:border-slate-900 -rotate-1 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-gold to-gold-light rounded-none -translate-x-3 translate-y-3 pointer-events-none opacity-80" />

              {/* Portrait Container */}
              <div className="relative h-full w-full rounded-none overflow-hidden bg-slate-950 shadow-2xl border border-slate-900">
                <img
                  src={aliPortrait}
                  alt="Muhammad Ali Portrait"
                  className="h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual hover alert for HD Zooming */}
                <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-slate-900 border border-gold/40 text-gold font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 flex items-center space-x-1.5 shadow-lg">
                    <Maximize2 size={11} className="animate-pulse" />
                    <span>View High-Definition</span>
                  </span>
                </div>
              </div>

              {/* Floating Element 1 - Info Card */}
              <div className="absolute -right-4 top-[15%] bg-white rounded-none p-3 shadow-xl border border-slate-100 flex items-center space-x-3 max-w-[170px]">
                <div className="w-8 h-8 rounded-none bg-gold-light flex items-center justify-center text-gold shrink-0">
                  <Shield size={15} />
                </div>
                <div>
                  <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-slate-400">Security</span>
                  <span className="block text-[10px] font-bold text-slate-900 tracking-tight leading-tight uppercase font-mono">Zero-Trust</span>
                </div>
              </div>

              {/* Floating Element 2 - Growth Indicator */}
              <div className="absolute -left-6 bottom-[25%] bg-slate-900 text-white rounded-none p-3 shadow-xl border border-slate-800 flex items-center space-x-3 max-w-[180px]">
                <div className="w-8 h-8 rounded-none bg-gold flex items-center justify-center text-slate-950 shrink-0">
                  <Award size={15} />
                </div>
                <div>
                  <span className="block text-[8px] font-mono uppercase tracking-widest gold-text font-bold">Influence</span>
                  <span className="block text-[10px] font-bold text-white tracking-wider leading-tight uppercase font-mono">12M+ Views</span>
                </div>
              </div>

              {/* Floating Element 3 - Crypto Badge */}
              <div className="absolute left-1/4 -bottom-4 bg-white rounded-none px-4 py-2 border border-slate-200/80 shadow-lg flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-slate-950">
                  On-Chain Architecture
                </span>
              </div>
            </motion.div>

            {/* Descriptive Roadmap detailing content displayed in the image */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 w-full max-w-[340px] sm:max-w-[380px] bg-slate-950 text-white p-5 border border-slate-850 rounded-none shadow-xl relative overflow-hidden text-left"
            >
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center space-x-2 text-gold font-mono text-[9px] font-bold tracking-widest uppercase mb-3">
                <Zap size={10} className="animate-pulse animate-duration-1000" />
                <span>On-Chain Triple Expert Blueprint</span>
              </div>
              
              <h4 className="text-xs font-bold font-sans text-neutral-100 uppercase tracking-tight mb-2.5">
                Harmonizing Innovation, Web Solutions, & Engagement
              </h4>
              
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-4">
                This digital blueprint bridges advanced enterprise logic, physical high-performance routines, structured content pipelines, and decentralized media frameworks.
              </p>

              <div className="space-y-3 font-mono text-[10px]">
                <div className="p-2.5 bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-colors">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-gold font-bold">01 //</span>
                    <span className="font-bold text-neutral-200 uppercase text-[10px]">5:00 AM Routine & Discipline</span>
                  </div>
                  <p className="text-[9.5px] text-slate-500 font-sans leading-normal">
                    Fajr context anchoring, tactical workout regimes, healthy mind frameworks, and fast-start planning matrices.
                  </p>
                </div>

                <div className="p-2.5 bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-colors">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-gold font-bold">02 //</span>
                    <span className="font-bold text-neutral-200 uppercase text-[10px]">Enterprise Tech Stack</span>
                  </div>
                  <p className="text-[9.5px] text-slate-500 font-sans leading-normal">
                    System Architecture designs, advanced cloud computing, zero-trust cyber protocols, and full data pipeline optimization.
                  </p>
                </div>

                <div className="p-2.5 bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-colors">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-gold font-bold">03 //</span>
                    <span className="font-bold text-neutral-200 uppercase text-[10px]">Converting Followers To Clients</span>
                  </div>
                  <p className="text-[9.5px] text-slate-500 font-sans leading-normal">
                    Funnels turning large view counts into corporate client pipelines and brand partners utilizing high-leverage growth engines.
                  </p>
                </div>
              </div>

              {/* Transfer Blueprint Interface */}
              <div className="mt-5 pt-5 border-t border-white/10 relative z-10 text-left">
                <span className="block text-[8px] font-mono tracking-widest uppercase text-gold font-bold mb-1">
                  Blueprint Dispatch Engine
                </span>
                <p className="text-[9.5px] text-slate-400 mb-3 font-sans leading-relaxed">
                  Instantly receive high-definition metric details or transfer them directly by official email.
                </p>
                
                <form onSubmit={handleTransferBlueprint} className="space-y-2">
                  <div className="relative">
                    <input 
                      type="email"
                      required
                      value={transferEmail}
                      onChange={(e) => setTransferEmail(e.target.value)}
                      placeholder="Enter your email to receive blueprints"
                      className="w-full bg-slate-900 border border-slate-800 text-[10px] text-white px-3 py-2 rounded-none font-mono focus:outline-none focus:border-gold/40 placeholder:text-slate-550 transition-colors"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isTransferring}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-gold hover:bg-gold-light text-slate-950 font-mono text-[9px] font-extrabold uppercase tracking-widest py-2.5 transition-colors cursor-pointer"
                  >
                    <span>{isTransferring ? "TRANSFERRING..." : transferSuccess ? "SENT TO MAIL CLIENT!" : "TRANSFER BLUEPRINT DETAILS"}</span>
                    <ArrowRight size={10} className="text-slate-950" />
                  </button>
                </form>
                
                <div className="text-[8.5px] text-slate-500 font-mono mt-1.5 text-center">
                  Addressing Workspace Channel: {personalInfo.email}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative max-w-4xl w-full h-[90vh] bg-neutral-900 border border-slate-800 p-2 sm:p-4 rounded-none flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">System Map Infographic</span>
                <h3 className="text-normal sm:text-lg font-bold font-sans text-white uppercase tracking-tight mt-0.5">Muhammad Ali Blueprint Matrix</h3>
              </div>
              <button 
                onClick={() => setLightboxOpen(false)}
                className="w-8 h-8 rounded-none border border-white/15 bg-white/5 hover:bg-gold hover:text-slate-950 hover:border-transparent transition-all duration-300 flex items-center justify-center text-white cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative flex-1 overflow-auto rounded-none bg-slate-950 border border-white/5 flex items-center justify-center p-2">
              <img 
                src={aliPortrait} 
                alt="Muhammad Ali Complete Infographic Blueprint" 
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[10px] font-mono text-slate-500 mt-3 pt-3 border-t border-white/10">
              <span>Interactive System Map // Harmonizing Innovation, Web Solutions & Audience Engagement. Press anywhere outside to dismiss.</span>
              <button
                onClick={() => handleTransferBlueprint()}
                className="inline-flex items-center space-x-1.5 bg-gold text-slate-950 px-3.5 py-1.5 font-bold uppercase tracking-widest text-[9px] hover:bg-gold-light transition-all rounded-none cursor-pointer shrink-0"
              >
                <span>Transfer Blueprint via Email</span>
                <ArrowRight size={10} className="text-slate-950" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
