import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, Filter, Calendar, Tag, ChevronRight, ArrowLeft } from "lucide-react";
import { useApp } from "../context/AppContext";
import { format } from "date-fns";
import { calculateReadingTime } from "../lib/blogUtils";
import AdBanner from "./AdBanner";

export default function Blog() {
  const { articles, setActiveSection, setSelectedArticleId, searchQuery, setSearchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(articles.map(a => a.category));
    return ["All", ...Array.from(cats)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles
      .filter(a => a.status === "published")
      .filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === "All" || a.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
  }, [articles, searchQuery, selectedCategory]);

  const handleReadMore = (id: string) => {
    setSelectedArticleId(id);
    setActiveSection("article");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="relative py-24 bg-slate-900 border-b border-gold/20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#e6c280,transparent_50%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-gold/10 border border-gold/30 px-4 py-1.5 rounded-none mb-6"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-gold">Corporate Knowledge Archive</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-sans font-medium tracking-tight text-white mb-6"
          >
            Expert <span className="italic font-serif text-gold underline md:underline-offset-16 decoration-gold/30">Intelligence</span> Reports
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-sans"
          >
            In-depth analysis and strategic commentary on IT architecture, cryptocurrency markets, and digital infrastructure optimization by Muhammad Ali.
          </motion.p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-[72px] z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-200 border cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-gold border-slate-900 dark:bg-gold dark:text-slate-950 dark:border-gold"
                    : "bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-900 dark:hover:border-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold transition-colors" size={16} />
            <input
              type="text"
              placeholder="SEARCH REPORTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-2.5 pl-12 pr-4 text-[10px] font-mono tracking-widest uppercase focus:outline-none focus:border-gold transition-all duration-300 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <AdBanner location="blog_pages" className="mt-8 mx-auto max-w-4xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredArticles.length > 0 ? (
          <div className="flex flex-col gap-12">
            {filteredArticles.map((article, index) => (
              <React.Fragment key={article.id}>
                {index > 0 && index % 2 === 0 && (
                  <AdBanner location="between_articles" className="my-8" />
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-8 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 rounded-none overflow-hidden"
                >
                  <div className="md:col-span-5 relative h-64 md:h-full overflow-hidden">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-slate-900 text-gold text-[10px] font-mono font-bold tracking-tighter uppercase border border-gold/30 shadow-lg">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-7 p-8 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-5 text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-2 text-gold" />
                        {format(new Date(article.publishDate), "MMM dd, yyyy")}
                      </div>
                      <span>•</span>
                      <div>{calculateReadingTime(article.content)} MIN READ</div>
                    </div>

                    <h3 className="text-3xl font-sans font-medium text-slate-900 dark:text-white mb-6 group-hover:text-gold transition-colors leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-base text-slate-500 dark:text-slate-400 mb-8 line-clamp-3 leading-relaxed font-sans">
                      {article.excerpt}
                    </p>

                    <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-900 gap-4">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[9px] font-mono text-slate-400 flex items-center">
                             #{tag.replace(/\s+/g, '')}
                          </span>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handleReadMore(article.id)}
                        className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-slate-900 dark:text-slate-150 hover:text-gold transition-colors cursor-pointer group/btn flex-shrink-0"
                      >
                        <span>Access Intelligence</span>
                        <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-sans font-medium text-slate-400 mb-4">No Intel Matching Your Parameters</h3>
            <button
               onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
               className="text-gold font-mono text-xs font-bold tracking-widest uppercase underline underline-offset-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Newsletter / CTA */}
      <div className="bg-slate-950 py-24 border-t border-gold/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-medium text-white mb-6">Receive Strategic <span className="text-gold italic font-serif">Updates</span></h2>
          <p className="text-slate-400 mb-10 text-sm font-sans max-w-xl mx-auto">
            Get the latest technical architectural insights and market intelligence delivered directly to your inbox. No spam, only engineering-grade data.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
             <input 
              type="email" 
              placeholder="ENTER EMAIL ADDRESS..." 
              className="flex-grow bg-slate-900 border border-slate-800 px-6 py-4 text-xs font-mono text-white focus:outline-none focus:border-gold transition-colors uppercase tracking-widest"
             />
             <button className="bg-gold text-slate-950 px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase hover:bg-white transition-colors cursor-pointer">
               Subscribe
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
