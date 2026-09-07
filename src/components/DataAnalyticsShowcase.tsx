import React from "react";
import { motion } from "motion/react";
import { BarChart3, Database, FileSpreadsheet, TrendingUp } from "lucide-react";

const kpis = [
  { label: "Revenue", value: "$84.6K", change: "+18.4%" },
  { label: "Conversion", value: "6.8%", change: "+1.7%" },
  { label: "Orders", value: "2,184", change: "+12.2%" },
  { label: "Avg. Value", value: "$38.74", change: "+8.1%" },
];

export default function DataAnalyticsShowcase() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest gold-text bg-gold-light dark:bg-slate-900 border border-gold/25">Data Analytics</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Turn spreadsheets and raw data into decisions.</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">I build clear KPI reports and dashboards that help teams see performance, spot trends and act faster.</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {[
                [FileSpreadsheet, "Excel", "Reports & models"],
                [BarChart3, "Power BI", "Interactive dashboards"],
                [Database, "SQL", "Data extraction"],
                [TrendingUp, "Python", "Analysis & automation"],
              ].map(([Icon, title, text]) => {
                const I = Icon as React.ElementType;
                return <div key={title as string} className="border border-slate-200 dark:border-slate-800 p-4"><I size={17} className="text-gold"/><p className="mt-2 text-xs font-bold text-slate-900 dark:text-white">{title as string}</p><p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">{text as string}</p></div>;
              })}
            </div>
          </div>

          <motion.div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm" initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .5 }}>
            <div className="flex items-center justify-between mb-5"><div><span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gold">Sample Business Dashboard</span><h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">Performance Overview</h3></div><BarChart3 size={18} className="text-slate-400"/></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{kpis.map(k => <div key={k.label} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3"><span className="block text-[9px] uppercase tracking-wider text-slate-400">{k.label}</span><strong className="block mt-1 text-base font-extrabold text-slate-900 dark:text-white">{k.value}</strong><span className="text-[9px] font-mono text-gold">{k.change}</span></div>)}</div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-5 gap-5">
              <div className="md:col-span-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4"><p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-5">Monthly Revenue Trend</p><div className="h-32 flex items-end gap-2">{[42,55,48,68,61,78,92,74,86,100,90,108].map((h,i)=><div key={i} className="flex-1 bg-slate-900 dark:bg-gold/80 hover:bg-gold transition-colors" style={{height:`${Math.min(h,100)}%`}} title={`Month ${i+1}`}/>)}</div></div>
              <div className="md:col-span-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4"><p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-4">Top Channels</p>{["Organic", "Paid Social", "Search", "Referral"].map((x,i)=><div key={x} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"><span className="text-[10px] text-slate-600 dark:text-slate-300">{x}</span><span className="text-[10px] font-mono font-bold text-slate-900 dark:text-white">{[38,27,21,14][i]}%</span></div>)}</div>
            </div>
            <p className="mt-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Sample visualization • figures shown for demonstration</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
