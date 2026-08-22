import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight, ArrowUpRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Service } from "../types";
import LucideIcon from "./LucideIcon";

interface ServicesProps {
  onInquireService: (serviceTitle: string) => void;
}

export default function Services({ onInquireService }: ServicesProps) {
  const { services, searchQuery } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "IT" | "Digital" | "Consulting" >("ALL");

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedFilter === "ALL" || service.category === selectedFilter;
    if (!matchesCategory) return false;

    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      service.title.toLowerCase().includes(searchLower) ||
      service.description.toLowerCase().includes(searchLower) ||
      service.features?.some(f => f.toLowerCase().includes(searchLower))
    );
  });

  const categoryLabels = [
    { label: "All Services", value: "ALL" as const },
    { label: "IT & System Infrastructure", value: "IT" as const },
    { label: "Digital Growth & Media", value: "Digital" as const },
    { label: "Consulting & Advisory", value: "Consulting" as const },
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest gold-text font-bold bg-gold-light dark:bg-slate-900 border border-gold/25 dark:border-slate-800 px-3 py-1 rounded-none">
            Expert Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4 font-serif italic">
            Services & Strategies Provided
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            Unifying high-grade back-office engineering with high-impact front-office attention. I provide end-to-end setups to build, secure, and scale your brand.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categoryLabels.map((cat) => (
            <button
              id={`service-filter-${cat.value}`}
              key={cat.value}
              onClick={() => setSelectedFilter(cat.value)}
              className={`px-5 py-2.5 rounded-none text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 pointer-events-auto cursor-pointer ${
                selectedFilter === cat.value
                  ? "bg-slate-900 dark:bg-slate-800 text-gold shadow-xs"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <motion.div
                layout
                id={`service-card-${service.id}`}
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white dark:bg-slate-900/40 rounded-none p-6 sm:p-8 border border-slate-200/85 dark:border-slate-900 shadow-xs flex flex-col justify-between hover:border-gold dark:hover:border-gold hover:shadow-md transition-all duration-300 relative overflow-hidden"
              >
                {/* Luxury Accent Border on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-900 via-gold to-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div>
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-none bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-slate-950 dark:group-hover:text-slate-950 transition-all duration-300">
                    <LucideIcon name={service.icon} size={20} />
                  </div>

                  {/* Subtitle / category */}
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gold font-bold mb-1.5 block">
                    {service.subtitle || (service as any).badge || "Service Strategy"}
                  </span>

                  {/* Main Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-gold dark:group-hover:text-gold transition-colors duration-200 font-sans tracking-tight">
                    {service.title}
                  </h3>

                  {/* Core description */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed font-sans mb-6">
                    {service.description}
                  </p>

                  {/* Checklist Features */}
                  <ul className="space-y-2.5 mb-8 border-t border-slate-100 dark:border-slate-850/80 pt-6">
                    {(service.features || (service as any).bullets || []).map((feature: string, featureIdx: number) => (
                      <li key={featureIdx} className="flex items-start text-xs text-slate-600 dark:text-slate-300">
                        <div className="p-0.5 rounded-none bg-gold-light dark:bg-slate-850 text-gold shrink-0 mr-2 mt-0.5 border border-gold/10">
                          <Check size={11} className="stroke-[3]" />
                        </div>
                        <span className="font-sans leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inquiry Action Trigger */}
                <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-850/80 flex items-center justify-between">
                  <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                    [{service.category}]
                  </span>
                  <button
                    id={`service-inquire-btn-${service.id}`}
                    onClick={() => onInquireService(service.title)}
                    className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-900 dark:text-slate-150 group-hover:text-gold dark:group-hover:text-gold transition-colors cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-widest">
                No services match your current verification parameters.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
