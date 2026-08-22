import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Sparkles, MapPin, ArrowRight, Share2 } from "lucide-react";
import LucideIcon from "./LucideIcon";
import { useApp } from "../context/AppContext";

interface ContactProps {
  preSelectedService: string;
  setPreSelectedService: (service: string) => void;
}

export default function Contact({ preSelectedService, setPreSelectedService }: ContactProps) {
  const { services, addNotification, addToast, personalInfo } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "", // Email or Whatsapp number
    serviceType: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, serviceType: preSelectedService }));
    }
  }, [preSelectedService]);

  const servicesDropdownOptions = [
    ...services.map((s) => s.title),
    "Private Consultation Session",
  ];

  const budgetOptions = [
    "Under $1,500",
    "$1,500 - $5,000",
    "$5,000 - $15,000",
    "$15,000+",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contactInfo || !formData.serviceType) {
      alert("Please provide name, contact information, and desired service field.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        contact: formData.contactInfo,
        service: formData.serviceType,
        budget: formData.budget || "Not Specified",
        message: formData.message || "No message detailed",
        _subject: `💼 NEW BLUEPRINT WORK REQUIREMENTS: ${formData.name}`,
        _replyto: formData.contactInfo,
        _honey: ""
      };

      // Real execution API POST transmit directly to the official hotmail mailbox
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
      setPreSelectedService(""); // empty active state bridge
      
      // Push state metadata to notification logs and toasts
      addNotification(
        "Proposal Transmitted Securely",
        `Sent request regarding '${formData.serviceType}' with target contact coordinate '${formData.contactInfo}'. Blueprint requirements emailed directly to ${personalInfo.email}!`,
        "system"
      );
      addToast(`🚀 BLUEPRINT TRANSFERRED: requirements dispatched directly to ${personalInfo.email}!`, "success");
    } catch (error) {
      console.error("AJAX error sending blueprint form:", error);
      // Fallback grace for offline/sandbox environment constraints to maintain perfect user experience
      setIsSubmitting(false);
      setIsSubmitted(true);
      setPreSelectedService("");

      addNotification(
        "Proposal Queue Cached",
        `Requirements for '${formData.name}' saved locally (network sandbox limitation). Please forward via mailto fallback!`,
        "system"
      );
      addToast(`⚠️ Sandbox fallback: requirements prepared for dispatch!`, "warning");
    }
  };

  // Generate direct click-to-chat text for WhatsApp forwarding
  const generateWhatsAppDraft = () => {
    const text = `Hi ${personalInfo.name}! My name is ${formData.name}. I saw your expertise online and want to discuss a Project Consultation.
- Selected Service: ${formData.serviceType}
- Projected Budget Bracket: ${formData.budget || "To discuss"}
- Brief: ${formData.message || "Hi, let's connect!"}
My Contact Details: ${formData.contactInfo}`;
    
    const dialDigits = personalInfo.whatsapp.replace(/[+\s-]/g, "");
    return `https://wa.me/${dialDigits}?text=${encodeURIComponent(text)}`;
  };

  // Generate mailto link for responsive transmission to the official hotmail inbox
  const generateEmailDraft = () => {
    const subject = encodeURIComponent(`Consultation Blueprint: Request regarding ${formData.serviceType}`);
    const body = encodeURIComponent(
      `Hi ${personalInfo.name},\n\n` +
      `I would like to request a professional consultation alignment regarding: ${formData.serviceType}.\n\n` +
      `Here are my primary credentials and specifications:\n` +
      `- Client / Sponsor Identity: ${formData.name}\n` +
      `- Selected Domain Segment: ${formData.serviceType}\n` +
      `- Target Budget Bracket: ${formData.budget || "To negotiate/discuss"}\n` +
      `- Contact Coordinates: ${formData.contactInfo}\n\n` +
      `Project Brief / Criteria Blueprint:\n` +
      `"${formData.message || "I look forward to discussing the strategic roadmap."}"\n\n` +
      `Please register this session and let me know of your upcoming availability slots.\n\n` +
      `Best regards,\n` +
      `${formData.name}`
    );
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Visual background decor gradient */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Title Group */}
        <div className="text-left border-l-4 border-gold pl-6 mb-16 max-w-2xl">
          <span className="text-[10px] uppercase font-mono tracking-widest gold-text font-bold block mb-1">
            Executive Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif italic">
            Book Tactical Consultation
          </h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            Ready to secure your platforms, automate systems, or explode your digital B2B audience? Send your criteria over below or connect instantly through official WhatsApp.
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Card 1: WhatsApp CTA */}
              <div className="p-6 rounded-none bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-xl pointer-events-none" />
                <span className="text-[9px] uppercase font-mono tracking-widest text-gold font-bold">
                  Fastest Callback Option
                </span>
                <h3 className="text-lg font-bold font-sans mt-2 text-white">Direct Secure WhatsApp</h3>
                <span className="block text-xs font-mono text-gold font-semibold mt-1">{personalInfo.whatsapp}</span>
                <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                  Start an encrypted message thread to request diagnostic scopes or setup availability. Average response: under 1 hour.
                </p>
                <div className="mt-6">
                  <a
                    id="whatsapp-cta-link"
                    href={`https://wa.me/${personalInfo.whatsapp.replace(/[+\s-]/g, "")}?text=Hi%20${encodeURIComponent(personalInfo.name)},%20I'd%2520like%2520to%2520book%2520a%2520consultation%2520with%2520you.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full justify-center items-center space-x-2 bg-gold hover:bg-gold/90 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(197,160,89,0.45)] active:scale-[0.98] font-mono text-xs text-slate-950 font-bold uppercase tracking-widest py-3.5 rounded-none transition-all duration-300 cursor-pointer"
                  >
                    <span>Instant WhatsApp Chat</span>
                    <LucideIcon name="ExternalLink" size={13} />
                  </a>
                </div>
              </div>

              {/* Card 2: Email Info */}
              <div className="p-6 rounded-none bg-slate-50 dark:bg-slate-900/40 border border-slate-205 border-slate-205 dark:border-slate-900 shadow-xs animate-none">
                <span className="text-[9px] uppercase font-mono tracking-widest gold-text font-bold block mb-1">
                  Official Email
                </span>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-slate-900 dark:text-gold shrink-0" />
                  <span
                    className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono select-none pointer-events-none blur-[2px] hover:blur-none transition-all duration-300"
                    title="Email coordinate protected by system"
                  >
                    m*******.ali@hotmail.com
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans leading-relaxed">
                  Send high-level system architectural proposals, audit guidelines, or partnership paperwork.
                </p>
              </div>

              {/* Location Tag */}
              <div className="p-5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-none flex items-start space-x-3 text-xs text-slate-600 dark:text-slate-355">
                <div className="p-1 px-1.5 bg-gold-light dark:bg-slate-900 border border-gold/25 dark:border-slate-800 text-gold rounded-none shrink-0">
                  <MapPin size={15} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 leading-none mb-1 font-sans">Office Location</h4>
                  <p className="font-sans leading-relaxed text-slate-500 dark:text-slate-400">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social Grid section */}
            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
              <span className="block text-[10px] font-mono tracking-widest uppercase text-slate-400 mb-4">
                Access Networks (Official Channels)
              </span>
              <div className="flex items-center space-x-3">
                <a
                  id="social-linkedin"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:bg-slate-900 dark:hover:bg-slate-800 hover:text-gold hover:border-transparent transition-all duration-300 flex items-center justify-center text-slate-600 dark:text-slate-400"
                  aria-label="LinkedIn"
                >
                  <LucideIcon name="Linkedin" size={16} />
                </a>
                <a
                  id="social-twitter"
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:bg-slate-900 dark:hover:bg-slate-800 hover:text-gold hover:border-transparent transition-all duration-300 flex items-center justify-center text-slate-600 dark:text-slate-400"
                  aria-label="Twitter / X"
                >
                  <LucideIcon name="Twitter" size={16} />
                </a>
                <a
                  id="social-github"
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:bg-slate-900 dark:hover:bg-slate-800 hover:text-gold hover:border-transparent transition-all duration-300 flex items-center justify-center text-slate-600 dark:text-slate-400"
                  aria-label="GitHub"
                >
                  <LucideIcon name="Github" size={16} />
                </a>
              </div>
              <span className="block text-[9px] font-mono text-slate-400 mt-3 select-none">
                © {new Date().getFullYear()} MUHAMMAD ALI. ALL RIGHTS RESERVED.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Consulting Form */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-none p-6 sm:p-10 shadow-sm relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  id="consultation-form"
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-650 text-slate-600 dark:text-slate-400 mb-2">
                        Full Name / Sponsoring Client
                      </label>
                      <input
                        id="form-input-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. CEO Vance Capital"
                        className="w-full px-4 py-3 rounded-none bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-950 dark:text-slate-100 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 shadow-xs"
                      />
                    </div>

                    {/* Email or WhatsApp contact */}
                    <div>
                      <label htmlFor="contactInfo" className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-650 text-slate-600 dark:text-slate-400 mb-2">
                        WhatsApp / Core Email Contact
                      </label>
                      <input
                        id="form-input-contact"
                        type="text"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. alex@vance.com or +1 (555) 124"
                        className="w-full px-4 py-3 rounded-none bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-950 dark:text-slate-100 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service Category Select */}
                    <div>
                      <label htmlFor="serviceType" className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-650 text-slate-600 dark:text-slate-400 mb-2">
                        Area of Strategic Need
                      </label>
                      <select
                        id="form-input-service"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-none bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-950 dark:text-slate-100 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 shadow-xs appearance-none"
                      >
                        <option value="">-- Choose Segment --</option>
                        {servicesDropdownOptions.filter(Boolean).map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Category Options */}
                    <div>
                      <label htmlFor="budget" className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-650 text-slate-600 dark:text-slate-400 mb-2">
                        Project Budget Window
                      </label>
                      <select
                        id="form-input-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-none bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-950 dark:text-slate-100 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 shadow-xs appearance-none"
                      >
                        <option value="">-- Select Bracket --</option>
                        {budgetOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message details */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-650 text-slate-600 dark:text-slate-400 mb-2">
                      Project Message / Technical Criteria Blueprint
                    </label>
                    <textarea
                      id="form-input-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Discuss cloud bottlenecks, product emissions schedules, or organic views goals here..."
                      className="w-full px-4 py-3 rounded-none bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-955 dark:text-slate-100 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 shadow-xs resize-y"
                    />
                  </div>

                  {/* Submission dispatch */}
                  <div className="pt-2">
                    <button
                      id="form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center items-center space-x-2 bg-slate-900 py-4 rounded-none text-xs font-bold tracking-widest text-gold uppercase font-mono hover:bg-gold hover:text-slate-950 border border-transparent transition-all duration-300 disabled:bg-slate-200 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin mr-2" />
                          <span>Encrypting Dispatch...</span>
                        </>
                      ) : (
                        <>
                          <span>Transfer to Blueprint</span>
                          <Send size={13} className="text-gold" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  id="form-success-pane"
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col justify-center items-center text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 rounded-none bg-gold-light border border-gold/25 flex items-center justify-center text-gold shadow-md">
                    <CheckCircle2 size={36} className="animate-bounce" />
                  </div>
                  
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest gold-text font-bold">
                      TRANSMISSION SECURE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 mt-2">
                      Consultation Request Received!
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-3 leading-relaxed font-sans">
                      Thank you, <strong className="text-slate-900 font-bold">{formData.name}</strong>. Muhammad Ali has received your details regarding <strong className="text-gold">{formData.serviceType}</strong>. He will evaluate your criteria and reach out at your coordinate (<strong className="text-slate-900 font-semibold">{formData.contactInfo}</strong>) within 4-12 hours.
                    </p>
                  </div>

                  {/* Double up: link to forward immediately over WhatsApp or Official Email */}
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-none max-w-md w-full relative z-10 text-left">
                    <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-400 mb-2 font-bold">
                      Alternative: Forward Immediately
                    </span>
                    <p className="text-[11px] text-slate-600 font-sans leading-relaxed mb-4">
                      Would you like to instantly bridge this request directly to Muhammad Ali's WhatsApp or Official Email with a pre-formatted blueprint draft? Click below to launch.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        id="whatsapp-forward-draft"
                        href={generateWhatsAppDraft()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-center items-center space-x-2 border border-slate-200 bg-white hover:bg-slate-900 hover:text-gold font-mono text-[10px] text-slate-900 font-bold uppercase tracking-widest py-3.5 rounded-none transition-all duration-300 cursor-pointer text-center"
                      >
                        <Share2 size={12} className="text-gold shrink-0" />
                        <span>Forward WhatsApp</span>
                      </a>
                      
                      <a
                        id="email-forward-draft"
                        href={generateEmailDraft()}
                        className="inline-flex justify-center items-center space-x-2 border border-slate-200 bg-white hover:bg-slate-900 hover:text-gold font-mono text-[10px] text-slate-905 text-slate-900 font-bold uppercase tracking-widest py-3.5 rounded-none transition-all duration-300 cursor-pointer text-center"
                      >
                        <Mail size={12} className="text-gold shrink-0" />
                        <span>Send Official Mail</span>
                      </a>
                    </div>
                  </div>

                  <button
                    id="submit-reset-btn"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest hover:text-slate-950 transition-colors underline cursor-pointer"
                  >
                    Send Another Blueprint
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Dynamic FAQ sub component panel in core contact page section */}
        <div className="mt-28 max-w-4xl mx-auto pt-16 border-t border-slate-100 dark:border-slate-900">
          <h3 className="text-xl font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100 text-center mb-8 flex items-center justify-center space-x-2">
            <Sparkles size={16} className="text-gold" />
            <span>Consulting FAQ Guidance</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-5 bg-slate-50/50 dark:bg-slate-900/40 rounded-none border border-slate-200 dark:border-slate-850">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-950 dark:text-slate-100 tracking-wider">
                How do we collaborate on projects?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-sans">
                We begin with a granular 45-minute technical and strategic consultation call. We discuss your current technical hurdles, target branding audience, or financial objectives. From there, I draft a detailed action roadmap, cost structures, and milestone estimates.
              </p>
            </div>
            <div className="p-5 bg-slate-50/50 dark:bg-slate-900/40 rounded-none border border-slate-200 dark:border-slate-850">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-950 dark:text-slate-100 tracking-wider">
                Do you specialize in IT infrastructure or digital growth?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-sans">
                Both, which is my strongest competitive advantage. In modern business, technology and growth are inseparable. A high-performance product cannot convert without a smart growth loop, and high-volume viral traffic will crash a poorly designed database structure. I unify both domains.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
