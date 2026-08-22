import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ChevronDown, ChevronUp, Sparkles, Award, TrendingUp, CheckCircle, Share2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Project } from "../types";

export default function Portfolio() {
  const { projects, addToast, searchQuery } = useApp();
  const [activeFilter, setActiveFilter] = useState<"ALL" | "IT / Dev" | "Crypto" | "Social Growth">("ALL");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeFilter === "ALL" || project.category === activeFilter;
    if (!matchesCategory) return false;

    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.technologies.some(t => t.toLowerCase().includes(searchLower)) ||
      project.metrics.some(m => m.label.toLowerCase().includes(searchLower) || m.value.toLowerCase().includes(searchLower))
    );
  });

  const filterTabs = [
    { label: "All Projects", value: "ALL" as const },
    { label: "IT Infrastructure", value: "IT / Dev" as const },
    { label: "On-Chain Crypto Solutions", value: "Crypto" as const },
    { label: "Social Audience Growth", value: "Social Growth" as const },
  ];

  const getDetailedCaseStudy = (id: string): string[] => {
    switch(id) {
      case "project-1":
        return [
          "Phase 1: Conducted full penetration testing and mapped standard microservices vulnerability vectors.",
          "Phase 2: Developed Kubernetes clustered templates utilizing infrastructure-as-code (Terraform) scripts.",
          "Phase 3: Safely moved database workloads to cloud databases using blue-green deployment vectors, preserving customer records perfectly with zero packet loss.",
          "Phase 4: Set up strict Zero-Trust IAM roles and enabled firewalls to block multi-vector exploit scripts, successfully reducing unauthorized probes to absolute zero."
        ];
      case "project-2":
        return [
          "Outcome 1: Designed emission profiles that prevent massive inflation issues during token launch windows.",
          "Outcome 2: Formulated automated Liquidity Provisioning metrics in custom mathematical spreadsheets, protecting protocol nodes from standard arbitrage stress tests.",
          "Outcome 3: Created a custom alerting trigger framework on extreme volatility flows, pushing automated reports straight to client Slack endpoints."
        ];
      case "project-3":
        return [
          "Strategy 1: Restructured executive LinkedIn profiles into premium high-converting digital calling cards.",
          "Strategy 2: Written and optimized 40+ strategic long-form B2B articles using custom educational storytelling frames.",
          "Strategy 3: Deployed strategic comments inside high-influence circles, accelerating the algorithmic feedback loop to boost organic distribution signals.",
          "Strategy 4: Embedded automated lead-capture funnels generating warm, high-grade prospects on complete autopilot."
        ];
      case "project-4":
        return [
          "Detail 1: Hooked Gemini API nodes to capture key request intents from inbound message threads.",
          "Detail 2: Deployed Puppeteer automation triggers to retrieve county tax databases instantly upon receipt of a prospective property address.",
          "Detail 3: Drafted conversational email scripts responding in seconds, scheduling discovery calls over verified calendar pages."
        ];
      case "project-5":
        return [
          "Protocol: Set up dedicated GraphQL query nodes that index massive smart contract transactions in real-time.",
          "Visualization: Crafted visual on-chain statistics tables in React, utilizing custom D3 rendering to display whale volume movements.",
          "Accuracy: Implemented predictive threshold filters to bypass false spoof orders, raising signal accuracy to over 80%."
        ];
      default:
        return ["Strategic blueprint and documentation available upon request under private NDA agreements."];
    }
  };

  const toggleCaseStudy = (id: string) => {
    if (expandedProjectId === id) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(id);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-gray-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest gold-text font-bold bg-gold-light dark:bg-slate-900 border border-gold/25 dark:border-slate-800 px-3 py-1 rounded-none">
            Proven Metrics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4 font-serif italic">
            Client Success Cases & Results
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            I don't just speak theories — I deliver verifiable business transformations. Explore active casework, system metrics, and organic viral growth charts below.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              id={`portfolio-filter-${tab.value}`}
              key={tab.value}
              onClick={() => {
                setActiveFilter(tab.value);
                setExpandedProjectId(null); // collapse expanded views upon changing filter
              }}
              className={`px-5 py-2.5 rounded-none text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === tab.value
                  ? "bg-slate-900 dark:bg-slate-800 text-gold shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-805 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Portfolio Projects Grid */}
        <motion.div layout="position" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => {
                const isExpanded = expandedProjectId === project.id;
                return (
                  <motion.div
                    layout
                    id={`project-card-${project.id}`}
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 280, 
                      damping: 26,
                      layout: { type: "spring", stiffness: 280, damping: 26, duration: 0.4 },
                      opacity: { duration: 0.25 }
                    }}
                    className="bg-white dark:bg-slate-900/40 rounded-none overflow-hidden border border-slate-200 dark:border-slate-850 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    {/* Accent Hero Image or Screenshot Frame */}
                    <div className="relative h-48 sm:h-56 bg-slate-950 overflow-hidden group">
                      <div className="absolute inset-0 bg-slate-900 group-hover:scale-105 transition-transform duration-700">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-slate-900/95 border border-gold/30 backdrop-blur-md rounded-none text-[9px] font-mono uppercase font-bold text-gold tracking-widest">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-sans">
                          {project.title}
                        </h3>

                        {/* Quick description */}
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-sans">
                          {project.description}
                        </p>

                        {/* Crucial Performance Metrics (Highlighted beautifully in Golden grid boxes) */}
                        <div className="grid grid-cols-3 gap-3 my-6">
                          {project.metrics.map((metric, metricIdx) => (
                            <div key={metricIdx} className="bg-gold-light dark:bg-slate-950 rounded-none p-3 border border-gold/20 dark:border-gold/10 text-center">
                              <span className="block text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight leading-none">
                                {metric.value}
                              </span>
                              <span className="block text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono mt-1.5 leading-tight font-bold">
                                {metric.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Technical Stack Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.technologies.map((tech, techIdx) => (
                            <span key={techIdx} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-850 rounded-none text-[8px] font-mono text-slate-500 dark:text-slate-450 uppercase font-bold">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                       {/* Expandable Case Study Area */}
                      {/* Expandable Case Study Area & External Link */}
                      <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5 mt-4 flex flex-col sm:flex-row items-center gap-4">
                        <button
                          id={`project-expand-case-btn-${project.id}`}
                          onClick={() => toggleCaseStudy(project.id)}
                          className="w-full sm:w-auto inline-flex justify-between sm:justify-start items-center text-xs font-mono font-bold tracking-widest uppercase text-slate-900 dark:text-slate-150 hover:text-gold transition-colors cursor-pointer group"
                        >
                          <span className="flex items-center">
                            <CheckCircle size={14} className="mr-1.5 text-gold" />
                            {isExpanded ? "Hide Blueprint" : "Read Case Study"}
                          </span>
                          <div className="sm:ml-2">
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </div>
                        </button>

                        {project.link && (
                          <a
                            id={`project-link-${project.id}`}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start text-[10px] font-mono font-bold tracking-tighter uppercase px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-gold hover:text-slate-900 hover:border-gold transition-all duration-300"
                          >
                            <ExternalLink size={12} className="mr-1.5" />
                            View Source / Live
                          </a>
                        )}

                        <button
                          id={`project-share-btn-${project.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            const shareUrl = project.link || window.location.href;
                            navigator.clipboard.writeText(shareUrl);
                            addToast("📋 Link copied to primary buffer!", "success");
                          }}
                          className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start text-[10px] font-mono font-bold tracking-tighter uppercase px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-gold hover:text-slate-900 hover:border-gold transition-all duration-300 cursor-pointer"
                        >
                          <Share2 size={12} className="mr-1.5" />
                          Share
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              id={`case-study-details-${project.id}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 p-4 rounded-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-650 dark:text-slate-350 space-y-2 font-sans">
                                <p className="font-bold text-[10px] uppercase font-mono tracking-widest gold-text mb-1">
                                  Strategic Implementation Steps:
                                </p>
                                {getDetailedCaseStudy(project.id).map((step, idx) => (
                                  <div key={idx} className="flex items-start">
                                    <span className="text-gold mr-2 font-mono">•</span>
                                    <span className="leading-relaxed text-slate-500 dark:text-slate-400">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-widest">
                  No portfolio cases matching these search parameters.
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
