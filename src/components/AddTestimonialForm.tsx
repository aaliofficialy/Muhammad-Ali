import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Star, Send, User, Briefcase, Building2, Quote, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const AVATAR_TEMPLATES = [
  {
    id: "avatar-f1",
    name: "Agile Specialist",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "avatar-m1",
    name: "Tech Contributor",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "avatar-f2",
    name: "Strategy Leader",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "avatar-m2",
    name: "Founder Executive",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
];

export default function AddTestimonialForm() {
  const { addTestimonial } = useApp();

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [content, setContent] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_TEMPLATES[0].url);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Character limit validation helper
  const wordCount = content.trim().length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please provide your name.");
      return;
    }
    if (!role.trim()) {
      setErrorMsg("Please provide your professional title/role.");
      return;
    }
    if (content.trim().length < 15) {
      setErrorMsg("Feedback must be at least 15 characters long.");
      return;
    }

    addTestimonial(
      name.trim(),
      role.trim(),
      company.trim() || "Independent",
      rating,
      content.trim(),
      selectedAvatar
    );

    setIsSuccess(true);
    
    // Clear state
    setName("");
    setRole("");
    setCompany("");
    setRating(5);
    setContent("");

    // Automatically transition success message away
    setTimeout(() => {
      setIsSuccess(false);
      setIsFormVisible(false);
    }, 4000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 px-4">
      <div className="text-center mb-8">
        {!isFormVisible && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFormVisible(true)}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-950 to-slate-900 border border-gold/30 text-gold hover:text-white font-mono text-[11px] font-bold tracking-widest uppercase px-6 py-4 cursor-pointer focus:outline-none transition-all shadow-lg"
          >
            <Quote size={12} className="text-gold" />
            <span>Leave a Testimonial</span>
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isFormVisible && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.35 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
            
            {/* Form Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div>
                <span className="block text-[8px] font-mono tracking-widest uppercase text-gold font-bold">
                  EVALUATION CONSOLE
                </span>
                <h3 className="text-sm font-bold font-sans text-slate-900 dark:text-slate-100 uppercase tracking-tight mt-0.5">
                  Submit Collaboration Feedback
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsFormVisible(false);
                  setIsSuccess(false);
                }}
                className="text-slate-400 dark:text-slate-500 hover:text-rose-500 font-mono text-[10px] tracking-wider uppercase border border-slate-100 dark:border-slate-800 hover:border-transparent px-2.5 py-1 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 size={24} className="animate-bounce" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight mb-2">
                  Feedback Logged Successfully
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed font-sans">
                  Thank you for submitting your evaluation! Your testimonial has been verified and injected in this workspace context.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Banner */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200/60 text-red-700 text-[11px] font-medium flex items-center space-x-2 rounded-none"
                  >
                    <AlertCircle size={14} className="shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {/* Star-Rating Picker */}
                <div>
                  <label className="block text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-2">
                    Evaluation Score *
                  </label>
                  <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-2.5 w-max">
                    {[1, 2, 3, 4, 5].map((index) => {
                       const displayStar = hoverRating !== null ? hoverRating >= index : rating >= index;
                       return (
                         <button
                           key={index}
                           type="button"
                           onMouseEnter={() => setHoverRating(index)}
                           onMouseLeave={() => setHoverRating(null)}
                           onClick={() => setRating(index)}
                           className="p-1 transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                         >
                           <Star
                             size={18}
                             className={`transition-colors ${
                               displayStar ? "fill-gold text-gold" : "text-slate-200 dark:text-slate-800"
                             }`}
                           />
                         </button>
                       );
                     })}
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 ml-3.5 border-l border-slate-200 dark:border-slate-800 pl-3.5">
                      {rating} / 5 Rating
                    </span>
                  </div>
                </div>

                {/* Primary Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rachel Foster"
                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 px-3.5 py-2.5 pl-10 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-gold transition-colors font-sans"
                      />
                      <User size={12} className="absolute left-3.5 top-[14px] text-slate-450" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                      Job Title / Role *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. VP of Operations"
                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 px-3.5 py-2.5 pl-10 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-gold transition-colors font-sans"
                      />
                      <Briefcase size={12} className="absolute left-3.5 top-[14px] text-slate-450" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                      Company Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Nexa Systems"
                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 px-3.5 py-2.5 pl-10 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-gold transition-colors font-sans"
                      />
                      <Building2 size={12} className="absolute left-3.5 top-[14px] text-slate-450" />
                    </div>
                  </div>

                  {/* Profile Avatar Picker */}
                  <div>
                    <span className="block text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-1.5">
                      Select Professional Profile Photo *
                    </span>
                    <div className="flex items-center space-x-3.5 py-1">
                      {AVATAR_TEMPLATES.map((avatar) => (
                        <button
                          key={avatar.id}
                          type="button"
                          onClick={() => setSelectedAvatar(avatar.url)}
                          className={`relative shrink-0 w-9 h-9 border rounded-full overflow-hidden focus:outline-none transition-all cursor-pointer ${
                            selectedAvatar === avatar.url
                              ? "border-2 border-gold scale-105"
                              : "border-slate-200 dark:border-slate-800 hover:border-slate-450"
                          }`}
                          title={avatar.name}
                        >
                          <img
                            src={avatar.url}
                            alt={avatar.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Textarea */}
                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <label className="block text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">
                      Recommendation Feedback * (min 15 characters)
                    </label>
                    <span className="text-[9px] font-mono text-slate-400">
                      {wordCount} characters
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={4}
                      placeholder="Share your authentic experience collaborating on system scaling, B2B visibility campaigns, automation integrations, or strategy."
                      className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 p-4 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-gold transition-colors font-sans leading-relaxed resize-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center space-x-2 bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 border border-transparent text-gold font-mono text-[10px] font-bold tracking-widest uppercase py-3.5 cursor-pointer focus:outline-none transition-colors"
                  >
                    <Send size={11} className="text-gold" />
                    <span>Transmit Endorsement</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormVisible(false);
                      setIsSuccess(false);
                    }}
                    className="border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 font-mono text-[10px] tracking-widest uppercase py-3.5 px-6 rounded-none cursor-pointer focus:outline-none transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
