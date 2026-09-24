import React from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function FeaturedCaseStudies({ onViewAll }: { onViewAll: () => void }) {
  const { projects } = useApp();
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const fallback = projects.slice(0, 3);
  const items = featured.length ? featured : fallback;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div className="max-w-3xl"><span className="inline-flex px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest gold-text bg-gold-light dark:bg-slate-950 border border-gold/25">Selected Work</span><h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Work built around problems, solutions and outcomes.</h2><p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">A quick look at selected projects. Open the full portfolio for implementation details, technology stacks and project metrics.</p></div>
          <button onClick={onViewAll} className="shrink-0 inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-700 dark:text-slate-200 hover:text-gold">View All Projects <ArrowRight size={14}/></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((project, index) => <motion.article key={project.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: index * .06 }} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-gold transition-colors">
            <div className="h-40 bg-slate-900 overflow-hidden"><img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" loading="lazy" referrerPolicy="no-referrer"/></div>
            <div className="p-6"><span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gold">{project.category}</span><h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">{project.title}</h3><p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{project.description}</p><div className="mt-5 space-y-2">{project.metrics.slice(0,2).map(m=><div key={m.label} className="flex items-center justify-between text-[10px] border-t border-slate-100 dark:border-slate-800 pt-2"><span className="flex items-center gap-1.5 text-slate-500"><CheckCircle2 size={12} className="text-gold"/>{m.label}</span><strong className="font-mono text-slate-900 dark:text-white">{m.value}</strong></div>)}</div></div>
          </motion.article>)}

          <motion.article initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: .12 }} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-gold transition-colors">
            <div className="h-40 bg-gradient-to-br from-slate-900 via-slate-800 to-gold/20 flex items-center justify-center"><div className="text-center"><div className="text-3xl font-black text-white">DATA</div><div className="text-[10px] font-mono tracking-widest text-gold mt-1">INSIGHT PRO</div></div></div>
            <div className="p-6"><span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gold">Data Analytics</span><h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">DataInsightPro</h3><p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Browser-first analytics and business-intelligence toolkit for spreadsheets and business data, with dashboards, charts, executive reports, data analysis and reusable data-entry workflows.</p><div className="mt-5 flex flex-wrap gap-2">{["Excel / CSV","Dashboards","Charts","Reports"].map(t=><span key={t} className="text-[9px] px-2 py-1 border border-slate-200 dark:border-slate-800 text-slate-500">{t}</span>)}</div><a href="https://aaliofficialy.github.io/DataInsightPro/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-gold hover:text-slate-900 dark:hover:text-white">Live Demo <ArrowRight size={13}/></a></div>
          </motion.article>

          <motion.article initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: .18 }} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-gold transition-colors">
            <div className="h-40 bg-gradient-to-br from-slate-950 via-indigo-950 to-gold/20 flex items-center justify-center"><div className="text-center"><div className="text-3xl font-black text-white">A L I</div><div className="text-[10px] font-mono tracking-widest text-gold mt-1">AI INTELLIGENCE</div></div></div>
            <div className="p-6"><span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gold">AI / Intelligence</span><h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">A L I — Affiliate Legal Intelligence</h3><p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">AI-powered assistance for legal, business and information workflows, built as an intelligent workspace with AI integration and modern web tooling.</p><div className="mt-5 flex flex-wrap gap-2">{["AI Assistant","React","Google GenAI","Workflow Support"].map(t=><span key={t} className="text-[9px] px-2 py-1 border border-slate-200 dark:border-slate-800 text-slate-500">{t}</span>)}</div><a href="https://aaliofficialy.github.io/MA-AI/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-gold hover:text-slate-900 dark:hover:text-white">Live Demo <ArrowRight size={13}/></a></div>
          </motion.article>
        </div>     </div>
    </section>
  );
}
