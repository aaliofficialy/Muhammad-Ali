import React, { useState, useRef, useEffect } from "react";
import { useApp, AppNotification } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import { Bell, BellRing, Trash2, CheckCircle, Clock, Shield, Zap, Flame, Sparkles } from "lucide-react";

export default function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    clearNotifications,
    markAsRead,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    return true;
  });

  const getCategoryIcon = (category: AppNotification["category"]) => {
    switch (category) {
      case "system":
        return <Shield size={14} className="text-emerald-500" />;
      case "crypto":
        return <Zap size={14} className="text-amber-500" />;
      case "social":
        return <Flame size={14} className="text-orange-500" />;
      default:
        return <Sparkles size={14} className="text-gold" />;
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger Bell Button */}
      <button
        id="notification-bell-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-none border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-200 cursor-pointer flex items-center justify-center text-slate-800 dark:text-slate-250"
        aria-label="View notifications"
      >
        {unreadCount > 0 ? (
          <>
            <BellRing size={16} className="text-gold animate-bounce" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[9px] font-mono font-bold text-gold">
              {unreadCount}
            </span>
          </>
        ) : (
          <Bell size={16} className="text-slate-600 dark:text-slate-400" />
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-250 border-slate-200 dark:border-slate-800 shadow-2xl z-50 rounded-none overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-gold/20">
              <div>
                <span className="block text-[8px] font-mono tracking-widest uppercase text-gold font-bold">
                  Expert System Update
                </span>
                <h4 className="text-xs font-bold font-sans uppercase tracking-tight text-white mt-0.5">
                  Live Notifications ({unreadCount} unread)
                </h4>
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gold hover:text-white transition-colors flex items-center space-x-1"
                    title="Mark all as read"
                  >
                    <CheckCircle size={11} />
                    <span>Read All</span>
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Clear history"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Toggle Bar */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`text-[9px] uppercase tracking-wider font-mono px-2 py-1 transition-all ${
                    filter === "all"
                      ? "bg-slate-900 dark:bg-slate-800 text-gold font-bold"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-gold"
                  }`}
                >
                  All ({notifications.length})
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`text-[9px] uppercase tracking-wider font-mono px-2 py-1 transition-all ${
                    filter === "unread"
                      ? "bg-slate-950 dark:bg-slate-800 text-gold font-bold"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-gold"
                  }`}
                >
                  Unread ({unreadCount})
                </button>
              </div>
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">Live Socket Active</span>
            </div>

            {/* Notifications List */}
            <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-4 transition-colors cursor-pointer text-left flex items-start space-x-3 group ${
                      n.isRead ? "bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-850" : "bg-gold/5 dark:bg-gold/[0.04] hover:bg-gold/10 dark:hover:bg-gold/[0.08]"
                    }`}
                  >
                    {/* Category Icon indicator */}
                    <div className="mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                      {getCategoryIcon(n.category)}
                    </div>

                    {/* Content text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1.5">
                        <h5
                          className={`text-xs tracking-tight transition-colors group-hover:text-gold ${
                            n.isRead ? "font-semibold text-slate-800 dark:text-slate-200" : "font-extrabold text-slate-955 dark:text-white"
                          }`}
                        >
                          {n.title}
                        </h5>
                        {!n.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-sans">
                        {n.description}
                      </p>
                      <div className="flex items-center space-x-1.5 mt-2 text-[9px] text-slate-400 dark:text-slate-500 font-mono">
                        <Clock size={10} />
                        <span>{n.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 px-4 text-center">
                  <div className="w-10 h-10 rounded-none border border-dashed border-slate-200 dark:border-slate-800 mx-auto flex items-center justify-center text-slate-350 dark:text-slate-600 text-slate-400 mb-3">
                    <Bell size={16} />
                  </div>
                  <h5 className="text-xs font-bold font-sans text-slate-800 dark:text-slate-200 uppercase tracking-tight">
                    No updates parsed
                  </h5>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">
                    {filter === "unread"
                      ? "You are completely up to date with Muhammad Ali's secure telemetry framework."
                      : "Follow Muhammad Ali to record immediate notification logs."}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 border-t border-slate-150 border-slate-200 dark:border-slate-850 text-center text-[9px] font-mono text-slate-400 dark:text-slate-500">
              Press outside or select any item to close panel
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
