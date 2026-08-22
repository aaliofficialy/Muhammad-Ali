import React, { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

interface AdBannerProps {
  location: "homepage" | "sidebar" | "header" | "footer" | "between_articles" | "blog_pages" | "article_specific";
  articleId?: string;
  className?: string;
}

export default function AdBanner({ location, articleId, className = "" }: AdBannerProps) {
  const { ads } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  const ad = ads.find(a => 
    a.location === location && 
    a.enabled && 
    (location !== "article_specific" || a.articleId === articleId)
  );

  useEffect(() => {
    if (ad && containerRef.current) {
      // In a real environment, we'd inject this safely.
      // Also might need to trigger window.adsbygoogle.push({}) if it's AdSense
      
      // Let's create an iframe or just inject HTML since it might be AdSense JS code
      // Due to React constraints, dumping raw script tags via innerHTML sometimes fails to execute.
      // For demonstration and simple HTML snippets, innerHTML works. 
      // If it's a real Google AdSense, usually nextjs/react plugins are used, 
      // but here we'll place it directly into real DOM.
      
      // Clear previous
      containerRef.current.innerHTML = ad.code;
      
      // For standard sync/async scripts inside the code, we might have to manually re-evaluate them.
      const scripts = containerRef.current.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        const oldScript = scripts[i];
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      }
    }
  }, [ad]);

  if (!ad) return null;

  return (
    <div className={`w-full overflow-hidden flex justify-center py-4 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/50 relative ${className}`}>
        <div className="absolute top-0 left-0 bg-slate-200 dark:bg-slate-800 text-[8px] font-mono font-bold uppercase text-slate-500 px-1 py-0.5">ADVERTISEMENT</div>
        <div ref={containerRef} className="w-full flex justify-center mt-2 min-h-[90px]" />
    </div>
  );
}
