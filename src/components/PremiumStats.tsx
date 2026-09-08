import React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Activity, BriefcaseBusiness, Clock3, Layers3 } from "lucide-react";

const stats = [
  { icon: BriefcaseBusiness, value: 5, suffix: "+", label: "Core Solution Areas" },
  { icon: Layers3, value: 20, suffix: "+", label: "Digital Capabilities" },
  { icon: Clock3, value: 24, suffix: "/7", label: "Project Mindset" },
  { icon: Activity, value: 100, suffix: "%", label: "Business Focus" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = React.useState(reduceMotion ? value : 0);
  React.useEffect(() => {
    if (!inView || reduceMotion) { if (reduceMotion) setCount(value); return; }
    let frame = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function PremiumStats() {
  return <section className="relative z-10 py-5 bg-slate-950 border-y border-slate-800 shadow-2xl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-800">
      {stats.map((stat, index) => { const Icon = stat.icon; return <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: index * .08 }} className="px-4 sm:px-7 py-3 flex items-center gap-3 group"><div className="w-9 h-9 shrink-0 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-slate-950 transition-colors"><Icon size={16}/></div><div><strong className="block text-lg sm:text-xl font-extrabold text-white font-mono"><Counter value={stat.value} suffix={stat.suffix}/></strong><span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-slate-500">{stat.label}</span></div></motion.div>; })}
    </div>
  </section>;
}
