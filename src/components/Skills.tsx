import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Award, Check, Sparkles, Cpu, Library, BarChart3 } from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { SKILLS } from "../data";
import { Skill } from "../types";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "IT & Architecture" | "Crypto & Finance" | "Growth & Creation" | "AI & Tools">("ALL");

  const categories = useMemo(() => [
    { label: "All Skills", value: "ALL" as const },
    { label: "IT & Systems", value: "IT & Architecture" as const },
    { label: "Crypto Analytics", value: "Crypto & Finance" as const },
    { label: "Marketing & Growth", value: "Growth & Creation" as const },
    { label: "AI Workflows", value: "AI & Tools" as const },
  ], []);

  const chartData = useMemo(() => {
    return categories.filter(c => c.value !== "ALL").map(cat => {
      const categorySkills = SKILLS.filter(s => s.category === cat.value);
      const avgLevel = categorySkills.length > 0 
        ? categorySkills.reduce((acc, s) => acc + s.level, 0) / categorySkills.length 
        : 0;
      return {
        subject: cat.label,
        level: Math.round(avgLevel),
      };
    });
  }, [categories]);

  const filteredSkills = SKILLS.filter(skill => {
    if (selectedCategory === "ALL") return true;
    return skill.category === selectedCategory;
  });

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest gold-text font-bold bg-gold-light dark:bg-slate-900 px-3 py-1 rounded-none border border-gold/25 dark:border-slate-800">
            Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4 font-serif italic">
            Technical & Strategic Skillset
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            A comprehensive, multi-disciplinary toolset designed to solve performance challenges, protect web networks, model systems, and scale organic brand influence.
          </p>
        </div>

        {/* Dynamic Visualization Panel */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* Radar Chart Area */}
          <div className="lg:col-span-5 h-[350px] sm:h-[450px] w-full bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-900/50 p-6 flex flex-col items-center justify-center relative">
            <div className="absolute top-4 left-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-tighter text-slate-400 dark:text-slate-500 uppercase">Proficiency Radar Matrix</span>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" opacity={0.5} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700, fontFamily: "monospace" }} 
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Proficiency"
                  dataKey="level"
                  stroke="#D4AF37"
                  fill="#D4AF37"
                  fillOpacity={0.15}
                  dot={{ r: 3, fill: "#D4AF37", strokeWidth: 2 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#0f172a", 
                    border: "none", 
                    borderRadius: "0",
                    fontSize: "10px",
                    fontFamily: "monospace",
                    color: "#fff"
                  }}
                  itemStyle={{ color: "#D4AF37" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Visualization Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gold/10 rounded-sm">
                <BarChart3 size={20} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-slate-100 italic">Interdisciplinary Expertise Density</h3>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-8">
              The radar matrix visualize the convergence of specialized IT infrastructure with digital growth mechanics. 
              My capabilities are distributed across four high-leverage domains, ensuring that technical robustness is always paired with strategic visibility.
            </p>

            <div className="space-y-4">
              {chartData.map((data) => (
                <div key={data.subject} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] font-bold font-mono text-slate-700 dark:text-slate-350 uppercase tracking-wider">{data.subject}</span>
                    <span className="text-[11px] font-bold font-mono text-gold">{data.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 dark:bg-slate-900 rounded-none overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${data.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-slate-900 dark:bg-gold opacity-80"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              id={`skills-tab-${cat.value}`}
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-none text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.value
                  ? "bg-slate-900 dark:bg-slate-800 text-gold shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-805 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Vertical Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredSkills.map((skill, index) => (
            <motion.div
              layout
              id={`skill-bar-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              className="bg-gray-50/75 dark:bg-slate-900/40 hover:bg-gray-55 rounded-none p-5 border border-slate-200/80 dark:border-slate-900 shadow-xs flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Text Label Area */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 rounded-none font-bold uppercase">
                    {skill.yearsOfExp} Yr Exp
                  </span>
                </div>

                {/* Subtext info */}
                <span className="text-[9px] font-mono tracking-widest text-gold uppercase mb-4 block font-bold">
                  {skill.category}
                </span>

                {/* Progress Visual Bar Container */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-950 rounded-none overflow-hidden relative mt-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: (index * 0.05) + 0.3 }}
                    className="h-full bg-gold rounded-none"
                  />
                </div>
              </div>

              {/* Skill level indicator */}
              <div className="flex justify-between items-center mt-3 text-[9px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase">
                <span>FOUNDATIONAL</span>
                <span className="font-bold text-slate-700 dark:text-slate-350">{skill.level}% CAPABILITY LEVEL</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom micro quote box */}
        <div className="mt-16 text-center max-w-xl mx-auto p-4 rounded-none border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xs">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center justify-center gap-1.5 uppercase font-bold tracking-widest">
            <Award size={14} className="text-gold" />
            Rigorous continuous education and custom technical certifications.
          </p>
        </div>

      </div>
    </section>
  );
}
