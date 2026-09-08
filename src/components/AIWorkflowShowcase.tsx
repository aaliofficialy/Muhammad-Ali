import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Bot, CheckCircle2, Database, Workflow } from "lucide-react";

const steps = [
  { icon: Database, label: "Input", text: "Data, documents or business requests" },
  { icon: Bot, label: "AI Processing", text: "Analyze, understand and generate" },
  { icon: Workflow, label: "Automation", text: "Connect tools and execute workflows" },
  { icon: CheckCircle2, label: "Business Result", text: "Save time and reduce manual work" },
];

export default function AIWorkflowShowcase({ onContact }: { onContact: () => void }) {
  const reduceMotion = useReducedMotion();
  return <section className="py-20 bg-slate-950 text-white overflow-hidden relative">
    <motion.div className="absolute inset-y-0 left-1/3 w-72 bg-gold/5 blur-3xl" animate={reduceMotion ? {} : { x: [0, 80, 0], opacity: [.4, .7, .4] }} transition={reduceMotion ? {} : { duration: 9, repeat: Infinity, ease: "easeInOut" }} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mb-12"><span className="inline-flex px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-gold bg-white/5 border border-gold/30">AI Solutions</span><h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">From manual work to an automated business workflow.</h2><p className="mt-4 text-sm leading-relaxed text-slate-400">A simple visual model of how AI, data and automation can connect into a practical solution.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-stretch">{steps.map((step,index)=>{const Icon=step.icon;return <React.Fragment key={step.label}><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: index * .1 }} whileHover={reduceMotion ? {} : { y: -5 }} className="md:col-span-1 border border-slate-800 bg-white/[0.03] p-5 hover:border-gold/60 transition-colors"><div className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold"><Icon size={18}/></div><span className="block mt-5 text-[9px] font-mono uppercase tracking-widest text-gold">0{index+1}</span><h3 className="mt-1 text-sm font-bold">{step.label}</h3><p className="mt-2 text-[11px] leading-relaxed text-slate-400">{step.text}</p></motion.div>{index<steps.length-1&&<div className="hidden md:flex items-center justify-center text-gold/50"><ArrowRight size={18}/></div>}</React.Fragment>})}</div>
      <motion.button onClick={onContact} whileHover={reduceMotion ? {} : { y: -3 }} whileTap={reduceMotion ? {} : { scale: .97 }} className="mt-9 inline-flex items-center gap-2 bg-gold text-slate-950 px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest">Automate My Workflow <ArrowRight size={14}/></motion.button>
    </div>
  </section>;
}
