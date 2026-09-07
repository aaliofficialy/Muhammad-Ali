import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, MessageSquare } from "lucide-react";
import { useApp } from "../context/AppContext";
import LucideIcon from "./LucideIcon";

interface ServicesProps { onInquireService: (serviceTitle: string) => void; }

const focusGroups = [
  { value: "ALL", label: "All Services" },
  { value: "IT", label: "AI & Technology" },
  { value: "Digital", label: "Digital Growth" },
  { value: "Consulting", label: "Business Automation" },
] as const;

export default function Services({ onInquireService }: ServicesProps) {
  const { services, searchQuery } = useApp();
  const [filter, setFilter] = useState<(typeof focusGroups)[number]["value"]>("ALL");
  const visible = services.filter((service) => {
    if (filter !== "ALL" && service.category !== filter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return service.title.toLowerCase().includes(q) || service.description.toLowerCase().includes(q) || service.features.some((f) => f.toLowerCase().includes(q));
  });

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <span className="inline-flex px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest gold-text bg-gold-light dark:bg-slate-900 border border-gold/25">Services</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Practical solutions for modern businesses.</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">Choose a focused service or combine solutions into one project. Every engagement is designed around a clear business need, useful deliverables and a measurable outcome.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {focusGroups.map((group) => <button key={group.value} onClick={() => setFilter(group.value)} className={`px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest border transition-colors ${filter === group.value ? "bg-slate-900 text-gold border-slate-900" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-gold hover:text-gold"}`}>{group.label}</button>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((service, index) => (
            <motion.article key={service.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .4, delay: index * .05 }} className="group relative flex flex-col bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-7 hover:border-gold hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 bg-slate-900 text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-slate-950 transition-colors"><LucideIcon name={service.icon} size={20}/></div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest gold-text">{service.subtitle}</span>
              <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{service.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{service.description}</p>
              <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-5 flex-1">
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-3">What you get</p>
                <ul className="space-y-2.5">{service.features.slice(0, 4).map((feature) => <li key={feature} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"><Check size={13} className="text-gold shrink-0 mt-0.5"/>{feature}</li>)}</ul>
              </div>
              <button onClick={() => onInquireService(service.title)} className="mt-7 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white hover:bg-gold hover:text-slate-950 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors"><MessageSquare size={13}/> Start a Conversation <ArrowRight size={13}/></button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
