import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, Maximize2, MessageCircle, PhoneCall, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

const portrait = new URL("../assets/images/regenerated_image_1780166588314.jpg", import.meta.url).href;
interface ProfessionalHeroProps { onContact: () => void; onProjects: () => void; }

export default function ProfessionalHero({ onContact, onProjects }: ProfessionalHeroProps) {
  const { personalInfo } = useApp();
  const [open, setOpen] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const whatsapp = `https://wa.me/${personalInfo.whatsapp.replace(/[+\s-]/g, "")}?text=${encodeURIComponent(`Hi ${personalInfo.name}, I'd like to discuss a project.`)}`;
  const enter = reduceMotion ? { duration: 0 } : { duration: .65, ease: [0.22, 1, 0.36, 1] as const };

  return <section id="home" className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 lg:py-24">
    <motion.div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" animate={reduceMotion ? {} : { backgroundPosition: ["0px 0px", "28px 28px"] }} transition={reduceMotion ? {} : { duration: 14, repeat: Infinity, ease: "linear" }} />
    <motion.div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" animate={reduceMotion ? {} : { x: [0, -35, 0], y: [0, 25, 0], scale: [1, 1.08, 1] }} transition={reduceMotion ? {} : { duration: 10, repeat: Infinity, ease: "easeInOut" }} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }} animate={{ opacity: 1, y: 0 }} transition={enter}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...enter, delay: .08 }} className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/30 bg-gold-light dark:bg-slate-900 text-[10px] font-mono font-bold tracking-widest uppercase gold-text"><Sparkles size={11} /> AI • DATA • WEB • DIGITAL SOLUTIONS</motion.div>
          <motion.p className="mt-7 text-xs font-mono font-bold tracking-[.25em] uppercase text-slate-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .2 }}>{personalInfo.name}</motion.p>
          <motion.h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-slate-900 dark:text-white" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...enter, delay: .24 }}>I build digital systems that help businesses <motion.span className="gold-text" animate={reduceMotion ? {} : { opacity: [0.78, 1, 0.78] }} transition={reduceMotion ? {} : { duration: 4, repeat: Infinity }}>work smarter and grow.</motion.span></motion.h1>
          <motion.p className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-500 dark:text-slate-300" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...enter, delay: .34 }}>I help businesses automate workflows, analyze data, build modern websites and improve their digital presence with practical, measurable solutions.</motion.p>
          <motion.div className="mt-8 flex flex-wrap gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...enter, delay: .42 }}>
            <motion.button whileHover={reduceMotion ? {} : { y: -3, scale: 1.02 }} whileTap={reduceMotion ? {} : { scale: .97 }} onClick={onContact} className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 text-white hover:bg-gold hover:text-slate-950 text-[11px] font-mono font-bold uppercase tracking-widest transition-colors"><PhoneCall size={14}/> Hire Me</motion.button>
            <motion.button whileHover={reduceMotion ? {} : { y: -3, scale: 1.02 }} whileTap={reduceMotion ? {} : { scale: .97 }} onClick={onProjects} className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gold text-slate-900 dark:text-white hover:bg-gold hover:text-slate-950 text-[11px] font-mono font-bold uppercase tracking-widest transition-colors">View Projects <ArrowRight size={14}/></motion.button>
            <motion.a whileHover={reduceMotion ? {} : { y: -3, scale: 1.02 }} href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-gold hover:text-gold text-[11px] font-mono font-bold uppercase tracking-widest transition-colors"><MessageCircle size={14}/> WhatsApp</motion.a>
          </motion.div>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-7">{[[personalInfo.experienceYears+"+","Years Experience"],[personalInfo.completedProjects+"+","Projects"],[personalInfo.consultationHours,"Consult Hours"]].map(([value,label],i)=><motion.div key={label} initial={{ opacity:0, y:10 }} animate={{ opacity:1,y:0 }} transition={{ ...enter, delay:.5+i*.08 }}><strong className={`block text-2xl font-extrabold ${i===2?"gold-text":"text-slate-900 dark:text-white"}`}>{value}</strong><span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">{label}</span></motion.div>)}</div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">{["Business-focused delivery", "Responsive modern design", "Ongoing support"].map((item,i)=><motion.span key={item} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{...enter,delay:.68+i*.07}} className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400"><CheckCircle2 size={13} className="text-gold"/>{item}</motion.span>)}</div>
        </motion.div>
        <motion.div className="lg:col-span-5 flex justify-center" initial={{ opacity: 0, scale: reduceMotion ? 1 : .92, x: reduceMotion ? 0 : 24 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ ...enter, delay: .2 }}>
          <div className="relative w-full max-w-[390px]">
            <motion.button onClick={() => setOpen(true)} whileHover={reduceMotion ? {} : { scale: 1.015, rotate: .3 }} className="relative block w-full aspect-[4/5] overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl cursor-zoom-in group" aria-label="View professional portrait">
              <motion.div className="absolute -inset-3 border border-dashed border-gold/40 rotate-1 pointer-events-none" animate={reduceMotion ? {} : { rotate: [1, -1, 1] }} transition={reduceMotion ? {} : { duration: 8, repeat: Infinity, ease: "easeInOut" }}/>
              <img src={portrait} alt={`${personalInfo.name} professional portrait`} className="h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]" referrerPolicy="no-referrer"/>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-gold/40 text-gold px-3 py-2 text-[9px] font-mono font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"><Maximize2 size={12}/> View Portrait</span>
            </motion.button>
            <motion.div className="absolute -right-3 top-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-4 max-w-[195px]" animate={reduceMotion ? {} : { y:[0,-8,0] }} transition={reduceMotion ? {} : { duration:4.5, repeat:Infinity, ease:"easeInOut" }}><span className="block text-[9px] font-mono font-bold uppercase tracking-widest gold-text">Core Focus</span><span className="block mt-1 text-xs font-bold text-slate-900 dark:text-white">AI, Data, Web & Digital Growth</span></motion.div>
            <motion.div className="absolute -left-4 bottom-8 bg-slate-900 text-white border border-slate-800 shadow-xl p-4" animate={reduceMotion ? {} : { y:[0,7,0] }} transition={reduceMotion ? {} : { duration:5, repeat:Infinity, ease:"easeInOut", delay:.5 }}><span className="block text-[9px] font-mono uppercase tracking-widest gold-text">Approach</span><span className="block mt-1 text-xs font-bold">Build • Automate • Measure</span></motion.div>
          </div>
        </motion.div>
      </div>
    </div>
    {open && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] bg-slate-950/90 p-6 flex items-center justify-center" onClick={() => setOpen(false)}><motion.img initial={{scale:.9}} animate={{scale:1}} src={portrait} alt={`${personalInfo.name} portrait`} className="max-h-[90vh] max-w-[90vw] object-contain"/></motion.div>}
  </section>;
}
