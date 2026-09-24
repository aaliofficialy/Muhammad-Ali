import React from "react";
import { motion } from "motion/react";
import { BarChart3, Bot, Globe2, Workflow, ArrowUpRight } from "lucide-react";

const outcomes = [
  { icon: Bot, title: "AI & Automation", text: "Reduce repetitive work with practical AI assistants, workflow automation and business tools." },
  { icon: BarChart3, title: "Data & Reporting", text: "Turn Excel, SQL and business data into clean reports, dashboards and decision-ready insights." },
  { icon: Globe2, title: "Web & Digital", text: "Build modern websites and web solutions designed for usability, credibility and conversion." },
  { icon: Workflow, title: "Process Improvement", text: "Simplify manual processes and connect the right tools so teams can work more efficiently." },
];

export default function BusinessImpact({ onContact }: { onContact: () => void }) {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mb-14">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gold">Business Impact</span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Technology should create a <span className="text-gold">measurable advantage.</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base leading-7 text-slate-400">
            The focus is practical delivery: save time, improve visibility, strengthen your digital presence and create systems that can scale with the business.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {outcomes.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} whileHover={{ y: -5 }} className="border border-slate-800 bg-white/[0.03] p-6 hover:border-gold/50 transition-all">
                <Icon size={21} className="text-gold" />
                <h3 className="mt-6 text-base font-bold">{item.title}</h3>
                <p className="mt-3 text-xs leading-6 text-slate-400">{item.text}</p>
              </motion.article>
            );
          })}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-slate-800 pt-8">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500">AI • Data • Web • Digital Growth</p>
          <button onClick={onContact} className="inline-flex items-center gap-2 bg-gold text-slate-950 px-6 py-3 text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-white transition-colors">
            Discuss Your Requirement <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
