import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Award, BarChart3, Sparkles } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { SKILLS } from "../data";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "IT & Architecture" | "Crypto & Finance" | "Growth & Creation" | "AI & Tools">("ALL");
  const categories = useMemo(() => [
    { label: "All Skills", value: "ALL" as const },
    { label: "IT & Systems", value: "IT & Architecture" as const },
    { label: "Crypto Analytics", value: "Crypto & Finance" as const },
    { label: "Marketing & Growth", value: "Growth & Creation" as const },
    { label: "AI Workflows", value: "AI & Tools" as const },
  ], []);
  const chartData = useMemo(() => categories.filter(c => c.value !== "ALL").map(cat => {
    const items = SKILLS.filter(s => s.category === cat.value);
    return { subject: cat.label, level: items.length ? Math.round(items.reduce((sum, s) => sum + s.level, 0) / items.length) : 0 };
  }), [categories]);
  const filteredSkills = SKILLS.filter(skill => selectedCategory === "ALL" || skill.category === selectedCategory);

  return <section id="skills" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
    <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/[0.04] rounded-full blur-3xl pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest gold-text font-bold bg-gold-light dark:bg-slate-900 px-3 py-1 border border-gold/25"><Sparkles size={11}/> Capabilities</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4">Technical skills built for business outcomes.</h2>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">A practical mix of AI, data, web and digital-growth capabilities. Explore the areas where technology and business execution meet.</p>
      </div>

      <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
        <motion.div className="lg:col-span-5 h-[350px] sm:h-[430px] w-full bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-5 flex flex-col items-center justify-center relative shadow-sm" initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .5 }}>
          <div className="absolute top-4 left-5 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gold animate-pulse"/><span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">Capability Matrix</span></div>
          <ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="72%" data={chartData}><PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" opacity={.45}/><PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 9, fontWeight: 700, fontFamily: "monospace" }}/><PolarRadiusAxis angle={30} domain={[0,100]} tick={false} axisLine={false}/><Radar name="Capability" dataKey="level" stroke="#D4AF37" fill="#D4AF37" fillOpacity={.16} dot={{r:3, fill:"#D4AF37", strokeWidth:2}}/><Tooltip contentStyle={{backgroundColor:"#0f172a",border:"none",borderRadius:0,fontSize:10,fontFamily:"monospace",color:"#fff"}} itemStyle={{color:"#D4AF37"}}/></RadarChart></ResponsiveContainer>
        </motion.div>
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-5"><div className="p-2 bg-gold/10"><BarChart3 size={20} className="text-gold"/></div><h3 className="text-xl font-bold text-slate-900 dark:text-white">One skillset. Multiple business problems.</h3></div>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">From data cleanup to AI workflows and modern web systems, the goal is not technology for its own sake — it is to make work faster, clearer and more scalable.</p>
          <div className="space-y-5">{chartData.map(data => <div key={data.subject}><div className="flex justify-between mb-2"><span className="text-[10px] font-bold font-mono text-slate-600 dark:text-slate-300 uppercase tracking-widest">{data.subject}</span><span className="text-[10px] font-bold font-mono text-gold">{data.level}%</span></div><div className="h-1.5 bg-slate-100 dark:bg-slate-900 overflow-hidden"><motion.div initial={{width:0}} whileInView={{width:`${data.level}%`}} viewport={{once:true}} transition={{duration:1.1,ease:"easeOut"}} className="h-full bg-slate-900 dark:bg-gold"/></div></div>)}</div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">{categories.map(cat => <button key={cat.value} onClick={() => setSelectedCategory(cat.value)} className={`px-5 py-2.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-300 ${selectedCategory===cat.value ? "bg-slate-900 text-gold border border-slate-900" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-gold hover:text-gold"}`}>{cat.label}</button>)}</div>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">{filteredSkills.map((skill,index)=><motion.div layout key={skill.name} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-40px"}} transition={{duration:.45,delay:index*.04}} whileHover={{y:-4}} className="group bg-slate-50/80 dark:bg-slate-900/50 p-5 border border-slate-200 dark:border-slate-800 hover:border-gold hover:shadow-lg transition-all duration-300"><div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-900 dark:text-white">{skill.name}</span><span className="text-[9px] font-mono font-bold text-slate-500 border border-slate-200 dark:border-slate-700 px-2 py-1">{skill.yearsOfExp} YR EXP</span></div><span className="block mt-2 text-[9px] font-mono tracking-widest text-gold uppercase font-bold">{skill.category}</span><div className="mt-5 h-1.5 bg-white dark:bg-slate-950 overflow-hidden"><motion.div initial={{width:0}} whileInView={{width:`${skill.level}%`}} viewport={{once:true}} transition={{duration:1.1,delay:index*.03+.2,ease:"easeOut"}} className="h-full bg-gold"/></div><div className="mt-3 flex justify-between text-[9px] font-mono font-bold uppercase text-slate-400"><span>Capability</span><span className="text-slate-600 dark:text-slate-300">{skill.level}%</span></div></motion.div>)}</motion.div>
      <div className="mt-14 text-center max-w-xl mx-auto p-4 border border-dashed border-slate-200 dark:border-slate-800"><p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono flex items-center justify-center gap-2 uppercase font-bold tracking-widest"><Award size={14} className="text-gold"/>Continuous learning • Practical delivery • Business focus</p></div>
    </div>
  </section>;
}
