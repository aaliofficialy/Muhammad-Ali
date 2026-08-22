import React, { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Cpu, Database, Network, TrendingUp, Sparkles, BookOpen } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function About() {
  const { personalInfo } = useApp();
  const [activeTab, setActiveTab] = useState<"IT" | "GROWTH">("IT");

  const itPillars = [
    {
      title: "System Architecture",
      icon: <Cpu size={18} className="text-gold" />,
      desc: "Cloud-native microservices modeling, serverless scaling, container clustering, and robust high-availability configurations."
    },
    {
      title: "Infrastructure Engineering",
      icon: <Network size={18} className="text-gold" />,
      desc: "Design and automation of multi-region networks, load distribution pipelines, and fail-safe automated backup arrays."
    },
    {
      title: "Cybersecurity Protocol",
      icon: <ShieldCheck size={18} className="text-gold" />,
      desc: "Zero-Trust policy configuration, dynamic threat auditing, vulnerability scans, and continuous access control management."
    },
    {
      title: "Data Analytics & Engineering",
      icon: <Database size={18} className="text-gold" />,
      desc: "Processing and sanitizing stream-based metrics, custom diagnostic monitoring, and relational/NoSQL optimization."
    }
  ];

  const brandPillars = [
    {
      title: "Crypto Tokenomics Design",
      desc: "Formulating utility schedules, dynamic staking incentives, governance structures, and mathematical liquidity provision workflows to create sustainable long-term Web3 protocols."
    },
    {
      title: "B2B LinkedIn Authority",
      desc: "Cracking the professional algorithmic feed to distribute complex ideas. Re-engineering raw engineering concepts into engaging stories that capture decision-maker interest."
    },
    {
      title: "Viral Distribution Strategies",
      desc: "Fusing cognitive psychology, copy analysis, and custom scheduled posting cycles to expand reach across high-value markets with zero ad spend."
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest gold-text font-bold bg-gold-light dark:bg-slate-900 border border-gold/25 dark:border-gold/20 px-3 py-1 rounded-none">
            Elite Synthesist
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4 font-serif italic">
            Who is Muhammad Ali?
          </h2>
          <p className="mt-3 text-xs text-slate-450 dark:text-slate-500 font-mono tracking-wider">
            THE STRATEGIST WHO SPEAKS CODE, PROTOCOLS, AND MARKETING AT THE HIGHEST LEVEL.
          </p>
        </div>

        {/* Narrative bio teaser */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-950 rounded-none p-6 sm:p-10 shadow-sm border border-slate-100 dark:border-slate-900 mb-16">
          <p className="text-sm sm:text-base text-slate-655 text-slate-650 dark:text-slate-300 leading-relaxed font-sans first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-gold first-letter:mr-2 first-letter:float-left">
            {personalInfo.bioShort}
          </p>
        </div>

        {/* Dynamic Multi-Disciplinary Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Card A: IT Expert Pillar */}
          <div className="bg-white dark:bg-slate-950 rounded-none p-6 sm:p-10 border border-slate-200/80 dark:border-slate-900 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-300">
            <div>
              {/* Badge header */}
              <div className="flex items-center space-x-2 gold-text mb-4 font-mono text-[10px] font-bold tracking-widest uppercase">
                <span>Technical Nucleus</span>
              </div>
              
              <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-white tracking-tight flex items-center mb-4">
                The IT Architect
              </h3>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                {personalInfo.itExpertiseDescription}
              </p>

              {/* Pillars list layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {itPillars.map((pillar, idx) => (
                  <div key={idx} className="p-4 rounded-none hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-850">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="p-1.5 bg-gold-light dark:bg-slate-900 rounded-none shrink-0 border border-gold/10">
                        {pillar.icon}
                      </div>
                      <h4 className="text-[10px] font-bold text-slate-900 dark:text-slate-200 uppercase font-mono tracking-wider">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom mini seal */}
            <div className="border-t border-slate-100 dark:border-slate-900 pt-6 mt-8 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-550 font-mono font-bold uppercase">
              <span>ZERO TRUST PRINCIPLES</span>
              <span>SCALABLE ENVIRONMENT</span>
            </div>
          </div>

          {/* Card B: Crypto & Growth Pillar */}
          <div className="bg-neutral-950 text-white rounded-none p-6 sm:p-10 border border-neutral-900 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            {/* Background luxury gradient thread glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all duration-500 pointer-events-none" />

            <div>
              {/* Badge header */}
              <div className="flex items-center space-x-2 text-gold mb-4 font-mono text-[10px] font-bold tracking-widest uppercase">
                <span>Distribution Engine</span>
              </div>

              <h3 className="text-xl font-bold font-sans text-white tracking-tight flex items-center mb-4">
                Crypto & Social Growth
              </h3>

              <p className="text-xs text-slate-300 mb-8 leading-relaxed">
                {personalInfo.cryptoExpertiseDescription}
              </p>

              {/* Growth mechanics layout */}
              <div className="space-y-6">
                {brandPillars.map((pillar, idx) => (
                  <div key={idx} className="border-l border-gold/30 pl-4 py-1 hover:border-gold transition-colors">
                    <h4 className="text-[10px] font-mono tracking-widest font-bold text-gold uppercase">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom mini seal representation */}
            <div className="border-t border-neutral-900 pt-6 mt-8 flex items-center justify-between text-[10px] text-slate-500 font-mono font-bold uppercase">
              <span className="flex items-center">
                <TrendingUp size={11} className="mr-1 text-gold" /> Web3 Native Emissions
              </span>
              <span>LinkedIn Strategist</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
