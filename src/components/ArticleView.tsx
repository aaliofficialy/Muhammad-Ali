import React, { useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Calendar, User, Tag, Share2, MessageSquare, ChevronLeft, ChevronRight, Copy, Check, Twitter, Linkedin, Facebook } from "lucide-react";
import { useApp } from "../context/AppContext";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { calculateReadingTime } from "../lib/blogUtils";
import AdBanner from "./AdBanner";

export default function ArticleView() {
  const { articles, selectedArticleId, setSelectedArticleId, setActiveSection, addToast, comments, addComment } = useApp();
  
  const article = useMemo(() => 
    articles.find(a => a.id === selectedArticleId),
    [articles, selectedArticleId]
  );

  const [commentName, setCommentName] = React.useState("");
  const [commentContent, setCommentContent] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  // Related articles (same category)
  const relatedArticles = useMemo(() => 
    articles.filter(a => a.id !== selectedArticleId && a.category === article?.category).slice(0, 3),
    [articles, selectedArticleId, article]
  );

  const articleComments = useMemo(() => 
    comments.filter(c => c.articleId === selectedArticleId),
    [comments, selectedArticleId]
  );

  const readingTime = useMemo(() => {
    return calculateReadingTime(article?.content || "");
  }, [article?.content]);

  useEffect(() => {
    if (article) {
      const originalTitle = document.title;
      const originalDesc = document.querySelector('meta[name="description"]')?.getAttribute("content");
      const originalKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute("content");

      document.title = article.seoMetadata?.title || `${article.title} | Corporate Intel`;
      
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
          descMeta = document.createElement('meta');
          descMeta.setAttribute('name', 'description');
          document.head.appendChild(descMeta);
      }
      descMeta.setAttribute("content", article.seoMetadata?.description || article.excerpt);

      if (article.seoMetadata?.keywords) {
          let keywordsMeta = document.querySelector('meta[name="keywords"]');
          if (!keywordsMeta) {
              keywordsMeta = document.createElement('meta');
              keywordsMeta.setAttribute('name', 'keywords');
              document.head.appendChild(keywordsMeta);
          }
          keywordsMeta.setAttribute("content", article.seoMetadata.keywords);
      }

      return () => {
          document.title = originalTitle || "";
          if (descMeta && originalDesc) descMeta.setAttribute("content", originalDesc);
          if (originalKeywords) {
             document.querySelector('meta[name="keywords"]')?.setAttribute("content", originalKeywords);
          } else {
             document.querySelector('meta[name="keywords"]')?.remove();
          }
      }
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
            <h2 className="text-2xl font-sans font-medium text-slate-400 mb-6">Resource Unavailable</h2>
            <button 
              onClick={() => setActiveSection("blog")}
              className="text-gold font-mono text-xs font-bold tracking-widest uppercase border-b border-gold cursor-pointer"
            >
                Return to Archive
            </button>
        </div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this insight from Muhammad Ali: ${article.title}`;
    
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      addToast("URL copied to command registry", "success");
      setTimeout(() => setCopied(false), 2000);
    } else {
        // Mock share
        addToast(`Relaying to ${platform} network...`, "info");
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentContent) {
        addToast("Validation Error: All inputs required", "error");
        return;
    }
    addComment(article.id, commentName, commentContent);
    setCommentName("");
    setCommentContent("");
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-24">
      {/* Scroll Progress? App already has one in Navbar */}
      
      {/* Article Hero */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 bg-gold text-slate-950 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest mb-6"
            >
              <span>{article.category}</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-sans font-medium tracking-tight text-white mb-8 leading-tight"
            >
              {article.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-300 uppercase tracking-widest"
            >
              <div className="flex items-center space-x-2">
                <Calendar size={14} className="text-gold" />
                <span>{format(new Date(article.publishDate), "MMMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center space-x-2 border-l border-white/20 pl-6">
                <User size={14} className="text-gold" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center space-x-2 border-l border-white/20 pl-6">
                 <span>{readingTime} MIN READ</span>
              </div>
            </motion.div>
          </div>
        </div>

        <button 
          onClick={() => setActiveSection("blog")}
          className="absolute top-12 left-6 md:left-12 p-3 bg-white/10 hover:bg-gold/20 backdrop-blur-md rounded-none border border-white/20 text-white transition-all cursor-pointer group z-20"
        >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <motion.article
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="flex-grow bg-white dark:bg-slate-950 p-8 md:p-12 lg:p-16 shadow-2xl shadow-slate-950/20 border border-slate-100 dark:border-slate-800"
          >
            <div className="prose prose-slate dark:prose-invert prose-gold max-w-none 
                prose-headings:font-sans prose-headings:font-medium prose-headings:tracking-tight 
                prose-p:font-sans prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400
                prose-li:font-sans dark:prose-li:text-slate-400
                prose-img:rounded-none prose-img:border prose-img:border-slate-100 dark:prose-img:border-slate-800">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            <AdBanner location="article_specific" articleId={article.id} className="mt-12" />

            <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-8">
                    <div className="flex items-center space-x-4">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400">Distribute Insight:</span>
                        <div className="flex items-center space-x-2">
                             <button onClick={() => handleShare("copy")} className="p-2.5 bg-slate-50 dark:bg-slate-900 hover:bg-gold/10 text-slate-600 dark:text-slate-400 hover:text-gold transition-colors cursor-pointer border border-slate-100 dark:border-slate-800">
                                {copied ? <Check size={15} /> : <Copy size={15} />}
                             </button>
                             <button onClick={() => handleShare("Twitter")} className="p-2.5 bg-slate-50 dark:bg-slate-900 hover:bg-gold/10 text-slate-600 dark:text-slate-400 hover:text-gold transition-colors cursor-pointer border border-slate-100 dark:border-slate-800">
                                <Twitter size={15} />
                             </button>
                             <button onClick={() => handleShare("LinkedIn")} className="p-2.5 bg-slate-50 dark:bg-slate-900 hover:bg-gold/10 text-slate-600 dark:text-slate-400 hover:text-gold transition-colors cursor-pointer border border-slate-100 dark:border-slate-800">
                                <Linkedin size={15} />
                             </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                         {article.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono px-3 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 uppercase">
                                #{tag}
                            </span>
                         ))}
                    </div>
                </div>
            </div>

            {/* Author Profile */}
            <div className="mt-20 p-8 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-8">
                 <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-24 h-24 rounded-none object-cover border border-gold/30 p-1"
                    referrerPolicy="no-referrer"
                 />
                 <div className="text-center md:text-left">
                     <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest mb-2 block">Principal Analyst</span>
                     <h4 className="text-2xl font-sans font-medium text-slate-900 dark:text-white mb-2">{article.author.name}</h4>
                     <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xl font-sans">
                         Muhammad Ali is an IT Architecture & Digital Strategist specializing in zero-trust infrastructure, tokenomics modeling, and enterprise AI implementation.
                     </p>
                 </div>
            </div>

            {/* Comments Section */}
            <div id="comments" className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-900">
                <div className="flex items-center space-x-3 mb-12">
                    <MessageSquare size={24} className="text-gold" />
                    <h2 className="text-3xl font-sans font-medium text-slate-900 dark:text-white">Engagement Feed <span className="text-slate-400 text-lg ml-2">({articleComments.length})</span></h2>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-16 bg-slate-50 dark:bg-slate-900/30 p-8 border border-slate-100 dark:border-slate-800">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                             <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Subject Name</label>
                             <input 
                                type="text" 
                                value={commentName}
                                onChange={(e) => setCommentName(e.target.value)}
                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-3 text-xs font-mono focus:outline-none focus:border-gold dark:text-white"
                                placeholder="IDENTIFY YOURSELF..."
                             />
                        </div>
                        <div>
                             <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Email Hash (Will not be shown)</label>
                             <input 
                                type="email" 
                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-3 text-xs font-mono focus:outline-none focus:border-gold dark:text-white"
                                placeholder="USER@NETWORK.COM"
                             />
                        </div>
                     </div>
                     <div className="mb-6">
                         <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Technical Commentary</label>
                         <textarea 
                            rows={4}
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-3 text-xs font-mono focus:outline-none focus:border-gold dark:text-white"
                            placeholder="COMMUNICATE YOUR THOUGHTS..."
                         />
                     </div>
                     <button type="submit" className="bg-slate-900 dark:bg-gold text-white dark:text-slate-950 px-10 py-3.5 text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-gold hover:text-slate-950 transition-all cursor-pointer shadow-lg shadow-gold/5">
                        Broadcast Message
                     </button>
                </form>

                {/* Comments List */}
                <div className="space-y-8">
                    {articleComments.length > 0 ? (
                        articleComments.map((comment, idx) => (
                            <motion.div 
                                key={comment.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-6 pb-8 border-b border-slate-50 dark:border-slate-900 last:border-0"
                            >
                                <div className="w-12 h-12 rounded-none bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400 border border-slate-200 dark:border-slate-700 font-mono">
                                    {comment.author.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-grow">
                                     <div className="flex items-center justify-between mb-2">
                                         <h5 className="text-[11px] font-mono font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest">{comment.author}</h5>
                                         <span className="text-[9px] font-mono text-slate-400">{format(new Date(comment.createdAt), "MMM dd, yyyy • HH:mm")}</span>
                                     </div>
                                     <p className="text-sm font-sans text-slate-600 dark:text-slate-400 leading-relaxed">
                                         {comment.content}
                                     </p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-800">
                             <p className="text-sm font-sans text-slate-400">No signals detected on this frequency yet.</p>
                        </div>
                    )}
                </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-12 shrink-0">
             <AdBanner location="sidebar" />
             
             {/* Related Content */}
             <div className="bg-slate-50 dark:bg-slate-950 p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-950/10">
                <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-8 flex items-center">
                    <span className="w-2 h-2 bg-gold mr-3"></span>
                    Lateral Intel
                </h3>
                <div className="space-y-10">
                    {relatedArticles.map(rel => (
                        <div key={rel.id} className="group flex items-start gap-4 cursor-pointer" onClick={() => { setSelectedArticleId(rel.id); window.scrollTo({top:0, behavior:'smooth'}); }}>
                            <div className="w-16 h-16 shrink-0 bg-slate-100 dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-800">
                                <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                                <span className="text-[9px] font-mono text-gold uppercase tracking-widest block mb-1">{rel.category}</span>
                                <h4 className="text-xs font-sans font-medium text-slate-800 dark:text-slate-300 group-hover:text-gold transition-colors leading-snug line-clamp-2">
                                    {rel.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
             </div>

             {/* Dynamic Tags */}
             <div className="p-8 border border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-6">Taxonomy</h3>
                <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 uppercase tracking-tighter cursor-default">
                             {tag}
                        </span>
                    ))}
                </div>
             </div>

             {/* Mini Search */}
             <div className="p-1 px-8 py-10 bg-slate-900 border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 transform rotate-12 opacity-10">
                    <Tag size={120} className="text-gold" />
                </div>
                <h4 className="text-white font-sans font-medium text-lg relative mb-4 z-10">Searching for something specific?</h4>
                <button 
                  onClick={() => setActiveSection("blog")}
                  className="bg-gold text-slate-950 text-[10px] font-mono font-bold tracking-widest uppercase px-6 py-3 relative z-10 hover:bg-white transition-colors cursor-pointer"
                >
                    Full Knowledge Base
                </button>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
