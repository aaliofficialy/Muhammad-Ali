import React from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Maximize2, MessageCircle, PhoneCall, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

const portrait = new URL("../assets/images/regenerated_image_1780166588314.jpg", import.meta.url).href;

interface ProfessionalHeroProps { onContact: () => void; onProjects: () => void; }

export default function ProfessionalHero({ onContact, onProjects }: ProfessionalHeroProps) {
  const { personalInfo } = useApp();
  const [open, setOpen] = React.useState(false);
  const whatsapp = `https://wa.me/${personalInfo.whatsapp.replace(/[+\s-]/g, "")}?text=${encodeURIComponent(`Hi ${personalInfo.name}, I'd like to discuss a project.`)}`;

  return (
    <section id="home" className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/30 bg-gold-light dark:bg-slate-900 text-[10px] font-mono font-bold tracking-widest uppercase gold-text">
              <Sparkles size={11} /> AI • DATA • WEB • DIGITAL SOLUTIONS
            </div>
            <p className="mt-7 text-xs font-mono font-bold tracking-[.25em] uppercase text-slate-400">{personalInfo.name}</p>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-slate-900 dark:text-white">
              I build digital systems that help businesses <span className="gold-text">work smarter and grow.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-500 dark:text-slate-300">
              I help businesses automate workflows, analyze data, build modern websites and improve their digital presence with practical, measurable solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={onContact} className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white hover:bg-gold hover:text-slate-950 text-[11px] font-mono font-bold uppercase tracking-widest transition-colors"><PhoneCall size={14}/> Hire Me</button>
              <button onClick={onProjects} className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gold text-slate-900 dark:text-white hover:bg-gold hover:text-slate-950 text-[11px] font-mono font-bold uppercase tracking-widest transition-colors">View Projects <ArrowRight size={14}/></button>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-gold hover:text-gold text-[11px] font-mono font-bold uppercase tracking-widest transition-colors"><MessageCircle size={14}/> WhatsApp</a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-7">
              <div><strong className="block text-2xl font-extrabold text-slate-900 dark:text-white">{personalInfo.experienceYears}+</strong><span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Years Experience</span></div>
              <div><strong className="block text-2xl font-extrabold text-slate-900 dark:text-white">{personalInfo.completedProjects}+</strong><span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Projects</span></div>
              <div><strong className="block text-2xl font-extrabold gold-text">{personalInfo.consultationHours}</strong><span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Consult Hours</span></div>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {["Business-focused delivery", "Responsive modern design", "Ongoing support"].map(item => <span key={item} className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400"><CheckCircle2 size={13} className="text-gold"/>{item}</span>)}
            </div>
          </motion.div>
          <motion.div className="lg:col-span-5 flex justify-center" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65 }}>
            <div className="relative w-full max-w-[390px]">
              <button onClick={() => setOpen(true)} className="relative block w-full aspect-[4/5] overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl cursor-zoom-in group" aria-label="View professional portrait">
                <div className="absolute -inset-3 border border-dashed border-gold/40 rotate-1 pointer-events-none"/>
                <img src={portrait} alt={`${personalInfo.name} professional portrait`} className="h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]" referrerPolicy="no-referrer"/>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-gold/40 text-gold px-3 py-2 text-[9px] font-mono font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"><Maximize2 size={12}/> View Portrait</span>
              </button>
              <div className="absolute -right-3 top-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-4 max-w-[195px]"><span className="block text-[9px] font-mono font-bold uppercase tracking-widest gold-text">Core Focus</span><span className="block mt-1 text-xs font-bold text-slate-900 dark:text-white">AI, Data, Web & Digital Growth</span></div>
              <div className="absolute -left-4 bottom-8 bg-slate-900 text-white border border-slate-800 shadow-xl p-4"><span className="block text-[9px] font-mono uppercase tracking-widest gold-text">Approach</span><span className="block mt-1 text-xs font-bold">Build • Automate • Measure</span></div>
            </div>
          </motion.div>
        </div>
      </div>
      {open && <div className="fixed inset-0 z-[100] bg-slate-950/90 p-6 flex items-center justify-center" onClick={() => setOpen(false)}><img src={portrait} alt={`${personalInfo.name} portrait`} className="max-h-[90vh] max-w-[90vw] object-contain"/></div>}
    </section>
  );
}
