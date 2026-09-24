import React from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, MessageSquare, Rocket, Search, Settings2 } from "lucide-react";

const steps = [
  { n: "01", title: "Discover", text: "Share your business goal, current problem, or workflow that needs improvement.", icon: Search },
  { n: "02", title: "Plan", text: "I turn the requirement into a practical scope, recommended tools, and clear deliverables.", icon: MessageSquare },
  { n: "03", title: "Build", text: "Design, development, automation, dashboard or digital system is implemented with regular updates.", icon: Settings2 },
  { n: "04", title: "Launch & Improve", text: "After delivery, we review the result and identify useful next improvements.", icon: Rocket },
];

export default function ProfessionalProcess({ onContact }: { onContact: () => void }) {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest gold-text font-bold bg-white dark:bg-slate-950 px-3 py-1 border border-gold/25">
              <CheckCircle2 size={11} /> Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-5">
              From idea to a <span className="text-gold">working solution.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
              A straightforward workflow for websites, AI automation, dashboards, data projects and digital growth systems.
            </p>
            <button onClick={onContact} className="mt-8 inline-flex items-center gap-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-6 py-3 text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-gold dark:hover:bg-gold transition-colors">
              Start Your Project <ArrowRight size={14} />
            </button>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: .45, delay: i * .08 }}
                  whileHover={{ y: -4 }}
                  className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-7 hover:border-gold/60 transition-all"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-10 flex items-center justify-center bg-gold/10 border border-gold/20">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-slate-300 dark:text-slate-700">{step.n}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
