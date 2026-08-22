import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star, MessageSquare, Quote, CheckCircle2, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import AddTestimonialForm from "./AddTestimonialForm";

export default function Testimonials() {
  const { testimonials } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 3;

  // Reactively trigger brief skeleton loading on page or filter change
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [currentPage, searchQuery]);

  const filteredTestimonials = testimonials.filter((t) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      t.content.toLowerCase().includes(query) ||
      (t.company || "").toLowerCase().includes(query)
    );
  });

  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    const aFeatured = a.rating === 5 ? 1 : 0;
    const bFeatured = b.rating === 5 ? 1 : 0;
    return bFeatured - aFeatured;
  });

  const totalPages = Math.ceil(sortedTestimonials.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, totalPages || 1);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTestimonials = sortedTestimonials.slice(startIndex, endIndex);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest gold-text font-bold bg-gold-light dark:bg-slate-900 border border-gold/25 dark:border-slate-800 px-3 py-1 rounded-none">
            Client Voices
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4 font-serif italic">
            Partnership Testimonials
          </h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            Real feedback from executive directors, marketing consultants, and startup founders who collaborated with Muhammad Ali to accelerate performance and brand reach.
          </p>
        </div>

        {/* Search Input Field Container */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={14} className="text-slate-400 dark:text-slate-500" />
            </span>
            <input
              id="testimonial-search-input"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search keywords in review or company name..."
              className="w-full pl-10 pr-10 py-3 text-xs bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-none focus:outline-none focus:border-gold dark:focus:border-gold focus:ring-1 focus:ring-gold/20 shadow-xs placeholder-slate-400 dark:placeholder-slate-500 font-sans"
            />
            {searchQuery && (
              <button
                id="btn-clear-testimonial-search"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-center">
              <span className="text-[10px] font-mono tracking-wider text-slate-450 dark:text-slate-500 uppercase font-bold">
                Found {filteredTestimonials.length} matching {filteredTestimonials.length === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          )}
        </div>

        {/* Testimonials Grid (Modern layout matching page capacity) */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="bg-white dark:bg-slate-900/50 rounded-none p-6 sm:p-8 border border-slate-200/80 dark:border-slate-900 shadow-sm flex flex-col justify-between relative overflow-hidden animate-pulse"
              >
                <div>
                  {/* Rating indicator skeleton */}
                  <div className="flex items-center space-x-1.5 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-3.5 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-none" />
                    ))}
                  </div>

                  {/* Body skeleton lines */}
                  <div className="space-y-3 mb-8">
                    <div className="h-3.5 bg-slate-200 dark:bg-slate-800 w-full" />
                    <div className="h-3.5 bg-slate-200 dark:bg-slate-800 w-11/12" />
                    <div className="h-3.5 bg-slate-200 dark:bg-slate-800 w-4/5" />
                  </div>
                </div>

                {/* Profile row skeleton */}
                <div className="flex items-center space-x-4 border-t border-slate-150 dark:border-slate-800/80 pt-6 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3.5 bg-slate-200 dark:bg-slate-800 w-1/3" />
                    <div className="h-2.5 bg-slate-200 dark:bg-slate-800 w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout" initial={false}>
              {paginatedTestimonials.map((t) => (
                <motion.div
                  id={`testimonial-card-${t.id}`}
                  key={t.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeInOut",
                    layout: { type: "spring", stiffness: 300, damping: 28 }
                  }}
                  className="bg-white dark:bg-slate-900/50 rounded-none p-6 sm:p-8 border border-slate-200/80 dark:border-slate-900 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                {/* Giant abstract background double quotation icon */}
                <div className="absolute -right-2 top-0 text-gold/[0.04] pointer-events-none">
                  <Quote size={120} className="font-bold rotate-12" />
                </div>

                <div>
                  {/* 5-Star Rating Indicators & Optional Featured Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6 relative z-10">
                    <div id={`testimonial-rating-${t.id}`} className="flex items-center space-x-1 text-gold">
                      {[...Array(t.rating)].map((_, starIdx) => (
                        <Star key={starIdx} size={14} className="fill-gold" />
                      ))}
                    </div>
                    {t.rating === 5 && (
                      <span className="text-[9px] font-mono font-bold tracking-widest text-slate-900 dark:text-gold bg-gold/15 dark:bg-gold/10 border border-gold/30 dark:border-gold/20 py-0.5 px-2 uppercase select-none">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {/* Testimonial Quote body */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed font-sans mb-8 select-all relative z-10">
                    "{t.content}"
                  </p>
                </div>

                {/* Author Info Column */}
                <div className="flex items-center space-x-4 border-t border-slate-100 dark:border-slate-800/80 pt-6 mt-auto">
                  <div className="relative shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border border-gold"
                      referrerPolicy="no-referrer"
                    />
                    {/* Verified checkmark overlap */}
                    <div className="absolute -bottom-1 -right-1 bg-slate-900 text-gold rounded-full p-0.5 border border-white dark:border-slate-900">
                      <CheckCircle2 size={10} className="fill-slate-900 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 tracking-tight font-sans">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                      {t.role} at <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono text-[9px] uppercase tracking-wider">{t.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900/20 border border-dashed border-slate-200 dark:border-slate-800/80 max-w-xl mx-auto rounded-none">
            <span className="text-[10px] block font-mono font-bold tracking-widest text-slate-400 uppercase mb-3 text-gold">No Records Found</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-xs mx-auto mb-6 leading-relaxed">
              No testimonials match your keywords. Try checking the spelling or use simplified search terms.
            </p>
            <button
              onClick={clearSearch}
              className="px-4 py-2 bg-slate-900 dark:bg-slate-850 hover:bg-slate-800 hover:text-gold text-white font-mono text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-all duration-200"
            >
              Reset Search Filter
            </button>
          </div>
        )}

        {/* Beautiful Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <button
                id="btn-testimonials-prev"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={activePage === 1}
                className="p-2.5 rounded-none border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 disabled:opacity-30 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center shadow-xs"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    id={`btn-testimonials-page-${pageNum}`}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider transition-all duration-200 rounded-none cursor-pointer ${
                      activePage === pageNum
                        ? "bg-slate-900 dark:bg-slate-800 text-gold border border-slate-900 dark:border-slate-750 shadow-sm"
                        : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {String(pageNum).padStart(2, "0")}
                  </button>
                ))}
              </div>

              <button
                id="btn-testimonials-next"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={activePage === totalPages}
                className="p-2.5 rounded-none border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 disabled:opacity-30 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center shadow-xs"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="text-[10px] font-mono tracking-widest text-slate-450 dark:text-slate-500 uppercase font-bold">
              [ SHOWING {startIndex + 1} - {Math.min(endIndex, filteredTestimonials.length)} OF {filteredTestimonials.length} VOICE RECORDS ]
            </div>
          </div>
        )}

        {/* Dynamic Add Testimonial Component */}
        <AddTestimonialForm />

      </div>
    </section>
  );
}
