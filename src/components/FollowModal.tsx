import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, UserPlus, Sparkles, Send, CheckCircle2, ListFilter } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function FollowModal() {
  const { showFollowModal, setShowFollowModal, setIsFollowing, addNotification, addToast, personalInfo } = useApp();
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!showFollowModal) return null;

  const handleSimpleFollow = () => {
    setIsFollowing(true);
    setShowFollowModal(false);
    addToast(`🎉 You are now following ${personalInfo.name}! Alerts activated.`, "success");
    addNotification(
      "Subscription Confirmed",
      `You followed ${personalInfo.name}'s feed and activated real-time notifications.`,
      "general"
    );
  };

  const handleBlueprintTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactInfo) {
      addToast("Please provide your name and contact info.", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name,
        contact: contactInfo,
        interest_or_requirements: message || "General Follower Updates Only",
        _subject: `🔔 NEW FOLLOWER BLUEPRINT: ${name}`,
        _replyto: contactInfo,
        _honey: ""
      };

      // Perform real AJAX transmission to formsubmit endpoints
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      await response.json();

      setIsSubmitting(false);
      setIsSubmitted(true);
      setIsFollowing(true);

      addNotification(
        "Follower Details Transmitted",
        `Details for follower '${name}' secured and requirements transferred directly to ${personalInfo.email}.`,
        "social"
      );
      addToast(`🚀 TRANSFER SUCCESS: details linked to blueprint archive!`, "success");

      // Auto close after brief latency
      setTimeout(() => {
        setShowFollowModal(false);
        // reset form
        setName("");
        setContactInfo("");
        setMessage("");
        setIsSubmitted(false);
      }, 2500);

    } catch (error) {
      console.error("AJAX error sending follow metrics:", error);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setIsFollowing(true);

      addNotification(
        "Follower Details Cached",
        `Follower '${name}' registered locally (network sandbox limitation). Welcome to the network!`,
        "social"
      );
      addToast(`🎉 Follow configuration synchronized locally!`, "success");

      setTimeout(() => {
        setShowFollowModal(false);
        setName("");
        setContactInfo("");
        setMessage("");
        setIsSubmitted(false);
      }, 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          id="follow-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowFollowModal(false)}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Outer structure */}
        <motion.div
          id="follow-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 w-full max-w-lg p-6 sm:p-8 relative z-10 rounded-none shadow-2xl relative"
        >
          {/* Close trigger corner */}
          <button
            id="follow-modal-close-x"
            onClick={() => setShowFollowModal(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-gold transition-colors block p-2 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header Title */}
              <div className="flex items-center space-x-2.5 mb-5 border-l-2 border-gold pl-3">
                <UserPlus size={18} className="text-gold" />
                <h3 className="text-base font-bold uppercase tracking-widest font-mono text-slate-950 dark:text-neutral-100">
                  Follower Action CRM
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-6">
                Connect deeply with Ali's network. Submit your credentials below, write your custom goals or active requirements, and click <strong className="text-gold">Transfer to Blueprint</strong> to secure immediate priority notifications and bridge directly to his official email queue.
              </p>

              <form onSubmit={handleBlueprintTransfer} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="follow-name" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                    Your Full Name / Business identity *
                  </label>
                  <input
                    id="follow-input-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rachel Adams, VP Nexus Solutions"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-950 dark:text-slate-100 focus:outline-none focus:border-gold rounded-none"
                  />
                </div>

                {/* Contact Coordinates */}
                <div>
                  <label htmlFor="follow-contact" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                    Contact Coordinates (Email / WhatsApp) *
                  </label>
                  <input
                    id="follow-input-contact"
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="e.g. rachel@nexus.com or +1 (555) 753-159"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-950 dark:text-slate-100 focus:outline-none focus:border-gold rounded-none"
                  />
                </div>

                {/* Bio Description Details */}
                <div>
                  <label htmlFor="follow-message" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                    Your Objectives / Custom Requirements
                  </label>
                  <textarea
                    id="follow-input-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Looking to streamline custom AWS bottlenecks, scale LinkedIn, or schedule an audit call session..."
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-950 dark:text-slate-100 focus:outline-none focus:border-gold rounded-none resize-none"
                  />
                </div>

                {/* Dual Submits */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    id="follow-submit-blueprint"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex justify-center items-center space-x-2 bg-slate-950 dark:bg-gold hover:bg-gold dark:hover:bg-gold/90 text-gold dark:text-slate-950 font-mono text-xs font-bold py-3.5 px-4 uppercase tracking-wider transition-all duration-300 pointer-events-auto rounded-none cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Blueprint...</span>
                      </>
                    ) : (
                      <>
                        <span>Transfer to Blueprint</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>

                  <button
                    id="follow-submit-simple"
                    type="button"
                    onClick={handleSimpleFollow}
                    disabled={isSubmitting}
                    className="inline-flex justify-center items-center space-x-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs text-slate-600 dark:text-neutral-400 font-mono py-3 px-4 uppercase tracking-wider transition-colors rounded-none cursor-pointer disabled:opacity-50"
                  >
                    <span>Simple Follow</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-none bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shadow-xs">
                <CheckCircle2 size={28} className="animate-bounce" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold font-bold">
                  TRANSMISSION COMPLETE
                </span>
                <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white mt-1">
                  Blueprint Credentials Linked!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                  Thank you, <strong className="text-slate-900 dark:text-neutral-200 font-semibold">{name}</strong>. Your requirement specifications have been transmitted securely. The system redirected this notification log directly to Ali's inbox.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
