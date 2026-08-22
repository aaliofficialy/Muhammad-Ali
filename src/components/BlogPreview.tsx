import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Tag, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { format } from "date-fns";
import { calculateReadingTime } from "../lib/blogUtils";

export default function BlogPreview() {
  const { articles, setActiveSection, setSelectedArticleId, searchQuery } = useApp();
  
  // Apply search filter if query exists, otherwise show featured/latest
  const filteredArticles = articles
    .filter(a => a.status === "published")
    .filter(a => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(searchLower) ||
        a.excerpt.toLowerCase().includes(searchLower) ||
        a.tags.some(t => t.toLowerCase().includes(searchLower))
      );
    });

  const displayArticles = filteredArticles.slice(0, 3);

  if (displayArticles.length === 0 && !searchQuery) return null;

  const handleReadMore = (id: string) => {
    setSelectedArticleId(id);
    setActiveSection("article");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="blog-preview" className="py-24 bg-gray-50/50 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-gold mb-3"
            >
              <div className="h-px w-8 bg-gold"></div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Intellectual Capital</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-sans font-medium tracking-tight text-slate-900 dark:text-white"
            >
              Strategic <span className="italic font-serif text-gold">Insights</span> & Articles
            </motion.h2>
          </div>
          
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => setActiveSection("blog")}
            className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-slate-500 hover:text-gold transition-colors cursor-pointer"
          >
            <span>View All Publications</span>
            <ArrowRight size={14} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-gold/50 transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-slate-900/90 text-gold text-[10px] font-mono font-bold tracking-tighter uppercase backdrop-blur-sm border border-gold/30">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 mb-4 text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1.5 text-gold" />
                    {format(new Date(article.publishDate), "MMM dd, yyyy")}
                  </div>
                  <span>•</span>
                  <div>{calculateReadingTime(article.content)} MIN READ</div>
                  <div className="flex items-center">
                    <Tag size={12} className="mr-1.5 text-gold" />
                    {article.tags[0]}
                  </div>
                </div>

                <h3 className="text-xl font-sans font-medium text-slate-900 dark:text-white mb-3 group-hover:text-gold transition-colors line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed font-sans">
                  {article.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-900">
                  <button
                    onClick={() => handleReadMore(article.id)}
                    className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-slate-900 dark:text-slate-150 hover:text-gold transition-colors cursor-pointer"
                  >
                    <span>Analyze Full Brief</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
