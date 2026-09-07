import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProfessionalHero from "./components/ProfessionalHero";
import SearchBar from "./components/SearchBar";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import ArticleView from "./components/ArticleView";
import BlogPreview from "./components/BlogPreview";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import AdBanner from "./components/AdBanner";
import ProfessionalHighlights from "./components/ProfessionalHighlights";
import { ArrowUp, MessageCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AppProvider, useApp } from "./context/AppContext";
import FollowModal from "./components/FollowModal";

function AppContent() {
  const { personalInfo, activeSection, setActiveSection } = useApp();
  const [preSelectedService, setPreSelectedService] = useState("");
  const [showToTopBtn, setShowToTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowToTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activeSection]);
  const scrollToSection = (id: string) => setActiveSection(id);
  const handleInquireService = (serviceTitle: string) => { setPreSelectedService(serviceTitle); scrollToSection("contact"); };
  const whatsappUrl = `https://wa.me/${personalInfo.whatsapp.replace(/[+\s-]/g, "")}?text=${encodeURIComponent(`Hi ${personalInfo.name}, I'd like to discuss a project.`)}`;

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-gold selection:text-slate-950 transition-colors duration-300">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="pt-16"><AdBanner location="header" /></div>
      <main className={activeSection !== "home" ? "min-h-[calc(100vh-240px)]" : ""}>
        <AnimatePresence mode="wait">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
            {activeSection === "home" && <>
              <ProfessionalHero onContact={() => scrollToSection("contact")} onProjects={() => scrollToSection("portfolio")} />
              <ProfessionalHighlights onContact={() => scrollToSection("contact")} onProjects={() => scrollToSection("portfolio")} />
              <SearchBar />
              <AdBanner location="homepage" className="my-8 max-w-7xl mx-auto" />
              <BlogPreview />
            </>}
            {activeSection === "about" && <About />}
            {activeSection === "services" && <Services onInquireService={handleInquireService} />}
            {activeSection === "portfolio" && <Portfolio />}
            {activeSection === "skills" && <Skills />}
            {activeSection === "blog" && <Blog />}
            {activeSection === "article" && <ArticleView />}
            {activeSection === "testimonials" && <Testimonials />}
            {activeSection === "contact" && <Contact preSelectedService={preSelectedService} setPreSelectedService={setPreSelectedService} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <AdBanner location="footer" className="mt-8" />
      <footer className="bg-neutral-950 text-neutral-400 py-12 border-t border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-5 text-xs text-neutral-500 font-mono">
            <div className="flex items-center space-x-3 text-left select-none"><div className="w-9 h-9 bg-gold/10 border border-gold/40 flex items-center justify-center font-bold gold-text">MA</div><div><span className="block font-semibold text-neutral-200 tracking-wide">{personalInfo.name.toUpperCase()}</span><span className="block text-[10px] text-neutral-500 tracking-widest">AI • DATA • WEB • DIGITAL GROWTH</span></div></div>
            <div className="flex items-center gap-2 text-neutral-500 uppercase tracking-widest"><Sparkles size={11} className="text-gold"/><span>BUILD • AUTOMATE • GROW</span></div>
            <div className="text-neutral-600">PORTFOLIO 2.0</div>
          </div>
        </div>
      </footer>
      <a id="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-6 left-6 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform duration-300"><MessageCircle size={23}/></a>
      {showToTopBtn && <button id="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-40 p-3 bg-slate-900 text-white hover:bg-gold hover:text-slate-950 shadow-lg border border-slate-800 transition-all cursor-pointer" aria-label="Scroll to top"><ArrowUp size={18}/></button>}
    </div>
  );
}

export default function App() { return <AppProvider><AppContent/><FollowModal/></AppProvider>; }
