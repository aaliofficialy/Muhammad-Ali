import React from "react";
import { motion } from "motion/react";
import { ArrowRight, BarChart3, Bot, Globe2, CheckCircle2 } from "lucide-react";

interface ProfessionalHighlightsProps {
  onContact: () => void;
  onProjects: () => void;
}

const pillars = [
  {
    icon: Bot,
    title: "AI & Automation",
    text: "Automate repetitive work with practical AI assistants, workflows, document processing and business integrations.",
    items: ["AI assistants & chatbots", "Workflow automation", "Document & content AI"],
  },
  {
    icon: BarChart3,
    title: "Data & Technology",
    text: "Turn business data into clear reports, dashboards and decisions with modern web and analytics tools.",
    items: ["Excel & KPI reporting", "Power BI dashboards", "SQL, Python & data workflows"],
  },
  {
    icon: Globe2,
    title: "Digital Growth",
    text: "Build a stronger digital presence through websites, social media, campaigns, SEO and conversion-focused systems.",
    items: ["Websites & web apps", "Social media growth", "SEO & paid campaigns"],
  },
];

export default function ProfessionalHighlights({ onContact, onProjects }: ProfessionalHighlightsProps) {
  return (
    <section className="relative py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest gold-text bg-gold-light dark:bg-slate-950 border border-gold/25">
            What I Solve
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Technology that solves real business problems.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-500 dark:text-slate-400">
            One clear goal: reduce manual work, make information easier to understand, and create digital systems that help your business grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-7 shadow-sm hover:border-gold hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 flex items-center justify-center bg-slate-900 text-gold mb-6 group-hover:bg-gold group-hover:text-slate-950 transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pillar.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{pillar.text}</p>
                <ul className="mt-6 space-y-2.5 border-t border-slate-100 dark:border-slate-800 pt-5">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 size={13} className="text-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <button onClick={onContact} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white hover:bg-gold hover:text-slate-950 text-xs font-mono font-bold uppercase tracking-widest transition-colors">
            Start Your Project <ArrowRight size={14} />
          </button>
          <button onClick={onProjects} className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-gold hover:text-gold text-xs font-mono font-bold uppercase tracking-widest transition-colors">
            View Case Studies
          </button>
        </div>
      </div>
    </section>
  );
}
