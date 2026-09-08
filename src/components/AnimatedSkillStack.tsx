import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BarChart3, BrainCircuit, Code2, Database, FileSpreadsheet, Globe2, Palette, Share2 } from "lucide-react";

const skills = [
  [BrainCircuit, "AI & Automation", "AI tools, agents & workflows"],
  [BarChart3, "Power BI", "Dashboards & KPI reporting"],
  [FileSpreadsheet, "Excel", "Models, reports & automation"],
  [Database, "SQL", "Queries & structured data"],
  [Code2, "Python", "Analysis & automation"],
  [Globe2, "Web Development", "Modern responsive websites"],
  [Share2, "Digital Growth", "Social & digital strategy"],
  [Palette, "UI / UX", "Clean business interfaces"],
] as const;

export default function AnimatedSkillStack() {
  const reduceMotion = useReducedMotion();
  return <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-3xl mb-10"><span className="inline-flex px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest gold-text bg-gold-light dark:bg-slate-900 border border-gold/25">Capabilities</span><h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">A technology stack built for useful outcomes.</h2><p className="mt-3 text-sm text-slate-500 dark:text-slate-400">A focused mix of AI, analytics, development and digital skills — selected to solve real business problems.</p></div><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{skills.map(([Icon,title,text],i)=><motion.div key={title} initial={{ opacity:0, scale:.96, y:12 }} whileInView={{ opacity:1, scale:1, y:0 }} viewport={{ once:true, margin:"-50px" }} transition={{ duration:.45, delay:i*.05 }} whileHover={reduceMotion?{}:{ y:-6, scale:1.015 }} className="group p-5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 hover:border-gold hover:shadow-lg transition-colors"><div className="flex items-center justify-between"><div className="w-10 h-10 bg-slate-900 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-slate-950 transition-colors"><Icon size={18}/></div><span className="text-[9px] font-mono text-slate-400">0{i+1}</span></div><h3 className="mt-5 text-xs font-bold text-slate-900 dark:text-white">{title}</h3><p className="mt-2 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">{text}</p><div className="mt-4 h-1 bg-slate-200 dark:bg-slate-800 overflow-hidden"><motion.div initial={{ width:0 }} whileInView={{ width:"100%" }} viewport={{ once:true }} transition={{ duration:1, delay:.2+i*.05 }} className="h-full bg-gold"/></div></motion.div>)}</div></div></section>;
}
