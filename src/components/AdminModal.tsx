import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Mail, Check, Sparkles, RefreshCw, Database, Bell, LayoutGrid, Heart, Edit3, Plus, RefreshCcw, LogOut, DollarSign, Megaphone } from "lucide-react";
import { useApp } from "../context/AppContext";
import { format } from "date-fns";
import { auth } from "../lib/firebase";
import { signInAnonymously, signOut } from "firebase/auth";

export default function AdminModal() {
  const { 
    showAdminModal, 
    setShowAdminModal, 
    testimonials, 
    notifications, 
    addNotification, 
    addToast,
    clearNotifications,
    addTestimonial,
    deleteTestimonial,
    personalInfo,
    setPersonalInfo,
    updatePersonalInfo,
    services,
    addService,
    deleteService,
    updateService,
    projects,
    addProject,
    deleteProject,
    updateProject,
    articles,
    addArticle,
    deleteArticle,
    updateArticle,
    ads,
    addAd,
    updateAd,
    deleteAd
  } = useApp();

  const [activeTab, setActiveTab] = useState<"profile" | "services" | "projects" | "articles" | "ads" | "testimonials" | "leads" | "logs">("profile");

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("muhammad_ali_admin_authed") === "true";
  });
  const [passcodeInput, setPasscodeInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Local helper states for creating a custom log or testimonial direct from admin panel
  const [testName, setTestName] = useState("");
  const [testRole, setTestRole] = useState("");
  const [testCompany, setTestCompany] = useState("");
  const [testRating, setTestRating] = useState(5);
  const [testContent, setTestContent] = useState("");

  // PROFILE STATE
  const [profName, setProfName] = useState(personalInfo.name);
  const [profTitle, setProfTitle] = useState(personalInfo.title);
  const [profTagline, setProfTagline] = useState(personalInfo.tagline);
  const [profEmail, setProfEmail] = useState(personalInfo.email);
  const [profLocation, setProfLocation] = useState(personalInfo.location);
  const [profWhatsapp, setProfWhatsapp] = useState(personalInfo.whatsapp);
  const [profBioShort, setProfBioShort] = useState(personalInfo.bioShort);
  const [profItExp, setProfItExp] = useState(personalInfo.itExpertiseDescription);
  const [profCryptoExp, setProfCryptoExp] = useState(personalInfo.cryptoExpertiseDescription);
  const [profLinkedin, setProfLinkedin] = useState(personalInfo.linkedin);
  const [profTwitter, setProfTwitter] = useState(personalInfo.twitter);
  const [profGithub, setProfGithub] = useState(personalInfo.github);
  const [profExpYears, setProfExpYears] = useState(personalInfo.experienceYears);
  const [profDoneProjects, setProfDoneProjects] = useState(personalInfo.completedProjects);
  const [profHours, setProfHours] = useState(personalInfo.consultationHours);
  
  // ARTICLES MANAGEMENT STATE
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [artTitle, setArtTitle] = useState("");
  const [artCategory, setArtCategory] = useState("");
  const [artThumbnail, setArtThumbnail] = useState("");
  const [artTags, setArtTags] = useState("");
  const [artStatus, setArtStatus] = useState<"draft" | "published">("published");
  const [artExcerpt, setArtExcerpt] = useState("");
  const [artContent, setArtContent] = useState("");
  const [artSeoTitle, setArtSeoTitle] = useState("");
  const [artSeoDesc, setArtSeoDesc] = useState("");
  const [artSeoKeywords, setArtSeoKeywords] = useState("");

  const [newArtTitle, setNewArtTitle] = useState("");
  const [newArtCategory, setNewArtCategory] = useState("");
  const [newArtThumbnail, setNewArtThumbnail] = useState("");
  const [newArtTags, setNewArtTags] = useState("");
  const [newArtExcerpt, setNewArtExcerpt] = useState("");
  const [newArtContent, setNewArtContent] = useState("");
  const [newArtSeoTitle, setNewArtSeoTitle] = useState("");
  const [newArtSeoDesc, setNewArtSeoDesc] = useState("");
  const [newArtSeoKeywords, setNewArtSeoKeywords] = useState("");

  // ADS MANAGEMENT STATE
  const [editingAdId, setEditingAdId] = useState<string | null>(null);
  const [adName, setAdName] = useState("");
  const [adCode, setAdCode] = useState("");
  const [adLocation, setAdLocation] = useState<"homepage" | "sidebar" | "header" | "footer" | "between_articles" | "blog_pages" | "article_specific">("homepage");
  const [adArticleId, setAdArticleId] = useState("");
  const [adEnabled, setAdEnabled] = useState(true);

  const [newAdName, setNewAdName] = useState("");
  const [newAdCode, setNewAdCode] = useState("");
  const [newAdLocation, setNewAdLocation] = useState<"homepage" | "sidebar" | "header" | "footer" | "between_articles" | "blog_pages" | "article_specific">("homepage");
  const [newAdArticleId, setNewAdArticleId] = useState("");
  const [newAdEnabled, setNewAdEnabled] = useState(true);

  // Sync profile values if personalInfo changes
  useEffect(() => {
    setProfName(personalInfo.name);
    setProfTitle(personalInfo.title);
    setProfTagline(personalInfo.tagline);
    setProfEmail(personalInfo.email);
    setProfLocation(personalInfo.location);
    setProfWhatsapp(personalInfo.whatsapp);
    setProfBioShort(personalInfo.bioShort);
    setProfItExp(personalInfo.itExpertiseDescription);
    setProfCryptoExp(personalInfo.cryptoExpertiseDescription);
    setProfLinkedin(personalInfo.linkedin);
    setProfTwitter(personalInfo.twitter);
    setProfGithub(personalInfo.github);
    setProfExpYears(personalInfo.experienceYears);
    setProfDoneProjects(personalInfo.completedProjects);
    setProfHours(personalInfo.consultationHours);
  }, [personalInfo]);

  // SERVICES MANAGEMENT STATE
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [servTitle, setServTitle] = useState("");
  const [servCategory, setServCategory] = useState<"IT" | "Digital" | "Consulting">("IT");
  const [servDescription, setServDescription] = useState("");
  const [servIcon, setServIcon] = useState("Computer");
  const [servBadge, setServBadge] = useState("");
  const [servBulletsInput, setServBulletsInput] = useState("");
  const [servCta, setServCta] = useState("");

  const [newServTitle, setNewServTitle] = useState("");
  const [newServCategory, setNewServCategory] = useState<"IT" | "Digital" | "Consulting">("IT");
  const [newServDescription, setNewServDescription] = useState("");
  const [newServIcon, setNewServIcon] = useState("Computer");
  const [newServBadge, setNewServBadge] = useState("");
  const [newServBulletsInput, setNewServBulletsInput] = useState("");
  const [newServCta, setNewServCta] = useState("");

  // PROJECTS MANAGEMENT STATE
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState<"IT / Dev" | "Crypto" | "Social Growth">("IT / Dev");
  const [projDescription, setProjDescription] = useState("");
  const [projTagline, setProjTagline] = useState("");
  const [projMetric, setProjMetric] = useState("");
  const [projLink, setProjLink] = useState("");

  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjCategory, setNewProjCategory] = useState<"IT / Dev" | "Crypto" | "Social Growth">("IT / Dev");
  const [newProjDescription, setNewProjDescription] = useState("");
  const [newProjTagline, setNewProjTagline] = useState("");
  const [newProjMetric, setNewProjMetric] = useState("");
  const [newProjLink, setNewProjLink] = useState("");

  if (!showAdminModal) return null;

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcodeInput.trim();

    if (cleanPass === "ALIMASTER2026") {
      try {
        if (auth) {
          await signInAnonymously(auth);
        }
        setIsAuthenticated(true);
        sessionStorage.setItem("muhammad_ali_admin_authed", "true");
        setLoginError("");
        addToast("🔓 Administrator access approved. Welcome back, Ali!", "success");
        addNotification("Admin Session Opened", "Secure administration access authorized.", "system");
      } catch (err) {
        addToast("Failed to authenticate with Firebase.", "error");
      }
    } else {
      setLoginError("ACCESS DENIED: Credentials mismatch. Security signature recorded.");
      addToast("❌ Access Denied: Invalid passcode.", "error");
      addNotification("Unauthorized Access Blocked", "Failed passcode attempt recorded.", "system");
    }
  };

  const handleAdminLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      setIsAuthenticated(false);
      sessionStorage.removeItem("muhammad_ali_admin_authed");
      setPasscodeInput("");
      addToast("Logged out & Admin Portal is now concealed.", "info");
      setShowAdminModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      addToast("Sign out failed.", "error");
    }
  };

  // Clear a specific testimonial from state & storage
  const handleDeleteTestimonial = (id: string) => {
    deleteTestimonial(id);
  };

  const handleCreateTestimonialDirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !testContent) {
      addToast("Please fill Name and Content", "warning");
      return;
    }
    addTestimonial(testName, testRole, testCompany, testRating, testContent);
    // Reset inputs
    setTestName("");
    setTestRole("");
    setTestCompany("");
    setTestRating(5);
    setTestContent("");
    addToast("Client testimonial logged successfully!", "success");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePersonalInfo({
      name: profName,
      title: profTitle,
      tagline: profTagline,
      email: profEmail,
      location: profLocation,
      whatsapp: profWhatsapp,
      bioShort: profBioShort,
      itExpertiseDescription: profItExp,
      cryptoExpertiseDescription: profCryptoExp,
      linkedin: profLinkedin,
      twitter: profTwitter,
      github: profGithub,
      completedProjects: Number(profDoneProjects),
      experienceYears: Number(profExpYears),
      clientRetention: personalInfo.clientRetention,
      whatsappLink: personalInfo.whatsappLink,
      consultationHours: profHours.toString()
    });
  };

  const triggerMockFormSubmitLead = () => {
    addNotification(
      "Simulated Enterprise Contact Received",
      `System tested the FormSubmit.co integration endpoint for address: ${personalInfo.email}`,
      "system"
    );
    addToast("🔔 Test Mail Logged in System Notifications!", "info");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        {/* Backdrop overlay custom blur */}
        <motion.div
          id="admin-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAdminModal(false)}
          className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Main Form Grid Canvas */}
        <motion.div
          id="admin-modal-container"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 relative z-10 rounded-none shadow-2xl flex flex-col justify-start"
        >
          {/* Close button top right */}
          <button
            id="admin-modal-close-trigger"
            onClick={() => setShowAdminModal(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors block p-2 cursor-pointer z-20"
            aria-label="Close Admin Panel"
          >
            <X size={18} />
          </button>

          {/* Header Title displaying stats */}
          <div className="border-b border-slate-100 dark:border-slate-900 pb-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono font-bold tracking-widest text-gold uppercase mb-1">
                <Database size={10} className="animate-spin text-gold" />
                <span>Active Terminal</span>
              </div>
              <h2 className="text-xl font-black font-sans tracking-tight text-slate-950 dark:text-neutral-100 uppercase">
                ADMINISTRATION & LEAD BLUEPRINT CRM
              </h2>
            </div>

            {/* Quick telemetry feedback */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-2xs font-mono text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/50 p-2 border border-slate-200/50 dark:border-slate-900">
              <div>
                STATUS: <span className={isAuthenticated ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"}>● {isAuthenticated ? "DECRYPTED" : "ENCRYPTED LCK"}</span>
              </div>
              {isAuthenticated ? (
                <>
                  <div>
                    REVIEWS: <span className="text-gold font-bold">{testimonials.length} ITEMS</span>
                  </div>
                  <div>
                    MAILBOX: <span className="text-blue-400 italic opacity-60">[ID MASKED FOR PRIVACY]</span>
                  </div>
                  <button
                    onClick={handleAdminLogout}
                    className="text-red-500 hover:underline uppercase tracking-wider font-bold text-3xs cursor-pointer md:ml-auto"
                  >
                    Logout Console
                  </button>
                </>
              ) : (
                <div className="text-red-500 font-bold">
                  SESSION PRIVATE
                </div>
              )}
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="py-8 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-4 animate-pulse">
                <Database size={24} />
              </div>
              <div className="text-center mb-6">
                <span className="text-[9px] font-mono tracking-widest text-red-500 font-bold uppercase">
                  ADMIN IDENTITY CHALLENGE
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-950 dark:text-neutral-100 font-sans mt-1">
                  Verification Required
                </h3>
                <p className="text-2xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Only the portfolio owner is authorized. Enter your credentials:
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="w-full space-y-4">
                <div>
                  <label htmlFor="admin-email" className="block text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Verified Administrator ID
                  </label>
                  <input
                    id="admin-email"
                    type="password"
                    readOnly
                    value="************************"
                    className="w-full px-3 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-mono rounded-none cursor-not-allowed outline-none select-none"
                  />
                </div>

                <div>
                  <label htmlFor="admin-passcode" className="block text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Security Key / Master Passcode
                  </label>
                  <input
                    id="admin-passcode"
                    type="password"
                    required
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    placeholder="••••••••••••••"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-950 dark:text-slate-100 focus:outline-none focus:border-red-500 rounded-none font-mono"
                  />

                </div>

                {loginError && (
                  <p className="text-[10px] font-mono font-bold text-red-500 text-center mt-2 uppercase tracking-wide">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-none cursor-pointer"
                >
                  DECRYPT CRM CONSOLE
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Grid Tabs Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1 bg-slate-50 dark:bg-slate-900 p-1 mb-6 border border-slate-200/80 dark:border-slate-900">
                <button
                  id="admin-tab-profile"
                  onClick={() => setActiveTab("profile")}
                  className={`py-2 text-[10px] uppercase font-mono tracking-wider font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "profile"
                      ? "bg-slate-950 dark:bg-slate-800 text-gold shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Edit3 size={11} />
                  <span>Bio & Contacts</span>
                </button>
                <button
                  id="admin-tab-services"
                  onClick={() => setActiveTab("services")}
                  className={`py-2 text-[10px] uppercase font-mono tracking-wider font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "services"
                      ? "bg-slate-950 dark:bg-slate-800 text-gold shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Database size={11} />
                  <span>Services ({services.length})</span>
                </button>
                <button
                  id="admin-tab-articles"
                  onClick={() => setActiveTab("articles")}
                  className={`py-2 text-[10px] uppercase font-mono tracking-wider font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "articles"
                      ? "bg-slate-950 dark:bg-slate-800 text-gold shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Edit3 size={11} />
                  <span>Articles ({articles.length})</span>
                </button>
                <button
                  id="admin-tab-ads"
                  onClick={() => setActiveTab("ads")}
                  className={`py-2 text-[10px] uppercase font-mono tracking-wider font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "ads"
                      ? "bg-slate-950 dark:bg-slate-800 text-gold shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <DollarSign size={11} />
                  <span>Ads ({ads.length})</span>
                </button>
                <button
                  id="admin-tab-projects"
                  onClick={() => setActiveTab("projects")}
                  className={`py-2 text-[10px] uppercase font-mono tracking-wider font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "projects"
                      ? "bg-slate-950 dark:bg-slate-800 text-gold shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Sparkles size={11} />
                  <span>Projects ({projects.length})</span>
                </button>
                <button
                  id="admin-tab-testimonials"
                  onClick={() => setActiveTab("testimonials")}
                  className={`py-2 text-[10px] uppercase font-mono tracking-wider font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "testimonials"
                      ? "bg-slate-950 dark:bg-slate-800 text-gold shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <LayoutGrid size={11} />
                  <span>Reviews ({testimonials.length})</span>
                </button>
                <button
                  id="admin-tab-leads"
                  onClick={() => setActiveTab("leads")}
                  className={`py-2 text-[10px] uppercase font-mono tracking-wider font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "leads"
                      ? "bg-slate-950 dark:bg-slate-800 text-gold shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Mail size={11} />
                  <span>Mail Gateway</span>
                </button>
                <button
                  id="admin-tab-logs"
                  onClick={() => setActiveTab("logs")}
                  className={`py-2 text-[10px] uppercase font-mono tracking-wider font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "logs"
                      ? "bg-slate-950 dark:bg-slate-800 text-gold shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Bell size={11} />
                  <span>Signals ({notifications.length})</span>
                </button>
              </div>

              {/* Tab content renderer */}
              <div className="flex-1 min-h-[320px]">
                {activeTab === "profile" && (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-gold">
                        Edit Biography & Global Contact Details
                      </h3>
                      <button
                        type="submit"
                        className="p-1.5 px-6 bg-gold text-slate-950 font-mono text-[10px] uppercase tracking-widest font-extrabold hover:bg-gold-light transition-colors rounded-none cursor-pointer"
                      >
                        SAVE PROFILE DATA
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Owner Name</label>
                        <input
                          type="text"
                          value={profName}
                          onChange={(e) => setProfName(e.target.value)}
                          required
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Profile Title</label>
                        <input
                          type="text"
                          value={profTitle}
                          onChange={(e) => setProfTitle(e.target.value)}
                          required
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Official Email</label>
                        <input
                          type="email"
                          value={profEmail}
                          onChange={(e) => setProfEmail(e.target.value)}
                          required
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Location Address</label>
                        <input
                          type="text"
                          value={profLocation}
                          onChange={(e) => setProfLocation(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">WhatsApp Dial Phone</label>
                        <input
                          type="text"
                          value={profWhatsapp}
                          onChange={(e) => setProfWhatsapp(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Experience (Years)</label>
                        <input
                          type="number"
                          value={profExpYears}
                          onChange={(e) => setProfExpYears(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Completed Brand Projects</label>
                        <input
                          type="number"
                          value={profDoneProjects}
                          onChange={(e) => setProfDoneProjects(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Consultation Hours</label>
                        <input
                          type="text"
                          value={profHours}
                          onChange={(e) => setProfHours(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Slogan Tagline</label>
                      <input
                        type="text"
                        value={profTagline}
                        onChange={(e) => setProfTagline(e.target.value)}
                        required
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Narrative Biography Teaser</label>
                      <textarea
                        value={profBioShort}
                        onChange={(e) => setProfBioShort(e.target.value)}
                        required
                        rows={3}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-sans focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">IT Expert Pillar Description</label>
                        <textarea
                          value={profItExp}
                          onChange={(e) => setProfItExp(e.target.value)}
                          required
                          rows={3}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-sans focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Crypto & Social Growth Pillar Description</label>
                        <textarea
                          value={profCryptoExp}
                          onChange={(e) => setProfCryptoExp(e.target.value)}
                          required
                          rows={3}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-sans focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-900 pt-4">
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">LinkedIn Profile link</label>
                        <input
                          type="text"
                          value={profLinkedin}
                          onChange={(e) => setProfLinkedin(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">Twitter / X Profile link</label>
                        <input
                          type="text"
                          value={profTwitter}
                          onChange={(e) => setProfTwitter(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono uppercase text-slate-400 font-bold mb-1">GitHub Account link</label>
                        <input
                          type="text"
                          value={profGithub}
                          onChange={(e) => setProfGithub(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                  </form>
                )}

                {activeTab === "services" && (
                  <div className="space-y-6">
                    {/* Add service */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-200/80 dark:border-slate-900">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-gold mb-3 flex items-center gap-1.5">
                        <Plus size={12} />
                        <span>Add New Solution Service Page</span>
                      </h3>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!newServTitle || !newServDescription) {
                          addToast("Provide title and description at least.", "warning");
                          return;
                        }
                        addService({
                          id: `service-custom-${Date.now()}`,
                          title: newServTitle,
                          subtitle: newServBadge || "Customized Service Strategy",
                          category: newServCategory,
                          description: newServDescription,
                          icon: newServIcon || "Briefcase",
                          features: newServBulletsInput ? newServBulletsInput.split(",").map(b => b.trim()) : []
                        });
                        setNewServTitle("");
                        setNewServDescription("");
                        setNewServIcon("Computer");
                        setNewServBadge("");
                        setNewServBulletsInput("");
                        setNewServCta("");
                      }} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Service Title (e.g. Enterprise DevOps Setup)"
                          value={newServTitle}
                          onChange={(e) => setNewServTitle(e.target.value)}
                          required
                          className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <select
                          value={newServCategory}
                          onChange={(e) => setNewServCategory(e.target.value as any)}
                          className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-955 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none"
                        >
                          <option value="IT">IT & System Infrastructure</option>
                          <option value="Digital">Digital Growth & Media</option>
                          <option value="Consulting">Consulting & Advisory</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Lucide Icon (e.g. Network, Shield, Cpu, Activity)"
                          value={newServIcon}
                          onChange={(e) => setNewServIcon(e.target.value)}
                          className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <input
                          type="text"
                          placeholder="Badge Header Accent (e.g. ULTRA SECURE)"
                          value={newServBadge}
                          onChange={(e) => setNewServBadge(e.target.value)}
                          className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <input
                          type="text"
                          placeholder="CTA Button Label"
                          value={newServCta}
                          onChange={(e) => setNewServCta(e.target.value)}
                          className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <input
                          type="text"
                          placeholder="Highlights/Bullets (Comma Separated)"
                          value={newServBulletsInput}
                          onChange={(e) => setNewServBulletsInput(e.target.value)}
                          className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <div className="sm:col-span-2">
                          <textarea
                            placeholder="Detailed description mapping exact value parameters..."
                            value={newServDescription}
                            onChange={(e) => setNewServDescription(e.target.value)}
                            required
                            rows={1}
                            className="w-full px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                          />
                        </div>
                        <button
                          type="submit"
                          className="py-2 bg-gold text-slate-950 hover:bg-gold-light transition-colors uppercase font-mono tracking-widest font-extrabold text-2xs cursor-pointer"
                        >
                          REGISTER DIRECT SERVICE
                        </button>
                      </form>
                    </div>

                    {/* Editing Form Overlay if open */}
                    {editingServiceId && (
                      <div className="p-4 border-2 border-gold/40 bg-gold-light/[0.03] dark:bg-slate-900/80 mb-4 rounded-none">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-mono font-bold text-slate-950 dark:text-gold uppercase">
                            Edit Service: {editingServiceId}
                          </h4>
                          <button
                            onClick={() => setEditingServiceId(null)}
                            className="text-red-500 hover:underline uppercase text-3xs font-mono font-bold"
                          >
                            Cancel Edit
                          </button>
                        </div>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          updateService({
                            id: editingServiceId,
                            title: servTitle,
                            subtitle: servBadge || "Customized Service Strategy",
                            category: servCategory,
                            description: servDescription,
                            icon: servIcon || "Briefcase",
                            features: typeof servBulletsInput === "string" ? (servBulletsInput as string).split(",").map(b => b.trim()) : servBulletsInput,
                          });
                          setEditingServiceId(null);
                        }} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            placeholder="Service Title"
                            value={servTitle}
                            onChange={(e) => setServTitle(e.target.value)}
                            required
                            className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 focus:border-gold"
                          />
                          <select
                            value={servCategory}
                            onChange={(e) => setServCategory(e.target.value as any)}
                            className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 border border-slate-200 dark:border-slate-850 font-mono"
                          >
                            <option value="IT">IT & System Infrastructure</option>
                            <option value="Digital">Digital Growth & Media</option>
                            <option value="Consulting">Consulting & Advisory</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Lucide Icon"
                            value={servIcon}
                            onChange={(e) => setServIcon(e.target.value)}
                            className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-gold"
                          />
                          <input
                            type="text"
                            placeholder="Badge Accent"
                            value={servBadge}
                            onChange={(e) => setServBadge(e.target.value)}
                            className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-gold"
                          />
                          <input
                            type="text"
                            placeholder="CTA text"
                            value={servCta}
                            onChange={(e) => setServCta(e.target.value)}
                            className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-850 focus:border-gold"
                          />
                          <input
                            type="text"
                            placeholder="Bullets (comma separated)"
                            value={servBulletsInput}
                            onChange={(e) => setServBulletsInput(e.target.value)}
                            className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-gold"
                          />
                          <div className="sm:col-span-2">
                            <textarea
                              placeholder="Description"
                              value={servDescription}
                              onChange={(e) => setServDescription(e.target.value)}
                              required
                              rows={1}
                              className="w-full px-2.5 py-2 text-2xs bg-white dark:bg-slate-955 border border-slate-200 dark:border-slate-850 focus:border-gold shrink-0"
                            />
                          </div>
                          <button
                            type="submit"
                            className="py-2 bg-slate-950 text-gold hover:bg-gold hover:text-slate-950 transition-colors uppercase font-mono tracking-widest font-extrabold text-2xs cursor-pointer"
                          >
                            SAVE MODIFICATIONS
                          </button>
                        </form>
                      </div>
                    )}

                    {/* Services database display list */}
                    <div className="overflow-x-auto border-t border-slate-100 dark:border-slate-900 pt-5">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-gold mb-3">
                        Active Services Database Registry
                      </h3>
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-250 dark:border-slate-850 font-mono text-[9px] uppercase text-slate-400 tracking-widest">
                            <th className="py-2.5 font-bold">Category</th>
                            <th className="py-2.5 font-bold">Title</th>
                            <th className="py-2.5 font-bold">Description Preview</th>
                            <th className="py-2.5 font-bold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-900 font-sans text-xs">
                          {services.map((s) => (
                            <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/15">
                              <td className="py-3 font-mono text-2xs uppercase tracking-wider text-gold font-bold">
                                {s.category}
                              </td>
                              <td className="py-3 font-bold text-slate-950 dark:text-neutral-200">
                                {s.title}
                              </td>
                              <td className="py-3 max-w-xs truncate text-slate-500 dark:text-slate-400">
                                {s.description}
                              </td>
                              <td className="py-3 text-right space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingServiceId(s.id);
                                    setServTitle(s.title);
                                    setServCategory(s.category as any);
                                    setServDescription(s.description);
                                    setServIcon(s.icon);
                                    setServBadge(s.subtitle || (s as any).badge || "");
                                    setServBulletsInput(s.features ? s.features.join(", ") : ((s as any).bullets ? (s as any).bullets.join(", ") : ""));
                                    setServCta("");
                                  }}
                                  className="p-1 px-3 hover:bg-gold/10 text-2xs font-mono border border-slate-205 cursor-pointer rounded-none text-slate-950 dark:text-slate-50 hover:text-gold"
                                >
                                  Modify
                                </button>
                                <button
                                  onClick={() => deleteService(s.id)}
                                  className="p-1 px-3 border border-red-500/20 text-red-500 hover:bg-red-500/10 text-2xs font-mono cursor-pointer rounded-none"
                                >
                                  Purge
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "projects" && (
                  <div className="space-y-6">
                    {/* Add project */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-200/80 dark:border-slate-900">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-gold mb-3 flex items-center gap-1.5">
                        <Plus size={12} />
                        <span>Publish New Showcase Case Study</span>
                      </h3>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!newProjTitle || !newProjDescription) {
                          addToast("Provide title and description at least.", "warning");
                          return;
                        }
                        addProject({
                          id: `project-custom-${Date.now()}`,
                          title: newProjTitle,
                          category: newProjCategory as "IT / Dev" | "Crypto" | "Social Growth",
                          description: newProjDescription,
                          longDescription: newProjTagline,
                          metrics: [{ label: "Metric", value: newProjMetric }],
                          technologies: [],
                          image: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&q=80&w=800",
                          featured: false,
                          link: newProjLink
                        });
                        setNewProjTitle("");
                        setNewProjCategory("IT / Dev");
                        setNewProjDescription("");
                        setNewProjTagline("");
                        setNewProjMetric("");
                        setNewProjLink("");
                      }} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Project Title (e.g. EVM Layer-3 Scaling)"
                          value={newProjTitle}
                          onChange={(e) => setNewProjTitle(e.target.value)}
                          required
                          className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <select
                          value={newProjCategory}
                          onChange={(e) => setNewProjCategory(e.target.value as any)}
                          className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none"
                        >
                          <option value="IT / Dev">IT Infrastructure / Dev</option>
                          <option value="Crypto">On-Chain Crypto Solutions</option>
                          <option value="Social Growth">Social Audience Growth</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Metric Result (e.g. 98% ROI)"
                          value={newProjMetric}
                          onChange={(e) => setNewProjMetric(e.target.value)}
                          className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <input
                          type="text"
                          placeholder="Live Link / Source URL"
                          value={newProjLink}
                          onChange={(e) => setNewProjLink(e.target.value)}
                          className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <div className="sm:col-span-2">
                          <textarea
                            placeholder="Detailed case study summary content..."
                            value={newProjDescription}
                            onChange={(e) => setNewProjDescription(e.target.value)}
                            required
                            rows={1}
                            className="w-full px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                          />
                        </div>
                        <button
                          type="submit"
                          className="py-2 bg-gold text-slate-950 hover:bg-gold-light transition-colors uppercase font-mono tracking-widest font-extrabold text-2xs cursor-pointer"
                        >
                          POST TO LIVE PORTFOLIO
                        </button>
                      </form>
                    </div>

                    {/* Project edit form */}
                    {editingProjectId && (
                      <div className="p-4 border-2 border-gold/40 bg-gold-light/[0.03] dark:bg-slate-900/80 mb-4 rounded-none">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-mono font-bold text-slate-950 dark:text-gold uppercase">
                            Modify Project: {editingProjectId}
                          </h4>
                          <button
                            onClick={() => setEditingProjectId(null)}
                            className="text-red-500 hover:underline uppercase text-3xs font-mono font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          updateProject({
                            id: editingProjectId,
                            title: projTitle,
                            category: projCategory,
                            description: projDescription,
                            longDescription: projTagline,
                            metrics: [{ label: "Metric", value: projMetric }],
                            technologies: projects.find(p => p.id === editingProjectId)?.technologies || [],
                            image: projects.find(p => p.id === editingProjectId)?.image || "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&q=80&w=800",
                            link: projLink
                          });
                          setEditingProjectId(null);
                        }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Project Title"
                            value={projTitle}
                            onChange={(e) => setProjTitle(e.target.value)}
                            required
                            className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-gold"
                          />
                          <select
                            value={projCategory}
                            onChange={(e) => setProjCategory(e.target.value as any)}
                            className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 font-mono"
                          >
                            <option value="IT / Dev">IT / Dev</option>
                            <option value="Crypto">Crypto</option>
                            <option value="Social Growth">Social Growth</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Metric"
                            value={projMetric}
                            onChange={(e) => setProjMetric(e.target.value)}
                            className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-gold"
                          />
                          <input
                            type="text"
                            placeholder="Link"
                            value={projLink}
                            onChange={(e) => setProjLink(e.target.value)}
                            className="px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-gold"
                          />
                          <textarea
                            placeholder="Description"
                            value={projDescription}
                            onChange={(e) => setProjDescription(e.target.value)}
                            required
                            className="sm:col-span-2 px-2.5 py-2 text-2xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:border-gold"
                          />
                          <button
                            type="submit"
                            className="py-2 bg-slate-950 text-gold hover:bg-gold hover:text-slate-950 transition-colors uppercase font-mono tracking-widest font-extrabold text-2xs cursor-pointer"
                          >
                            SAVE CHANGES
                          </button>
                        </form>
                      </div>
                    )}

                    {/* Projects list */}
                    <div className="overflow-x-auto border-t border-slate-100 dark:border-slate-900 pt-5">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-gold mb-3">
                        Master Portfolio Showcase Log
                      </h3>
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-250 dark:border-slate-850 font-mono text-[9px] uppercase text-slate-400 tracking-widest">
                            <th className="py-2.5 font-bold">Category</th>
                            <th className="py-2.5 font-bold">Project Name</th>
                            <th className="py-2.5 font-bold">Metric</th>
                            <th className="py-2.5 font-bold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-900 font-sans text-xs">
                          {projects.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/15">
                              <td className="py-3 font-mono text-2xs uppercase tracking-wider text-amber-500 font-bold">
                                {p.category}
                              </td>
                              <td className="py-3 font-bold text-slate-950 dark:text-neutral-200 uppercase">
                                {p.title}
                              </td>
                              <td className="py-3 text-slate-500 dark:text-slate-400 font-mono text-2xs">
                                {p.metrics?.[0]?.value || "N/A"}
                              </td>
                              <td className="py-3 text-right space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingProjectId(p.id);
                                    setProjTitle(p.title);
                                    setProjCategory(p.category as any);
                                    setProjDescription(p.description);
                                    setProjTagline(p.longDescription || "");
                                    setProjMetric(p.metrics?.[0]?.value || "");
                                    setProjLink(p.link || "");
                                  }}
                                  className="p-1 px-3 hover:bg-gold/10 text-2xs font-mono border border-slate-205 cursor-pointer rounded-none text-slate-950 dark:text-slate-50 hover:text-gold"
                                >
                                  Modify
                                </button>
                                <button
                                  onClick={() => deleteProject(p.id)}
                                  className="p-1 px-3 border border-red-500/20 text-red-500 hover:bg-red-500/10 text-2xs font-mono cursor-pointer rounded-none"
                                >
                                  Purge
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "articles" && (
                  <div className="space-y-8">
                     <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border border-slate-200/80 dark:border-slate-800">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-gold mb-4 flex items-center gap-1.5">
                            <Plus size={14} />
                            <span>Create Tactical Insight Publication</span>
                        </h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (!newArtTitle || !newArtContent) {
                                addToast("Missing Parameters: Title and Content required", "warning");
                                return;
                            }
                            addArticle({
                                id: `art-${Date.now()}`,
                                title: newArtTitle,
                                slug: newArtTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
                                content: newArtContent,
                                excerpt: newArtExcerpt || newArtContent.substring(0, 150) + "...",
                                category: newArtCategory || "General Intel",
                                tags: newArtTags ? newArtTags.split(",").map(t => t.trim()) : ["IT", "Expertise"],
                                thumbnail: newArtThumbnail || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
                                publishDate: new Date().toISOString(),
                                author: {
                                    name: personalInfo.name,
                                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
                                    title: "IT Expert"
                                },
                                status: "published",
                                seoMetadata: {
                                    title: newArtSeoTitle,
                                    description: newArtSeoDesc,
                                    keywords: newArtSeoKeywords
                                }
                            });
                            setNewArtTitle("");
                            setNewArtCategory("");
                            setNewArtThumbnail("");
                            setNewArtTags("");
                            setNewArtExcerpt("");
                            setNewArtContent("");
                            setNewArtSeoTitle("");
                            setNewArtSeoDesc("");
                            setNewArtSeoKeywords("");
                        }} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="ARTICLE TITLE..."
                                    value={newArtTitle}
                                    onChange={(e) => setNewArtTitle(e.target.value)}
                                    className="px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                />
                                <input 
                                    type="text" 
                                    placeholder="CATEGORY (e.g. Crypto, AI, IT)..."
                                    value={newArtCategory}
                                    onChange={(e) => setNewArtCategory(e.target.value)}
                                    className="px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                />
                                <input 
                                    type="text" 
                                    placeholder="THUMBNAIL URL..."
                                    value={newArtThumbnail}
                                    onChange={(e) => setNewArtThumbnail(e.target.value)}
                                    className="px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                />
                                <input 
                                    type="text" 
                                    placeholder="TAGS (Comma separated)..."
                                    value={newArtTags}
                                    onChange={(e) => setNewArtTags(e.target.value)}
                                    className="px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                />
                            </div>
                            <input 
                                type="text" 
                                placeholder="EXCERPT / SHORT SUMMARY..."
                                value={newArtExcerpt}
                                onChange={(e) => setNewArtExcerpt(e.target.value)}
                                className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                            />
                            <textarea 
                                placeholder="MARKDOWN RADIOLOGICAL DATA / ARTICLE CONTENT..."
                                rows={6}
                                value={newArtContent}
                                onChange={(e) => setNewArtContent(e.target.value)}
                                className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                            />

                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-3">SEO METADATA (OPTIONAL)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="META TITLE"
                                        value={newArtSeoTitle}
                                        onChange={(e) => setNewArtSeoTitle(e.target.value)}
                                        className="px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="META KEYWORDS (CSV)"
                                        value={newArtSeoKeywords}
                                        onChange={(e) => setNewArtSeoKeywords(e.target.value)}
                                        className="px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                    />
                                </div>
                                <textarea 
                                    placeholder="META DESCRIPTION"
                                    rows={2}
                                    value={newArtSeoDesc}
                                    onChange={(e) => setNewArtSeoDesc(e.target.value)}
                                    className="w-full mt-4 px-3 py-2 text-[10px] font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                />
                            </div>

                            <button type="submit" className="w-full py-3 bg-slate-900 border border-gold/30 text-white font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-slate-950 transition-all cursor-pointer">
                                BROADCAST ARTICLE
                            </button>
                        </form>
                     </div>

                     <div className="space-y-4">
                        <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">PUBLISHED INTEL REGISTRY</h3>
                        {articles.map(art => (
                            <div key={art.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-gold/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <img src={art.thumbnail} className="w-10 h-10 object-cover border border-slate-200 dark:border-slate-700" referrerPolicy="no-referrer" />
                                    <div>
                                        <h4 className="text-sm font-sans font-medium text-slate-900 dark:text-white line-clamp-1 group-hover:text-gold transition-colors">{art.title}</h4>
                                        <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase">
                                            <span className="text-gold font-bold">{art.category}</span>
                                            <span>•</span>
                                            <span>{format(new Date(art.publishDate), "MMM dd")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => {
                                            setEditingArticleId(art.id);
                                            setArtTitle(art.title);
                                            setArtCategory(art.category);
                                            setArtThumbnail(art.thumbnail);
                                            setArtTags(art.tags.join(", "));
                                            setArtExcerpt(art.excerpt);
                                            setArtContent(art.content);
                                            setArtStatus(art.status);
                                            setArtSeoTitle(art.seoMetadata?.title || "");
                                            setArtSeoDesc(art.seoMetadata?.description || "");
                                            setArtSeoKeywords(art.seoMetadata?.keywords || "");
                                        }}
                                        className="p-1 px-3 border border-slate-200 dark:border-slate-800 text-[10px] font-mono hover:bg-gold hover:text-slate-950 transition-colors cursor-pointer dark:text-slate-400"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteArticle(art.id)}
                                        className="p-1 px-3 border border-red-500/20 text-[10px] font-mono hover:bg-red-500 hover:text-white transition-colors cursor-pointer text-red-400"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                     </div>

                     {editingArticleId && (
                         <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
                             <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-slate-950 border border-gold/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
                             >
                                <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-900 pb-4">
                                     <h3 className="text-xl font-sans font-medium text-slate-900 dark:text-white uppercase tracking-tight">MANIPULATING EXPERT LOGID: <span className="text-gold font-mono">{editingArticleId}</span></h3>
                                     <button onClick={() => setEditingArticleId(null)} className="text-slate-400 hover:text-red-500"><X size={18} /></button>
                                </div>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    updateArticle({
                                        ...articles.find(a => a.id === editingArticleId)!,
                                        title: artTitle,
                                        category: artCategory,
                                        thumbnail: artThumbnail,
                                        tags: artTags.split(",").map(t => t.trim()),
                                        excerpt: artExcerpt,
                                        content: artContent,
                                        status: artStatus,
                                        seoMetadata: {
                                            title: artSeoTitle,
                                            description: artSeoDesc,
                                            keywords: artSeoKeywords
                                        }
                                    });
                                    setEditingArticleId(null);
                                }} className="space-y-6">
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Technical Title</label>
                                            <input type="text" value={artTitle} onChange={(e) => setArtTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Market Category</label>
                                            <input type="text" value={artCategory} onChange={(e) => setArtCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Visual Mapping (Thumbnail)</label>
                                            <input type="text" value={artThumbnail} onChange={(e) => setArtThumbnail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Core Taxonomy (Tags)</label>
                                            <input type="text" value={artTags} onChange={(e) => setArtTags(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white" />
                                        </div>
                                     </div>
                                     <div>
                                         <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Insight Abstract (Excerpt)</label>
                                         <textarea value={artExcerpt} onChange={(e) => setArtExcerpt(e.target.value)} rows={2} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-sans outline-none focus:border-gold dark:text-white" />
                                     </div>
                                     <div>
                                         <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Deep-Dive Content (Markdown Supported)</label>
                                         <textarea value={artContent} onChange={(e) => setArtContent(e.target.value)} rows={12} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white" />
                                     </div>

                                     <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                         <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-4">SEO Metadata</h4>
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                             <div>
                                                 <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Meta Title</label>
                                                 <input type="text" value={artSeoTitle} onChange={(e) => setArtSeoTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white" />
                                             </div>
                                             <div>
                                                 <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Meta Keywords (CSV)</label>
                                                 <input type="text" value={artSeoKeywords} onChange={(e) => setArtSeoKeywords(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white" />
                                             </div>
                                         </div>
                                         <div className="mt-4">
                                             <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Meta Description</label>
                                             <textarea value={artSeoDesc} onChange={(e) => setArtSeoDesc(e.target.value)} rows={2} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono outline-none focus:border-gold dark:text-white" />
                                         </div>
                                     </div>

                                     <div className="flex gap-4">
                                         <button type="submit" className="flex-grow py-4 bg-gold text-slate-950 font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer">Commit Changes to Feed</button>
                                         <button type="button" onClick={() => setEditingArticleId(null)} className="px-8 border border-slate-200 dark:border-slate-800 text-slate-500 font-mono text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors cursor-pointer">Abort</button>
                                     </div>
                                </form>
                             </motion.div>
                         </div>
                     )}
                  </div>
                )}

                 {activeTab === "ads" && (
                  <div className="space-y-8">
                     <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border border-slate-200/80 dark:border-slate-800">
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-gold mb-4 flex items-center gap-1.5">
                            <Plus size={14} />
                            <span>Create Google AdSense Placement</span>
                        </h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (!newAdName || !newAdCode) {
                                addToast("Missing Parameters: Title and Ad Code required", "warning");
                                return;
                            }
                            addAd({
                                name: newAdName,
                                code: newAdCode,
                                location: newAdLocation,
                                enabled: newAdEnabled,
                                articleId: newAdLocation === "article_specific" ? newAdArticleId : undefined
                            });
                            setNewAdName("");
                            setNewAdCode("");
                            setNewAdLocation("homepage");
                            setNewAdEnabled(true);
                            setNewAdArticleId("");
                        }} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="AD REFERENCE NAME..."
                                    value={newAdName}
                                    onChange={(e) => setNewAdName(e.target.value)}
                                    className="px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                    required
                                />
                                <select 
                                    value={newAdLocation}
                                    onChange={(e) => setNewAdLocation(e.target.value as any)}
                                    className="px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                >
                                    <option value="homepage">Homepage</option>
                                    <option value="sidebar">Sidebar</option>
                                    <option value="header">Header</option>
                                    <option value="footer">Footer</option>
                                    <option value="between_articles">Between Articles</option>
                                    <option value="blog_pages">Blog Pages</option>
                                    <option value="article_specific">Specific Article</option>
                                </select>
                                {newAdLocation === "article_specific" && (
                                    <select 
                                        value={newAdArticleId}
                                        onChange={(e) => setNewAdArticleId(e.target.value)}
                                        className="px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                    >
                                        <option value="">Select Article...</option>
                                        {articles.map(art => (
                                            <option key={art.id} value={art.id}>{art.title}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <textarea 
                                placeholder="PASTE GOOGLE ADSENSE CODE HERE..."
                                rows={6}
                                value={newAdCode}
                                onChange={(e) => setNewAdCode(e.target.value)}
                                className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-gold"
                                required
                            />
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    id="newAdEnabled"
                                    checked={newAdEnabled}
                                    onChange={(e) => setNewAdEnabled(e.target.checked)}
                                    className="accent-gold w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="newAdEnabled" className="text-xs font-mono font-bold text-slate-500 uppercase cursor-pointer">
                                    Enable Ad Placement on Publish
                                </label>
                            </div>
                            <button type="submit" className="w-full py-3 bg-slate-900 border border-gold/30 text-white font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-slate-950 transition-all cursor-pointer">
                                REGISTER AD BLOCK
                            </button>
                        </form>
                     </div>

                     <div className="space-y-4">
                        <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">ACTIVE ADSENSE PLACEMENTS ({ads.length})</h3>
                        {ads.length === 0 && (
                            <p className="text-xs font-mono text-slate-500">No ad placements configured.</p>
                        )}
                        {ads.map(ad => (
                            <div key={ad.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-gold/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-500">
                                        <Megaphone size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-sans font-medium text-slate-900 dark:text-white line-clamp-1 group-hover:text-gold transition-colors">{ad.name}</h4>
                                        <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase">
                                            <span className="text-gold font-bold">{ad.location.replace("_", " ")}</span>
                                            <span>•</span>
                                            <span className={ad.enabled ? "text-emerald-500" : "text-slate-500"}>{ad.enabled ? "ACTIVE" : "PAUSED"}</span>
                                            <span>•</span>
                                            <span>{format(new Date(ad.updatedAt), "MMM dd")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => updateAd({ ...ad, enabled: !ad.enabled })}
                                        className={`p-1 px-3 border ${ad.enabled ? 'border-amber-500/20 text-amber-500 hover:bg-amber-500' : 'border-emerald-500/20 text-emerald-500 hover:bg-emerald-500'}  text-[10px] font-mono hover:text-white transition-colors cursor-pointer`}
                                    >
                                        {ad.enabled ? "Pause" : "Activate"}
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setEditingAdId(ad.id);
                                            setAdName(ad.name);
                                            setAdCode(ad.code);
                                            setAdLocation(ad.location);
                                            setAdArticleId(ad.articleId || "");
                                            setAdEnabled(ad.enabled);
                                        }}
                                        className="p-1 px-3 border border-slate-200 dark:border-slate-800 text-[10px] font-mono hover:bg-gold hover:text-slate-950 transition-colors cursor-pointer dark:text-slate-400"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteAd(ad.id)}
                                        className="p-1 px-3 border border-red-500/20 text-[10px] font-mono hover:bg-red-500 hover:text-white transition-colors cursor-pointer text-red-400"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                     </div>

                     {editingAdId && (
                         <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
                             <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-slate-950 border border-gold/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl"
                             >
                                <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-900 pb-4">
                                     <h3 className="text-xl font-sans font-medium text-slate-900 dark:text-white uppercase tracking-tight">MANIPULATING AD BLOCK: <span className="text-gold font-mono">{editingAdId}</span></h3>
                                     <button onClick={() => setEditingAdId(null)} className="text-slate-400 hover:text-red-500"><X size={18} /></button>
                                </div>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    updateAd({
                                        ...ads.find(a => a.id === editingAdId)!,
                                        name: adName,
                                        code: adCode,
                                        location: adLocation,
                                        enabled: adEnabled,
                                        articleId: adLocation === "article_specific" ? adArticleId : undefined
                                    });
                                    setEditingAdId(null);
                                }} className="space-y-6">
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Ad Reference Name</label>
                                            <input type="text" value={adName} onChange={(e) => setAdName(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Placement Location</label>
                                            <select value={adLocation} onChange={(e) => setAdLocation(e.target.value as any)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white">
                                                <option value="homepage">Homepage</option>
                                                <option value="sidebar">Sidebar</option>
                                                <option value="header">Header</option>
                                                <option value="footer">Footer</option>
                                                <option value="between_articles">Between Articles</option>
                                                <option value="blog_pages">Blog Pages</option>
                                                <option value="article_specific">Specific Article</option>
                                            </select>
                                        </div>
                                        {adLocation === "article_specific" && (
                                            <div>
                                                <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Target Article</label>
                                                <select value={adArticleId} onChange={(e) => setAdArticleId(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white">
                                                    <option value="">Select Article...</option>
                                                    {articles.map(art => (
                                                        <option key={art.id} value={art.id}>{art.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                     </div>
                                     <div>
                                         <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Google AdSense HTML Code</label>
                                         <textarea value={adCode} onChange={(e) => setAdCode(e.target.value)} rows={8} required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:border-gold dark:text-white" />
                                     </div>
                                     <div className="flex items-center gap-3">
                                        <input 
                                            type="checkbox" 
                                            id="editAdEnabled"
                                            checked={adEnabled}
                                            onChange={(e) => setAdEnabled(e.target.checked)}
                                            className="accent-gold w-4 h-4 cursor-pointer"
                                        />
                                        <label htmlFor="editAdEnabled" className="text-xs font-mono font-bold text-slate-500 uppercase cursor-pointer">
                                            Ad Delivery Active
                                        </label>
                                    </div>
                                     <div className="flex gap-4">
                                         <button type="submit" className="flex-grow py-4 bg-gold text-slate-950 font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer">Commit Status Details</button>
                                         <button type="button" onClick={() => setEditingAdId(null)} className="px-8 border border-slate-200 dark:border-slate-800 text-slate-500 font-mono text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors cursor-pointer">Abort</button>
                                     </div>
                                </form>
                             </motion.div>
                         </div>
                     )}
                  </div>
                )}

                {activeTab === "testimonials" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-gold mb-3">
                        Add Endorsement Review Directly
                      </h3>
                      <form onSubmit={handleCreateTestimonialDirect} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Client Name (e.g. John Doe)"
                          value={testName}
                          onChange={(e) => setTestName(e.target.value)}
                          required
                          className="px-2.5 py-2 text-2xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <input
                          type="text"
                          placeholder="Role (e.g. VP Marketing)"
                          value={testRole}
                          onChange={(e) => setTestRole(e.target.value)}
                          className="px-2.5 py-2 text-2xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <input
                          type="text"
                          placeholder="Company (e.g. TechCorp)"
                          value={testCompany}
                          onChange={(e) => setTestCompany(e.target.value)}
                          className="px-2.5 py-2 text-2xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold"
                        />
                        <div className="sm:col-span-2 flex items-center space-x-2">
                          <textarea
                            placeholder="Testimonial content / glowing review text..."
                            value={testContent}
                            onChange={(e) => setTestContent(e.target.value)}
                            required
                            rows={2}
                            className="flex-1 px-2.5 py-2 text-2xs bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-neutral-100 border border-slate-200 dark:border-slate-850 font-mono focus:outline-none focus:border-gold resize-none"
                          />
                        </div>
                        <div className="flex flex-col justify-between space-y-2">
                          <div className="flex items-center justify-between text-2xs font-mono text-slate-500">
                            <span>Rating: </span>
                            <select
                              value={testRating}
                              onChange={(e) => setTestRating(Number(e.target.value))}
                              className="px-1 py-0.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-neutral-200"
                            >
                              <option value={5}>5 Stars (★ Featured)</option>
                              <option value={4}>4 Stars</option>
                              <option value={3}>3 Stars</option>
                            </select>
                          </div>
                          <button
                            type="submit"
                            className="w-full py-2 bg-slate-950 hover:bg-gold hover:text-slate-950 dark:bg-slate-800 dark:hover:bg-gold text-white font-mono text-2xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                          >
                            Insert DB Record
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-900 pt-5">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-gold mb-3 flex items-center justify-between">
                        <span>Active Testimonials Database List</span>
                        <span className="text-[10px] text-slate-400 font-normal">Stored in modern LocalStorage cache</span>
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-250 dark:border-slate-850 font-mono text-[9px] uppercase text-slate-400 tracking-widest">
                              <th className="py-2.5 font-bold">Client / Company</th>
                              <th className="py-2.5 font-bold">Rating</th>
                              <th className="py-2.5 font-bold">Review Message Excerpt</th>
                              <th className="py-2.5 font-bold text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-900 font-sans text-xs">
                            {testimonials.map((t) => (
                              <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                                <td className="py-3 pr-2">
                                  <span className="block font-semibold text-slate-950 dark:text-neutral-200">{t.name}</span>
                                  <span className="text-2xs font-mono text-slate-450 dark:text-slate-500">{t.role} @ {t.company}</span>
                                </td>
                                <td className="py-3">
                                  <span className="text-gold font-mono font-bold text-2xs">{"★".repeat(t.rating)}</span>
                                </td>
                                <td className="py-3 max-w-[240px] truncate text-slate-650 dark:text-slate-400 pr-2">
                                  {t.content}
                                </td>
                                <td className="py-3 text-right">
                                  <button
                                    onClick={() => handleDeleteTestimonial(t.id)}
                                    className="p-1 px-2 text-2xs text-red-500 hover:bg-red-500/15 border border-transparent hover:border-red-500/20 rounded-none transition-all cursor-pointer inline-flex items-center space-x-1"
                                    title="Delete Testimonial"
                                  >
                                    <Trash2 size={11} />
                                    <span>Reset Storage</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "leads" && (
                  <div className="space-y-6">
                    <div className="bg-slate-50/70 dark:bg-slate-900/20 p-4 border border-slate-200/60 dark:border-slate-900">
                      <h4 className="text-xs font-mono font-bold text-slate-950 dark:text-gold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Sparkles size={12} className="text-gold animate-bounce" />
                        <span>Active Email Pipeline</span>
                      </h4>
                      <p className="text-2xs font-sans text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                        The portfolio transfers and user-submitted forms sync directly with Muhammad Ali's secure Hotmail box via client AJAX protocols using a configured FormSubmit gateway, addressing the verified administrator coordinate.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850">
                          <span className="block text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                            Active Form Payload
                          </span>
                          <pre className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-2 overflow-x-auto whitespace-pre-wrap">
{`{
  name: "Strategic Blueprint Requestor",
  contact: "user-provided-coordinate@domain.com",
  _subject: "💎 HERO BLUEPRINT DELIVERY ACTION: ...",
  _replyto: "user-provided-coordinate@domain.com",
  endpoint: "https://formsubmit.co/ajax/m*******.ali@hotmail.com"
}`}
                          </pre>
                        </div>

                        <div className="p-3 bg-white dark:bg-slate-950 border border-slate-205 dark:border-slate-850 flex flex-col justify-between">
                          <div>
                            <span className="block text-[9px] font-mono uppercase tracking-widest text-slate-405 mb-1">
                              Transmission Mechanics
                            </span>
                            <p className="text-2xs text-slate-500 dark:text-slate-400 leading-relaxed">
                              When users submit custom follow requirements or book consultation requests, a JSON string payload is dispatched async. Offline users degrade perfectly using automatic local context-caching and mailto backup queues.
                            </p>
                          </div>

                          <button
                            onClick={triggerMockFormSubmitLead}
                            className="mt-3 py-2 w-full bg-slate-950 dark:bg-slate-800 text-gold font-mono font-bold text-2xs uppercase tracking-widest hover:bg-gold hover:text-slate-950 transition-colors cursor-pointer"
                          >
                            Run Sandbox API Test Call
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50/75 dark:bg-slate-900/10 p-4 border border-slate-200/50 dark:border-slate-900">
                      <h4 className="text-xs font-mono font-bold text-slate-950 dark:text-gold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Database size={12} className="text-gold" />
                        <span>Active Follower CRM Blueprints</span>
                      </h4>
                      <p className="text-2xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Once a user interacts via the primary Navbar <strong>"Follow"</strong> button, they enter our <strong>Followers Database</strong>. They can designate specific objectives or bypass into basic tracking. Following Ali activates modern push updates within the local state and enables browser storage synchronization.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "logs" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-gold">
                        Audit Logs & Notification Trace History
                      </h3>
                      <button
                        onClick={clearNotifications}
                        className="text-2xs font-mono font-semibold text-red-500 hover:underline"
                      >
                        Clear All Log Traces
                      </button>
                    </div>

                    {notifications.length > 0 ? (
                      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="bg-slate-50 dark:bg-slate-900/60 p-3 border border-slate-200/55 dark:border-slate-850 flex items-start justify-between gap-3 text-2xs font-mono"
                          >
                            <div className="space-y-1">
                              <span className="font-bold text-slate-900 dark:text-neutral-100 flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  notif.category === "system" ? "bg-red-500" :
                                  notif.category === "crypto" ? "bg-emerald-500" :
                                  notif.category === "social" ? "bg-amber-500" : "bg-blue-500"
                                }`} />
                                {notif.title}
                              </span>
                              <p className="text-slate-500 dark:text-slate-400 leading-normal">{notif.description}</p>
                            </div>
                            <span className="text-2xs text-slate-400 dark:text-slate-550 shrink-0 whitespace-nowrap">
                              {notif.timestamp}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-slate-50/70 dark:bg-slate-900/20 border border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-2xs font-mono text-slate-400">NO ACTIVE SIGNAL LOG FILES REGISTERED</p>
                      </div>
                    )}

                    <div className="bg-slate-950 text-gold p-3.5 border border-slate-900 font-mono text-2xs md:flex items-center justify-between gap-3 space-y-2 md:space-y-0">
                      <span>Want to test active follow logs?</span>
                      <button
                        onClick={() => {
                          addNotification("Custom Simulation Registered", "Administrator triggered a simulation ping log safely.", "general");
                          addToast("🔔 Simulated Audit Signal Dispatched!", "success");
                        }}
                        className="p-1 px-3 border border-gold hover:bg-gold hover:text-slate-950 transition-colors cursor-pointer text-[10px] uppercase font-bold tracking-wider"
                      >
                        Simulate Signal Alert
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="border-t border-slate-100 dark:border-slate-900 mt-6 pt-5 text-center text-3xs text-slate-420 font-mono text-slate-400 dark:text-slate-600 tracking-wider">
            ADMIN SYSTEM RUNNING SECURED V1.5 (LOCAL & SERVER GATEWAY). CLOUD RUN CONTAINER ENGAGEMENTS STABLE.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
