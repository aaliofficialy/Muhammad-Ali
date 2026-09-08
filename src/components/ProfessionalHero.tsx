import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, Maximize2, MessageCircle, PhoneCall, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

const portrait = new URL("../assets/images/regenerated_image_1780166588314.jpg", import.meta.url).href;
interface ProfessionalHeroProps { onContact: () => void; onProjects: () => void; }
const reveal = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function ProfessionalHero({ onContact, onProjects }: ProfessionalHeroProps) {
  const { personalInfo } = useApp();
  const [open, setOpen] = React.useState(false);
  const whatsapp = `https://wa.me/${personalInfo.whatsapp.replace(/[+\s-]/g, "")}?text=${encodeURIComponent(`Hi ${personalInfo.name}, I'd like to discuss a project.`)}`;
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rotateX = useTransform(useSpring(my, { stiffness: 180, damping: 22 }), [-100, 100], [5, -5]);
  const rotateY = useTransform(useSpring(mx, { stiffness: 180, damping: 22 }), [-100, 100], [-5, 5]);
  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left - r.width / 2); my.set(e.clientY - r.top - r.height / 2); };
  const resetPointer = () => { mx.set(0); my.set(0); };

  return <section id="home" className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 lg:py-24">
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
    <motion.div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" animate={{ x: [0, 25, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-slate-200/40 dark:bg-slate-800/30 blur-3xl pointer-events-none" animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <motion.div className="lg:col-span-7" variants={{ hidden: {}, show: { transition: { staggerChildren: .09 } } }} initial="hidden" animate="show">
        <motion.div variants={reveal} className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/30 bg-gold-light dark:bg-slate-900 text-[10px] font-mono font-bold tracking-widest uppercase gold-text"><Sparkles size={11}/> AI • DATA • WEB • DIGITAL SOLUTIONS</motion.div>
        <motion.p variants={reveal} className="mt-7 text-xs font-mono font-bold tracking-[.25em] uppercase text-slate-400">{personalInfo.name}</motion.p>
        <motion.h1 variants={reveal} className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-slate-900 dark:text-white">I build digital systems that help businesses <span className="gold-text">work smarter and grow.</span></motion.h1>
        <motion.p variants={reveal} className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-500 dark:text-slate-300">I help businesses automate workflows, analyze data, build modern websites and improve their digital presence with practical, measurable solutions.</motion.p>
        <motion.div variants={reveal} className="mt-8 flex flex-wrap gap-3"><motion.button whileHover={{ y: -3 }} whileTap={{ scale: .97 }} onClick={onContact} className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white hover:bg-gold hover:text-slate-950 text-[11px] font-mono font-bold uppercase tracking-widest transition-colors"><PhoneCall size={14}/> Hire Me</motion.button><motion.button whileHover={{ y: -3 }} whileTap={{ scale: .97 }} onClick={onProjects} className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gold text-slate-900 dark:text-white hover:bg-gold hover:text-slate-950 text-[11px] font-mono font-bold uppercase tracking-widest transition-colors">View Projects <ArrowRight size={14}/></motion.button><motion.a whileHover={{ y: -3 }} whileTap={{ scale: .97 }} href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-gold hover:text-gold text-[11px] font-mono font-bold uppercase tracking-widest transition-colors"><MessageCircle size={14}/> WhatsApp</motion.a></motion.div>
        <motion.div variants={reveal} className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-7">{[['experienceYears','Years Experience'],['completedProjects','Projects'],['consultationHours','Consult Hours']].map(([key,label],i)=><div key={key}><strong className={`block text-2xl font-extrabold ${i===2?'gold-text':'text-slate-900 dark:text-white'}`}>{personalInfo[key as keyof typeof personalInfo]}{i<2?'+':''}</strong><span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">{label}</span></div>)}</motion.div>
        <motion.div variants={reveal} className="mt-6 flex flex-wrap gap-x-6 gap-y-2">{['Business-focused delivery','Responsive modern design','Ongoing support'].map(item=><span key={item} className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400"><CheckCircle2 size={13} className="text-gold"/>{item}</span>)}</motion.div>
      </motion.div>
      <motion.div className="lg:col-span-5 flex justify-center" initial={{ opacity: 0, x: 30, scale: .94 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .8, delay: .25, ease: [0.22,1,0.36,1] }}><motion.div className="relative w-full max-w-[390px]" onPointerMove={handlePointer} onPointerLeave={resetPointer} style={{ perspective: 1000, rotateX, rotateY }}>
        <motion.div className="absolute -inset-5 border border-gold/20 pointer-events-none" animate={{ rotate: [0, 2, 0], scale: [1, 1.015, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}/>
        <button onClick={() => setOpen(true)} className="relative block w-full aspect-[4/5] overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl cursor-zoom-in group" aria-label="View professional portrait"><div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent z-10 pointer-events-none"/><motion.img src={portrait} alt={`${personalInfo.name} professional portrait`} className="h-full w-full object-contain object-top" whileHover={{ scale: 1.025 }} transition={{ duration: .5 }} referrerPolicy="no-referrer"/><span className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-slate-900/95 border border-gold/40 text-gold px-3 py-2 text-[9px] font-mono font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"><Maximize2 size={12}/> View Portrait</span></button>
        <motion.div className="absolute -right-3 top-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-4 max-w-[195px]" animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><span className="block text-[9px] font-mono font-bold uppercase tracking-widest gold-text">Core Focus</span><span className="block mt-1 text-xs font-bold text-slate-900 dark:text-white">AI, Data, Web & Digital Growth</span></motion.div>
        <motion.div className="absolute -left-4 bottom-8 bg-slate-900 text-white border border-slate-800 shadow-xl p-4" animate={{ y: [0, 7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: .5 }}><span className="block text-[9px] font-mono uppercase tracking-widest gold-text">Approach</span><span className="block mt-1 text-xs font-bold">Build • Automate • Measure</span></motion.div>
      </motion.div></motion.div>
    </div></div>
    {open && <motion.div className="fixed inset-0 z-[100] bg-slate-950/90 p-6 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setOpen(false)}><motion.img src={portrait} alt={`${personalInfo.name} portrait`} className="max-h-[90vh] max-w-[90vw] object-contain" initial={{ scale: .92 }} animate={{ scale: 1 }} transition={{ duration: .3 }}/></motion.div>}
  </section>;
}
