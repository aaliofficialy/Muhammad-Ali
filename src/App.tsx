import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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
import { ArrowUp, Sparkles, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AppProvider, useApp } from "./context/AppContext";
import FollowModal from "./components/FollowModal";
import AdminModal from "./components/AdminModal";

function AppContent() {
  const { setShowAdminModal, addToast, personalInfo, activeSection, setActiveSection } = useApp();
  const [preSelectedService, setPreSelectedService] = useState("");
  const [showToTopBtn, setShowToTopBtn] = useState(false);
  const [showAdminLink, setShowAdminLink] = useState(() => {
    return sessionStorage.getItem("muhammad_ali_admin_authed") === "true";
  });

  useEffect(() => {
    // Check URL parameters or hash on initial load to automatically boot Admin Panel
    const checkUrlForAdmin = () => {
      const params = new URLSearchParams(window.location.search);
      const isParamAdmin = params.get("admin") === "true" || params.get("muhammadaliadminportal") === "true";
      const isHashAdmin = window.location.hash === "#admin" || window.location.hash === "#muhammadaliadminportal";

      if (isParamAdmin || isHashAdmin) {
        setShowAdminModal(true);
        setShowAdminLink(true);
        addToast("🔑 Admin credentials unlocked via URL routing.", "success");
      }
    };

    checkUrlForAdmin();

    let pressed: string[] = [];
    const secretCode = "muhammadaliadminportal";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keydown if user is typing in forms or input fields
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      pressed.push(e.key.toLowerCase());
      pressed = pressed.slice(-secretCode.length);

      if (pressed.join("") === secretCode) {
        setShowAdminModal(true);
        setShowAdminLink(true);
        addToast("🔑 Admin credentials modal unlocked.", "success");
        pressed = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowAdminModal, addToast]);

  // Scroll to top when active section changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [activeSection]);

  // Handle scroll trigger for Back-to-Top safety button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowToTopBtn(true);
      } else {
        setShowToTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
  };

  const handleInquireService = (serviceTitle: string) => {
    setPreSelectedService(serviceTitle);
    scrollToSection("contact");
  };

  const scrollBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-gold selection:text-slate-950 transition-colors duration-300">
      {/* Floating Header */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="pt-16">
        <AdBanner location="header" />
      </div>

      {/* Main Sections */}
      <main className={activeSection !== "home" ? "min-h-[calc(100vh-240px)]" : ""}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {activeSection === "home" && (
              <>
                <Hero 
                  onCtaClick={() => scrollToSection("contact")} 
                  onSecondaryClick={() => scrollToSection("services")} 
                />
                <SearchBar />
                <AdBanner location="homepage" className="my-8 max-w-7xl mx-auto" />
                <BlogPreview />
              </>
            )}

            {activeSection === "about" && <About />}

            {activeSection === "services" && (
              <Services onInquireService={handleInquireService} />
            )}

            {activeSection === "portfolio" && <Portfolio />}

            {activeSection === "skills" && <Skills />}

            {activeSection === "blog" && <Blog />}

            {activeSection === "article" && <ArticleView />}

            {activeSection === "testimonials" && <Testimonials />}

            {activeSection === "contact" && (
              <Contact 
                preSelectedService={preSelectedService} 
                setPreSelectedService={setPreSelectedService} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <AdBanner location="footer" className="mt-8" />

      {/* Mini-Footer Banner */}
      <footer className="bg-neutral-950 text-neutral-400 py-12 border-t border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-neutral-500 font-mono">
            <div className="flex items-center space-x-2 text-left select-none">
              <div className="w-8 h-8 rounded-none bg-gold/15 border border-gold/35 bg-black flex items-center justify-center font-bold gold-text cursor-default">
                <span>MA</span>
              </div>
              <div>
                <span className="block font-semibold text-neutral-200">{personalInfo.name.toUpperCase()}</span>
                <span className="block text-[10px] text-neutral-500">{personalInfo.title.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-neutral-400">
              <Sparkles size={11} className="text-gold animate-pulse" />
              <span>CRAFTED IN MODERN REACT & TAILWIND (GOLD EDITION)</span>
            </div>

            <div className="flex items-center space-x-2">
              <span>BUILD VERSION: 1.5.0 (STABLE)</span>
              {showAdminLink && (
                <>
                  <span>•</span>
                  <button
                    id="footer-admin-link"
                    onClick={() => setShowAdminModal(true)}
                    className="text-gold hover:text-white transition-colors cursor-pointer font-bold tracking-widest uppercase"
                  >
                    ADMIN PORTAL
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top float button */}
      {showToTopBtn && (
        <button
          id="scroll-to-top"
          onClick={scrollBackToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-none bg-slate-900 text-white hover:bg-gold hover:text-slate-950 shadow-lg border border-slate-850 transition-all duration-300 transform scale-100 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <FollowModal />
      <AdminModal />
    </AppProvider>
  );
}
