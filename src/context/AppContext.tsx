import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Article, Comment, Testimonial, Service, Project, Ad } from "../types";
import { TESTIMONIALS, PERSONAL_INFO, SERVICES, PROJECTS, INITIAL_ARTICLES } from "../data";
import { db, auth } from "../lib/firebase";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  setDoc,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
  Timestamp
} from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  category: "system" | "social" | "crypto" | "general";
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface AppContextType {
  isFollowing: boolean;
  toggleFollow: () => void;
  setIsFollowing: (following: boolean) => void;
  showFollowModal: boolean;
  setShowFollowModal: (show: boolean) => void;
  showAdminModal: boolean;
  setShowAdminModal: (show: boolean) => void;
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (title: string, description: string, category?: AppNotification["category"]) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  markAsRead: (id: string) => void;
  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
  testimonials: Testimonial[];
  addTestimonial: (name: string, role: string, company: string, rating: number, content: string, avatar?: string) => void;
  deleteTestimonial: (id: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  personalInfo: typeof PERSONAL_INFO;
  setPersonalInfo: (info: typeof PERSONAL_INFO) => void;
  updatePersonalInfo: (info: typeof PERSONAL_INFO) => Promise<void>;
  services: Service[];
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  updateService: (service: Service) => void;
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (project: Project) => void;
  articles: Article[];
  addArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  updateArticle: (article: Article) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  comments: Comment[];
  addComment: (articleId: string, author: string, content: string) => void;
  ads: Ad[];
  addAd: (ad: Omit<Ad, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAd: (ad: Ad) => void;
  deleteAd: (id: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PRESET_NOTIFICATIONS: AppNotification[] = [];

export function AppProvider({ children }: { children: ReactNode }) {
  // Follow status state (persisted)
  const [isFollowing, setIsFollowing] = useState<boolean>(() => {
    const saved = localStorage.getItem("muhammad_ali_is_following");
    return saved === "true";
  });

  // Follow Modal state
  const [showFollowModal, setShowFollowModal] = useState<boolean>(false);

  // Admin Modal state
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);

  // --- FIREBASE INTEGRATION ---
  
  // Generic collection listener helper
  useEffect(() => {
    if (!db) return;

    // 1. Articles
    const qArticles = query(collection(db, "articles"), orderBy("publishDate", "desc"));
    const unsubArticles = onSnapshot(qArticles, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      if (data.length > 0) setArticles(data);
      else if (articles.length === 0) setArticles(INITIAL_ARTICLES || []);
    });

    // 2. Projects
    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      if (data.length > 0) setProjects(data);
    });

    // 3. Testimonials
    const unsubTestimonials = onSnapshot(collection(db, "testimonials"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
      if (data.length > 0) setTestimonials(data);
    });

    // 4. Services
    const unsubServices = onSnapshot(collection(db, "services"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
      if (data.length > 0) setServices(data);
    });

    // 5. Personal Info
    const unsubInfo = onSnapshot(doc(db, "personalInfo", "current"), (docSnap) => {
      if (docSnap.exists()) {
        setPersonalInfo(docSnap.data() as typeof PERSONAL_INFO);
      }
    });

    // 6. Comments
    const qComments = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubComments = onSnapshot(qComments, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
      setComments(data);
    });

    // 7. Ads
    const qAds = query(collection(db, "ads"), orderBy("createdAt", "desc"));
    const unsubAds = onSnapshot(qAds, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad));
      setAds(data);
    });

    return () => {
      unsubArticles();
      unsubProjects();
      unsubTestimonials();
      unsubServices();
      unsubInfo();
      unsubComments();
      unsubAds();
    };
  }, [db]);

  // Notifications list state (persisted)
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem("muhammad_ali_notifications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return PRESET_NOTIFICATIONS;
      }
    }
    return PRESET_NOTIFICATIONS;
  });

  // Toast array states
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Testimonials state (persisted)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem("muhammad_ali_testimonials");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return TESTIMONIALS;
      }
    }
    return TESTIMONIALS;
  });

  // Dynamic Personal Info State (persisted)
  const [personalInfo, setPersonalInfo] = useState<typeof PERSONAL_INFO>(() => {
    const saved = localStorage.getItem("muhammad_ali_personal_info");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return PERSONAL_INFO;
      }
    }
    return PERSONAL_INFO;
  });

  // Dynamic Services State (persisted)
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem("muhammad_ali_services");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SERVICES;
      }
    }
    return SERVICES;
  });

  // Dynamic Projects State (persisted)
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("muhammad_ali_projects");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return PROJECTS;
      }
    }
    return PROJECTS;
  });

  // Blog State
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem("muhammad_ali_articles");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ARTICLES || [];
      }
    }
    return INITIAL_ARTICLES || [];
  });

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const [activeSection, setActiveSection] = useState("home");

  const [searchQuery, setSearchQuery] = useState("");

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("muhammad_ali_recent_searches");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem("muhammad_ali_comments");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [ads, setAds] = useState<Ad[]>(() => {
    const saved = localStorage.getItem("muhammad_ali_ads");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Persist values
  useEffect(() => {
    localStorage.setItem("muhammad_ali_is_following", String(isFollowing));
  }, [isFollowing]);

  useEffect(() => {
    localStorage.setItem("muhammad_ali_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("muhammad_ali_testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem("muhammad_ali_personal_info", JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem("muhammad_ali_services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("muhammad_ali_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("muhammad_ali_articles", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("muhammad_ali_comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem("muhammad_ali_ads", JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem("muhammad_ali_recent_searches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Theme state ('light' or 'dark'), default to dark for elegant portfolio vibe
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("muhammad_ali_theme");
    if (saved === "light" || saved === "dark") {
      return saved as "light" | "dark";
    }
    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  // Connect state to html classes and persist
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("muhammad_ali_theme", theme);
  }, [theme]);

  // Handle cross-tab sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "muhammad_ali_theme" && (e.newValue === "light" || e.newValue === "dark")) {
        setTheme(e.newValue as "light" | "dark");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    addToast(`🌓 Switched to ${theme === "dark" ? "Light" : "Dark"} Mode`, "info");
  };



  const addToast = (message: string, type: Toast["type"] = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFollow = () => {
    if (!isFollowing) {
      // Prompt modal instead of direct follow so they can enter requirements
      setShowFollowModal(true);
    } else {
      setIsFollowing(false);
      addToast("Unfollowed Muhammad Ali. Alerts deactivated.", "info");
    }
  };

  const addNotification = (title: string, description: string, category: AppNotification["category"] = "general") => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      description,
      timestamp: "Just now",
      isRead: false,
      category,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast("All notifications marked as read.", "success");
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
    addToast("Notification history cleared.", "info");
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const addTestimonial = async (
    name: string,
    role: string,
    company: string,
    rating: number,
    content: string,
    avatar?: string
  ) => {
    const defaultAvatar = avatar || `https://images.unsplash.com/photo-${[
      "1534528741775-53994a69daeb",
      "1507003211169-0a1dd7228f2d",
      "1500648767791-00dcc994a43e",
      "1494790108377-be9c29b29330",
      "1573496359142-b8d87734a5a2"
    ][Math.floor(Math.random() * 5)]}?auto=format&fit=crop&w=200&q=80`;

    const newTestimonial = {
      name,
      role,
      company: company || "Independent Strategy",
      avatar: defaultAvatar,
      rating: Math.max(1, Math.min(5, rating)),
      content,
      createdAt: new Date().toISOString()
    };

    try {
      if (!db) {
        addToast("Offline mode: changes not saved to cloud.", "warning");
        return;
      }
      await addDoc(collection(db, "testimonials"), newTestimonial);
      addNotification(
        "New Evaluation Registered",
        `Client '${name}' (${role} at ${company || "Independent"}) submitted a ${rating}-star endorsement.`,
        "social"
      );
      addToast(`⭐ THANK YOU: testimonial submitted by ${name}!`, "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to save testimonial to records.", "error");
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      if (!db) return;
      await deleteDoc(doc(db, "testimonials", id));
      addToast("Record purged from live dashboard registry.", "info");
      addNotification("Endorsement Removed", `Testimonial record ID '${id}' has been purged by Administrator.`, "system");
    } catch (err) {
      addToast("Delete failed. Verification required.", "error");
    }
  };

  const addService = async (service: Service) => {
    try {
      if (!db) return;
      const { id, ...data } = service;
      await addDoc(collection(db, "services"), data);
      addToast(`🚀 Brand new Service '${service.title}' registered!`, "success");
      addNotification("Service Created", `Directly registered '${service.title}' service in IT ecosystem database.`, "system");
    } catch (err) {
      addToast("Failed to publish service.", "error");
    }
  };

  const deleteService = async (id: string) => {
    try {
      if (!db) return;
      await deleteDoc(doc(db, "services", id));
      addToast("Service record cleared from registry.", "info");
      addNotification("Service Purged", `Service matching ID '${id}' has been purged.`, "system");
    } catch (err) {
      addToast("Failed to delete service.", "error");
    }
  };

  const updateService = async (updated: Service) => {
    try {
      if (!db) return;
      const { id, ...data } = updated;
      await updateDoc(doc(db, "services", id), data);
      addToast(`📝 '${updated.title}' details modified!`, "success");
      addNotification("Service Updated", `Modified records for service '${updated.title}'.`, "system");
    } catch (err) {
      addToast("Update failed.", "error");
    }
  };

  const addProject = async (project: Project) => {
    try {
      if (!db) return;
      const { id, ...data } = project;
      await addDoc(collection(db, "projects"), data);
      addToast(`🌍 Project Work '${project.title}' posted to portfolio!`, "success");
      addNotification("Project Post Created", `Added secondary active metrics mapping for '${project.title}'.`, "crypto");
    } catch (err) {
      addToast("Failed to post project.", "error");
    }
  };

  const deleteProject = async (id: string) => {
    try {
      if (!db) return;
      await deleteDoc(doc(db, "projects", id));
      addToast("Project item cleared from portfolio.", "info");
      addNotification("Project Post Purged", `Project database ID '${id}' successfully cleaned.`, "system");
    } catch (err) {
      addToast("Failed to delete project.", "error");
    }
  };

  const updateProject = async (updated: Project) => {
    try {
      if (!db) return;
      const { id, ...data } = updated;
      await updateDoc(doc(db, "projects", id), data);
      addToast(`📝 '${updated.title}' details updated!`, "success");
      addNotification("Project Post Modified", `Successfully saved content parameters for '${updated.title}'.`, "crypto");
    } catch (err) {
      addToast("Failed to update project.", "error");
    }
  };

  const addArticle = async (article: Article) => {
    try {
      if (!db) return;
      const { id, ...data } = article;
      await addDoc(collection(db, "articles"), data);
      addToast("✍️ New article published to your feed!", "success");
      addNotification("New Content Published", `Article '${article.title}' is now live.`, "general");
    } catch (err) {
      addToast("Failed to publish article.", "error");
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      if (!db) return;
      await deleteDoc(doc(db, "articles", id));
      addToast("Article removed from history.", "info");
    } catch (err) {
      addToast("Failed to delete article.", "error");
    }
  };

  const updateArticle = async (updated: Article) => {
    try {
      if (!db) return;
      const { id, ...data } = updated;
      await updateDoc(doc(db, "articles", id), data);
      addToast("Article records updated.", "success");
    } catch (err) {
      addToast("Failed to update article.", "error");
    }
  };

  const addComment = async (articleId: string, author: string, content: string) => {
    const newComment = {
      articleId,
      author,
      content,
      createdAt: new Date().toISOString()
    };
    try {
      if (!db) return;
      await addDoc(collection(db, "comments"), newComment);
      addToast("💬 Comment posted. Engagement recorded.", "success");
    } catch (err) {
      addToast("Failed to post comment.", "error");
    }
  };

  const addAd = async (adData: Omit<Ad, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (!db) return;
      const newAd = {
        ...adData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await addDoc(collection(db, "ads"), newAd);
      addToast("📢 Ad placement created.", "success");
    } catch (error) {
      addToast("Failed to create ad.", "error");
    }
  };

  const updateAd = async (updated: Ad) => {
    try {
      if (!db) return;
      const { id, ...data } = updated;
      const payload = { ...data, updatedAt: new Date().toISOString() };
      await updateDoc(doc(db, "ads", id), payload);
      addToast(`📢 Ad '${updated.name}' details modified!`, "success");
    } catch (error) {
      addToast("Failed to update ad.", "error");
    }
  };

  const deleteAd = async (id: string) => {
    try {
      if (!db) return;
      await deleteDoc(doc(db, "ads", id));
      addToast("Ad removed smoothly.", "info");
    } catch (error) {
      addToast("Failed to delete ad.", "error");
    }
  };

  const updatePersonalInfo = async (info: typeof PERSONAL_INFO) => {
    try {
      if (!db) return;
      await setDoc(doc(db, "personalInfo", "current"), info);
      setPersonalInfo(info);
      addToast("Profile information synced with cloud.", "success");
    } catch (err) {
      addToast("Failed to sync profile change.", "error");
    }
  };

  const addRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q !== trimmed);
      return [trimmed, ...filtered].slice(0, 5);
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <AppContext.Provider
      value={{
        isFollowing,
        toggleFollow,
        setIsFollowing,
        showFollowModal,
        setShowFollowModal,
        showAdminModal,
        setShowAdminModal,
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
        clearNotifications,
        markAsRead,
        toasts,
        addToast,
        removeToast,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        theme,
        toggleTheme,
        personalInfo,
        setPersonalInfo,
        updatePersonalInfo,
        services,
        addService,
        deleteService,
        updateService,
        projects,
        addProject,
        deleteProject,
        updateProject,
        articles,
        addArticle,
        deleteArticle,
        updateArticle,
        selectedArticleId,
        setSelectedArticleId,
        comments,
        addComment,
        ads,
        addAd,
        updateAd,
        deleteAd,
        activeSection,
        setActiveSection,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
